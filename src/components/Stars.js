import { AiFillStar } from "react-icons/ai";
import React from "react";


export default function Stars({rate}) {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(<AiFillStar key={i} size={16} style={{color: rate >= i ? "#ee0" : "#888"}}/>);
    }
    return <div className="stars">
        {stars}
    </div>
}