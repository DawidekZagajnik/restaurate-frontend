import React from "react";
import NavigationBar from "../components/NavigationBar";
import apiCall from "../utils/apiCall";
import "./UserAccount.css";
import { AiOutlineUser } from "react-icons/ai";
import { CircularProgress, Typography, Tabs, Tab } from "@mui/material";
import useAutoLoad from "../utils/useAutoLoad";
import Stars from "../components/Stars";
import ErrorBox from "../components/ErrorBox";
import Restaurants from "../components/Restaurants";
import {AiTwotoneLike, AiOutlineLike} from "react-icons/ai";
import RestaurantForm from "../components/RestaurantForm";


const TabPanel = ({index, value, children}) => {
    if (index === value) {
        return <>{children}</>
    } else {
        return null;
    }
}  


export default function UserAccount() {

    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const mounted = React.useRef(false);
    const {observer, loading: reviewsLoading, error: reviewsError, items: reviews, hasMore } = useAutoLoad({
        url: `/my-reviews`, 
        pageSize: 10
    });
    const [tab, setTab] = React.useState(0);

    React.useEffect(() => {
        mounted.current = true;
        setError(null);
        setLoading(true);
        apiCall({
            url: "/my-account",
            method: "GET"
        })
        .catch(e => {
            if (mounted.current) setError(e?.response?.data || "An unknown error occurred");
        })
        .then(response => {
            if (mounted.current) setUser(response.data);
        })
        .finally(() => {
            if (mounted.current) setLoading(false);
        })
        return () => mounted.current = false;
    }, [])

    const Review = ({index, content, rate, timestamp, user, restaurant, id}) => {

        const mounted = React.useRef(false);
        const [liked, setLiked] = React.useState(false);
        const [likes, setLikes] = React.useState(0);
        const [likesLoading, setLikesLoading] = React.useState(true);

        React.useEffect(() => {
            mounted.current = true;
            if (!reviewsLoading && hasMore && index === reviews.length - 1) {
                observer.observe(document.getElementById("review" + index))
            }
            return () => mounted.current = false;
        }, [index])

        React.useEffect(() => {
            mounted.current = true;
            setLikesLoading(true);
            apiCall({
                url: `/likes/${id}`,
                method: "GET"
            })
            .then(response => {
                setLiked(response.data.liked);
                setLikes(response.data.likes);
                setLikesLoading(false);
            })
            .catch(_ => {})
            return () => mounted.current = false;
        }, [])

        const handleLike = (dislike = false) => {
            let currLikes = likes;
            let currLiked = liked;
            if (mounted.current) {
                setLiked(!currLiked);
                setLikes((currLikes + (dislike ? -1 : 1)));
            }
            apiCall({
                url: `/like/${id}`,
                method: dislike ? "DELETE" : "POST"
            })
            .then(_ => {})
            .catch(_ => {
                if (mounted.current) {
                    setLiked(currLiked);
                    setLikes(currLikes);
                }
            })
        }

        return <div className="restaurant-review" id={"review" + index}>
            <Typography variant="h6">{user} to restaurant {restaurant}</Typography>
            <Typography variant="p" className="review-date">{timestamp}</Typography>
            <Stars rate={rate}/>
            <Typography variant="p" className="review-content">{content}</Typography>
            <div style={{
                position: "absolute",
                bottom: 20,
                right: 30
            }}>
                {likesLoading ? 
                    null
                    :
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 10,
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <div style={{fontSize: 24}}>{likes}</div>
                        {liked ?
                            <AiTwotoneLike size={24} onClick={() => handleLike(true)}/> 
                            :
                            <AiOutlineLike size={24} onClick={() => handleLike(false)}/>
                        }
                    </div>
                }
            </div>
        </div>
    }

    return <>
        <NavigationBar />
        <ErrorBox errorMessage={error}/>
        <div className="user-content-wrapper">
            <div className="user-account-content-wrapper">
                <AiOutlineUser size={200} style={{border: "1px solid #ccc", borderRadius: "20px", marginBottom: 24}}/>
                {loading && <CircularProgress style={{marginTop: 50}}/>}
                {user && !loading && 
                    <>
                        <Typography variant="h4">{user.username}</Typography>
                        <Typography variant="h6">Added {user.review_count} review{user.review_count === 1 ? "" : "s"}</Typography>
                    </> 
                }
            </div>
            <div>
                <Tabs
                    value={tab}
                    onChange={(_, value) => setTab(value)}
                    style={{position: "sticky", top: 100, backgroundColor: "#222", zIndex: 1, borderBottom: "1px solid #f62"}}
                >
                    <Tab label="My reviews" value={0}/>
                    <Tab label="My restaurants" value={1}/>
                    <Tab label="Add new restaurant" value={2}/>
                </Tabs>
                <TabPanel value={tab} index={0}>
                    <div className="user-reviews">
                        {reviews.length > 0 ?
                            reviews.map((review, index) => <Review key={index} index={index} {...review}/>)
                            :
                            !reviewsLoading && <Typography variant="h6" style={{color: "#888"}}>You did not add any reviews yet.</Typography>
                        }
                        <ErrorBox errorMessage={reviewsError}/>
                        {reviewsLoading && <div style={{width: "100%", minHeight: "300px", display: "flex", alignItems: "center", justifyContent: "center"}}><CircularProgress /></div>}
                    </div>
                </TabPanel>
                <TabPanel value={tab} index={1}>
                    <div className="user-restaurants">
                        {user && <Restaurants userId={user.id}/>}
                    </div>
                </TabPanel>
                <TabPanel value={tab} index={2}>
                    <div className="restaurant-form-container">
                        <RestaurantForm onSuccess={() => setTab(1)}/>
                    </div>
                </TabPanel>
            </div>
        </div>
    </>
}

