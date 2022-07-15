import React from "react";
import "./ReviewAdder.css";
import { TextField } from "@mui/material";
import Button from "./Button";
import Stars from "./Stars";
import { Typography } from "@material-ui/core";
import ErrorBox from "./ErrorBox";
import apiCall from "../utils/apiCall";


export default function ReviewAdder ({ restaurantId, onReviewAdded }) {

    const [review, setReview] = React.useState({content: "", rate: 0});
    const mounted = React.useRef(false);
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [helper, setHelper] = React.useState(null);

    React.useEffect(() => {
        mounted.current = true;
        return () => mounted.current = false;
    }, [restaurantId])

    const handleReviewSubmit = () => {
        if (mounted.current) setHelper(null);
        if (review.content.length > 0) {
            if (mounted.current) {
                setError(null);
                setLoading(true);
            }
            apiCall({
                method: "POST",
                url: "/review",
                data: {...review, restaurantId}
            })
            .catch(e => {
                if (mounted.current) setError(e.response?.data || "An unknown error occurred");
            })
            .then(response => {
                if (mounted.current) setReview({content: "", rate: 0});
                onReviewAdded();
            })
            .finally(() => {
                if (mounted.current) setLoading(false);
            })
        } else {
            if (mounted.current) setHelper("Review content cannot be empty.")
        }
    }

    return <div className="review-adder">
        <Typography variant="h6" style={{marginBottom: "10px"}}>Add new review of this restaurant</Typography>
        <Typography variant="h6" style={{fontSize: 16, marginLeft: 10}}>Rate it from 0 to 5:</Typography>
        <div  style={{margin: 10}}>
            <Stars rate={review.rate} starSize={40} onStarClick={(rate) => setReview({...review, rate})}/>
        </div>
        <Typography variant="h6" style={{fontSize: 16, marginLeft: 10, marginBottom: 10}}>Share your impressions with other users:</Typography>
        <TextField
            value={review.content}
            onChange={e => setReview({...review, content: e.target.value})}
            multiline={true}
            rows={4}
            color="primary"
            placeholder="Type here to add new review"
            fullWidth
            size="small"
            inputProps={{ maxLength: 300 }}
            style={{ position: "relative" }}
            helperText={`${review.content.length}/300`}
            FormHelperTextProps={{ className: "char-counter" }}
        />
        <div style={{minHeight: 16, color: "#c33", marginLeft: 5, fontSize: 11, marginTop: 5 }}>{helper}</div>
        <div style={{ marginTop: 5 }}>
            <Button 
                label="submit"
                fullWidth={true}
                onClick={handleReviewSubmit}
                loading={loading}
            />
        </div>
        <ErrorBox errorMessage={error}/>
    </div>
}