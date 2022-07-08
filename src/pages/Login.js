import React from "react";
import apiCall, {setToken} from "../utils/apiCall";
import TextInput from "../components/TextInput";
import "./Login.css";
import Button from "../components/Button";
import { Typography } from "@material-ui/core";
import {useNavigate} from "react-router-dom";

function LoginPage() {
    
    const [login, setLogin] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();
    const mounted = React.useRef(false);

    React.useEffect(() => {
        mounted.current = true;
        return () => mounted.current = false;
    }, [])

    const handleSubmit = () => {
        if (password && login) {
            if (mounted.current) {
                setErrorMessage(null);
                setLoading(true);
            }
            apiCall({
                url: "/login", 
                method: "POST", 
                data: {username: login, password: password}
            })
            .then(response => {setToken(response.data); navigate("/");})
            .catch(e => {
                if (mounted.current) setErrorMessage(e.response.data);
            })
            .finally(() => {
                if (mounted.current) setLoading(false);
            })
        } else {
            if (mounted.current) setErrorMessage("Please fill all fields to sign in.");
        }
    };


    return <>
        <div className="login-page">
            <Typography variant="h4" style={{marginBottom: "20px", color: "#ff5500", fontWeight: "bold"}}>
                RestauRate
            </Typography>
            <div className="login-form">
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
                <Button 
                    label="Log in"
                    onClick={handleSubmit}
                    loading={loading}
                />
            </div> 
            <div style={{height: "30px"}}>{errorMessage}</div>
            <div>Don't have an account yet? Click <span className="link" onClick={() => navigate("/register")}>here</span> to sign up!</div>
        </div>
    </>
}

export default LoginPage;