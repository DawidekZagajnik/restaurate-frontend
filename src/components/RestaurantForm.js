import { TextField } from "@mui/material";
import React from "react";
import apiCall from "../utils/apiCall";
import Button from "./Button";
import ErrorBox from "./ErrorBox";


export default function RestaurantForm({ onSuccess }) {

    const [name, setName] = React.useState("");
    const [desc, setDesc] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const mounted = React.useRef(false);

    React.useEffect(() => {
        mounted.current = true;
        return () => mounted.current = false;
    }, [onSuccess])

    const handleSave = () => {
        if (!name || !desc || !address) {
            setError("Name, description and address must be specified to add a restaurant.");
            return;
        }
        if (mounted.current) {
            setLoading(true);
            setError(null);
        }
        apiCall({
            method: "POST",
            url: "/restaurant",
            data: {
                name: name,
                description: desc,
                address: address
            }
        })
        .then(response => {
            if (onSuccess instanceof Function && response.status === 200) {
                onSuccess();
            }
        })
        .catch(e => {
            if (mounted.current) setError(e?.response?.data || "An unknown error occurred");
        })
        .finally(() => {
            if (mounted.current) setLoading(false);
        })
    }

    return <div style={{width: "100%", padding: "20px", alignItems: "flex-start", display: "flex", flexDirection: "column", gap: 20}}>
        <TextField 
            value={name}
            onChange={e => setName(e.target.value)}
            label="Restaurant name"
            style={{width: "500px"}}
        />
         <TextField 
            value={address}
            onChange={e => setAddress(e.target.value)}
            label="Restaurant address"
            style={{width: "500px"}}
        />
         <TextField 
            multiline={true}
            rows={4}
            value={desc}
            onChange={e => setDesc(e.target.value)}
            label="Description"
            style={{width: "500px"}}
        />
        <Button 
            label="Submit"
            onClick={handleSave}
            loading={loading}
        />
        <ErrorBox errorMessage={error}/>
    </div>;
}