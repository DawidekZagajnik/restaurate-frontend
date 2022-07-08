import React from "react";
import apiCall from "../utils/apiCall";
import "./Restaurants.css";
import { CircularProgress, Typography } from "@mui/material";
import ErrorBox from "./ErrorBox";
import { useNavigate } from "react-router-dom";


export default function Restaurants ({query}) {

    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const hasMore = React.useRef(false);
    const [restaurants, setRestaurants] = React.useState([]);
    const mounted = React.useRef(false);
    const [page, setPage] = React.useState(0);
    const navigate = useNavigate();

    React.useEffect(() => {
        mounted.current = true;
        hasMore.current = false;
        setRestaurants([]);
        setPage(0);
        return () => mounted.current = false;
    }, [query])


    React.useEffect(() => {
        mounted.current = true;
        setLoading(true);
        setError(null);
        apiCall({
            url: `/restaurants?pagesize=6&page=${page}${query ? "&query=" + query : ""}`,
            method: "GET"
        })
        .then(response => {
            if (mounted.current) setRestaurants(page === 0 ? response.data.result : [...restaurants, ...response.data.result]);
            hasMore.current = response.data.has_more;
        })
        .catch(e => {
            if (mounted.current) setError(e.response?.data || "An unknown error occurred")
        })
        .finally(() => {
            if (mounted.current) setLoading(false);
        })
        return () => mounted.current = false;
    }, [page, query])

    const Restaurant = ({index, name, description, owner, id}) => {

        React.useEffect(() => {
            if (!loading && hasMore.current && index === restaurants.length - 1) {
                new IntersectionObserver((entries, observer) => {
                    let entry = entries[0];
                    if (entry.isIntersecting) {
                        setPage(page + 1);
                        observer.disconnect();
                    }
                }).observe(document.getElementById("restaurant" + index))
            }
        }, [index])

        return <div className="restaurant-item" id={"restaurant" + index}  onClick={() => goToRestaurant(id)}>
            <Typography variant="h4" >{name}</Typography>
            <div>{description}</div>
            <div className="restaurant-owner-name">Owner: {owner}</div>
        </div>
    }

    const goToRestaurant = id => {
        navigate("/restaurant?id=" + id);
    }


    return <>
        <div className="restaurants-wrapper">
            {
                restaurants.map((restaurant, index) => <Restaurant key={index} index={index} {...restaurant}/>)
            }
            {loading && <CircularProgress />}
            <ErrorBox errorMessage={error} />
            {!loading && !error && restaurants.length === 0 && <div>No data matches your search criteria.</div>}
        </div>
    </>;
}