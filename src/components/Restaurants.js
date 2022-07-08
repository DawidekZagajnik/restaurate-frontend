import { CircularProgress, Typography } from "@mui/material";
import React from "react";
import Button from "./Button";
import "./Restaurants.css";


export default function Restaurants({restaurantList, selectRestaurant, loading=false, loadMore, hasMore=false}) {

    const RestaurantItem = ({index, last, id, name, description, owner}) => {
        return <div key={index} className="restaurant-item" onClick={() => selectRestaurant(id)} id={`restaurant${id}`}>
            <Typography variant="h4">{name}</Typography>
            <Typography variant="p">{description}</Typography>
            <Typography variant="p" style={{position: "absolute", bottom: 5, right: 10}}>Owner: {owner}</Typography>
        </div>
    }

    return <div className="restaurants-column">
        {restaurantList.map((rest, index) => <RestaurantItem key={index} index={index} last={index === restaurantList.length - 1} {...rest}/>)}
        {restaurantList.length === 0 && loading &&
            <div style={{width: 850, height: "calc(100vh - 110px)", display: "flex", alignItems: "center", justifyContent: "center"}}>
                <CircularProgress /> 
            </div>        
        }
        {hasMore && <Button label="Show more" onClick={loadMore} loading={loading} />}
    </div>
}