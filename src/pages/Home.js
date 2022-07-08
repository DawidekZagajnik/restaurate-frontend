import React from "react";
import apiCall from "../utils/apiCall";
import ErrorBox from "../components/ErrorBox";
import "./Home.css";
import Restaurants from "../components/Restaurants";
import {useNavigate} from "react-router-dom";
import NavigationBar from "../components/NavigationBar";


export default function Home() {

    const [restaurants, setRestaurants] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [limit, setLimit] = React.useState(5);
    const [error, setError] = React.useState(null);
    const [query, setQuery] = React.useState(null);
    const mounted = React.useRef(false);
    const navigate = useNavigate();

    React.useEffect(() => {
        mounted.current = true;
        setError(null);
        setLoading(true);
        apiCall({
            method: "GET",
            url: `/restaurants?start=${limit - 5}&limit=${limit}${query ? "&query=" + query : ""}`
        })
        .then(response => {
            if(mounted.current) setRestaurants(response.data.result);
        })
        .catch(e => {
            if (mounted.current) setError(e.response?.data || "There was an unknown error");
        })
        .finally(() => {
            if (mounted.current) setLoading(false);
        })
        return () => mounted.current = false;
    }, [limit, query])

    const handleRestaurantClick = (restId) => {
        
    }

    return  <div className="home-page">
        <NavigationBar onSearch={value => setQuery(value)} />
        <ErrorBox errorMessage={error} />
        <div className="home-page-items-wrapper">
            {restaurants && <Restaurants restaurantList={restaurants} selectRestaurant={handleRestaurantClick} loading={loading}/>}
        </div>
    </div>
}