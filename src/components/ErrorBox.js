import React from "react";


export default function ErrorBox({errorMessage}) {

    if (!errorMessage) return null;

    return <div style={{
        backgroundColor: "#c33", 
        width: "calc(100% - 80px)", 
        maxHeight: "300px", 
        borderRadius: "5px",
        margin: "20px", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: 'center',
        padding: "20px",
        boxShadow: "1px 1px 2px 2px #111"
    }}>{errorMessage}</div>
}