import React from "react";
import apiCall, {setToken} from "../utils/apiCall";
import TextInput from "../components/TextInput";
import "./Register.css";
import Button from "../components/Button";
import { Typography } from "@material-ui/core";
import {useNavigate} from "react-router-dom";

function RegisterPage() {
    
    const [login, setLogin] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();
    const mounted = React.useRef(false);

    React.useEffect(() => {
        mounted.current = true;
        return () => mounted.current = false;
    }, [])

    const handleSubmit = () => {
        if (password && login && confirmPassword === password) {
            if (mounted.current) {
                setErrorMessage(null);
                setLoading(true);
            }
            apiCall({
                url: "/user", 
                method: "POST", 
                data: {username: login, password: password}
            })
            .then(response => {setToken(response.data); navigate("/login")})
            .catch(e => {
                if (mounted.current) setErrorMessage(e.response?.data || "An unknown error occurred");
            })
            .finally(() => {
                if (mounted.current) setLoading(false);
            })
        } else {
            if (mounted.current) setErrorMessage("Please fill all fields to sign up. Make sure that passwords match.");
        }
    };


    return <>
        <div className="register-page">
            <Typography variant="h4" style={{marginBottom: "20px", color: "#f62", fontWeight: "bold"}}>
                RestauRate
            </Typography>
            <div className="register-form">
                <TextInput 
                    label="Username"
                    value={login}
                    onChange={value => setLogin(value)}
                />
                <TextInput 
                    type="password"
                    label="Password"
                    value={password}
                    onChange={value => setPassword(value)}
                />
                <TextInput 
                    type="password"
                    label="Confirm password"
                    value={confirmPassword}
                    onChange={value => setConfirmPassword(value)}
                />
                <Button 
                    label="sign up"
                    onClick={handleSubmit}
                    loading={loading}
                />
            </div>
            <div style={{height: "30px"}}>{errorMessage}</div>
        </div>
    </>
}

export default RegisterPage;