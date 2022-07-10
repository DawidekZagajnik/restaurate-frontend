import React from "react";
import "./Restaurants.css";
import { CircularProgress, Typography } from "@mui/material";
import ErrorBox from "./ErrorBox";
import { useNavigate } from "react-router-dom";
import useAutoLoad from "../utils/useAutoLoad";


export default function Restaurants ({ query }) {

    const navigate = useNavigate();
    const mounted = React.useRef(false);
    const autoLoad = useAutoLoad({url: "/restaurants", pageSize: 6, query: query, componentMounted: mounted})
    const {observer, hasMore, loading, error, items: restaurants} = autoLoad;

    React.useEffect(() => {
        mounted.current = true;
        return () => mounted.current = false;
    }, [])

    const Restaurant = ({index, name, description, owner, id}) => {

        React.useEffect(() => {
            if (!loading && hasMore && index === restaurants.length - 1) {
                observer.observe(document.getElementById("restaurant" + index))
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