import { Typography } from "@mui/material";
import React from "react";
import "./Restaurants.css";


export default function Restaurants({restaurantList, selectRestaurant}) {

    const RestaurantItem = ({id, name, description, owner}) => {
        return <div className="restaurant-item" onClick={() => selectRestaurant(id)}>
            <Typography variant="h4">{name}</Typography>
            <Typography variant="p">{description}</Typography>
            <Typography variant="p" style={{position: "absolute", bottom: 5, right: 10}}>Owner: {owner}</Typography>
        </div>
    }

    return <div className="restaurants-column">
        {restaurantList.map(rest => <RestaurantItem key={rest.id} {...rest}/>)}
    </div>
}