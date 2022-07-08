import React from "react";
import apiCall from "../utils/apiCall";
import ErrorBox from "../components/ErrorBox";
import "./Home.css";
import Restaurants from "../components/Restaurants";
import {useNavigate} from "react-router-dom";
import NavigationBar from "../components/NavigationBar";


export default function Home() {

    const [restaurants, setRestaurants] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [limit, setLimit] = React.useState(6);
    const [error, setError] = React.useState(null);
    const [query, setQuery] = React.useState(null);
    const hasMore = React.useRef(false);
    const mounted = React.useRef(false);
    const navigate = useNavigate();

    const increaseLimit = () => {
        setLimit(limit + 6);
    }

    React.useEffect(() => {
        mounted.current = true;

        setError(null);
        setLoading(true);
        apiCall({
            method: "GET",
            url: `/restaurants?start=${limit - 6}&limit=${limit}${query ? "&query=" + query : ""}`
        })
        .then(response => {
            if(mounted.current) {console.log(response.data); setRestaurants([...restaurants, ...response.data.result]); hasMore.current = response.data.has_more};
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
            <Restaurants restaurantList={restaurants} selectRestaurant={handleRestaurantClick} loading={loading} loadMore={increaseLimit} hasMore={hasMore.current}/>
        </div>
    </div>
}