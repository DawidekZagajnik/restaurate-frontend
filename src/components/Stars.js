import { AiFillStar } from "react-icons/ai";
import React from "react";


export default function Stars({ rate, onStarClick=null, starSize=16 }) {

    const stars = [];
    const [currentRate, setCurrentRate] = React.useState(rate);

    for (let i = 1; i <= 5; i++) {
        stars.push(<AiFillStar 
                key={i} 
                size={starSize} 
                style={{color: currentRate >= i ? "#ee0" : "#888"}} 
                onMouseOver={onStarClick !== null ? () => setCurrentRate(i) : () => {}}
                onMouseLeave={onStarClick !== null ? () => setCurrentRate(rate) : () => {}} 
                onClick={onStarClick !== null ? () => onStarClick(i) : () => {}}
            />);
    }
    return <div className="stars">
        {stars}
    </div>
}