import React from "react";
import NavigationBar from "../components/NavigationBar";
import {Navigate} from "react-router-dom";
import useAutoLoad from "../utils/useAutoLoad";
import "./Restaurant.css";
import apiCall from "../utils/apiCall";
import ErrorBox from "../components/ErrorBox";
import { CircularProgress, Typography } from "@mui/material";
import Stars from "../components/Stars";
import ReviewAdder from "../components/ReviewAdder";


export default function Restaurant() {

    const params = new URLSearchParams(window.location.search)
    const restaurantId = params.get("id");
    const mounted = React.useRef(false);
    const [restaurant, setRestaurant] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const {observer, loading: reviewsLoading, error: reviewsError, items: reviews, hasMore, reset: resetAutoLoad } = useAutoLoad({
        url: `/reviews/${restaurantId}`, 
        pageSize: 10
    });

    React.useEffect(() => {
        mounted.current = true;

        setError(null);
        setLoading(true);
        setRestaurant(null);
        apiCall({
            url: `/restaurant/${restaurantId}`,
            method: "GET"
        })
        .then(response => {
            if (mounted.current) setRestaurant(response.data);
        })
        .catch(e => {
            if (mounted.current) setError(e.response?.data || "An uknown error occurred")
        })
        .finally(() => {
            if (mounted.current) setLoading(false);
        })

        return () => mounted.current = false;
    }, [restaurantId])

    if (restaurantId === null) {
        return <Navigate to={"/"}/>;
    }

    const Review = ({index, content, rate, timestamp, user}) => {

        React.useEffect(() => {
            if (!reviewsLoading && hasMore && index === reviews.length - 1) {
                observer.observe(document.getElementById("review" + index))
            }
        }, [index])

        return <div className="restaurant-review" id={"review" + index}>
            <Typography variant="h6">{user}</Typography>
            <Typography variant="p" className="review-date">{timestamp}</Typography>
            <Stars rate={rate}/>
            <Typography varaint="p" className="review-content">{content}</Typography>
        </div>
    }

    return <>
        <NavigationBar />
        <ErrorBox errorMessage={error}/>
        {loading && <div style={{width: "100%", minHeight: "300px", display: "flex", alignItems: "center", justifyContent: "center"}}><CircularProgress /></div>}
        {restaurant !== null &&
            <div className="restaurant-details-page">
                <Typography variant="h2" style={{marginBottom: "20px"}}>{restaurant.name}</Typography>
                <Typography className="owner-name" variant="h6">Owner: {restaurant.owner}</Typography>
                <Typography className="restaurant-description" variant="h4">{restaurant.description}</Typography>
                <Typography className="restaurant-reviews" variant="h3" color="primary">Reviews</Typography>
                <ReviewAdder restaurantId={restaurantId} onReviewAdded={() => resetAutoLoad()}/>
                {reviews.length > 0 ?
                    reviews.map((review, index) => <Review key={index} index={index} {...review}/>)
                        :
                    !reviewsLoading && <Typography variant="h6" style={{color: "#888"}}>This restaurant has no reviews yet</Typography>
                }
                <ErrorBox errorMessage={reviewsError}/>
                {reviewsLoading && <div style={{width: "100%", minHeight: "300px", display: "flex", alignItems: "center", justifyContent: "center"}}><CircularProgress /></div>}
            </div>
        }
    </>;
}