import React from "react";
import NavigationBar from "../components/NavigationBar";
import {Navigate} from "react-router-dom";
import useAutoLoad from "../utils/useAutoLoad";
import "./Restaurant.css";
import apiCall from "../utils/apiCall";
import ErrorBox from "../components/ErrorBox";
import { CircularProgress } from "@mui/material";


export default function Restaurant() {

    const params = new URLSearchParams(window.location.search)
    const restaurantId = params.get("id");
    const mounted = React.useRef(false);
    const [restaurant, setRestaurant] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    //const {} = useAutoLoad({url: `/reviews/${restaurantId}`, pageSize: 10, componentMounted: mounted });

    React.useEffect(() => {
        mounted.current = true;

        setError(null);
        setLoading(true);
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

    return <>
        <NavigationBar />
        <ErrorBox errorMessage={error}/>
        {loading && <div style={{width: "100%", minHeight: "300px", display: "flex", alignItems: "center", justifyContent: "center"}}><CircularProgress /></div>}
        <div className="restaurant-details-page">
            Hello
        </div>
    </>;
}