import React from "react";
import apiCall from "../utils/apiCall";
import "./Restaurants.css";
import { Typography } from "@mui/material";

export default function Restaurants ({query}) {

    const [page, setPage] = React.useState(0);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const hasMore = React.useRef(false);
    const restaurants = React.useRef([]);
    const mounted = React.useRef(false);

    React.useEffect(() => {
        mounted.current = true;
        hasMore.current = false;
        restaurants.current = [];
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
            console.log(response.data);
            restaurants.current = [...restaurants.current, ...response.data.result];
            hasMore.current = response.data.has_more;
        })
        .catch(e => {
            if (mounted.current) setError(e.response?.data || "An unknown error occurred")
        })
        return () => mounted.current = false;
    }, [query, page])


    const Restaurant = ({name, description, owner}) => {
        return <div className="restaurant-item">
            <Typography variant="h4" >{name}</Typography>
            <div>{description}</div>
            <div className="restaurant-owner-name">Owner: {owner}</div>
        </div>
    }


    return <>
        <div className="restaurants-wrapper">
            {
                restaurants.current.map((restaurant, index) => <Restaurant key={index} {...restaurant} />)
            }
        </div>
    </>;
}