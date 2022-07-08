import { CircularProgress, Typography } from "@mui/material";
import React from "react";
import "./Restaurants.css";


export default function Restaurants({restaurantList, selectRestaurant, loading=false}) {

    const RestaurantItem = ({id, name, description, owner}) => {
        return <div className="restaurant-item" onClick={() => selectRestaurant(id)}>
            <Typography variant="h4">{name}</Typography>
            <Typography variant="p">{description}</Typography>
            <Typography variant="p" style={{position: "absolute", bottom: 5, right: 10}}>Owner: {owner}</Typography>
        </div>
    }

    return <div className="restaurants-column">
        {loading ? 
            <div style={{width: 850, height: "calc(100vh - 110px)", display: "flex", alignItems: "center", justifyContent: "center"}}>
                <CircularProgress /> 
            </div>        
                : 
            restaurantList.map(rest => <RestaurantItem key={rest.id} {...rest}/>)
        }
    </div>
}