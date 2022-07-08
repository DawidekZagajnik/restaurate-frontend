import React from "react";
import "./NavigationBar.css";
import apiCall from "../utils/apiCall";
import { useNavigate } from "react-router-dom";
import {AiOutlineUser} from "react-icons/ai";


export default function NavigationBar ({}) {

    const [user, setUser] = React.useState(null);
    const mounted = React.useRef(false);
    const navigate = useNavigate();


    React.useEffect(() => {
        mounted.current = true;

        apiCall({
            url: "/my-account",
            method: "GET"
        })
        .catch(e => navigate("/login"))
        .then(response => {
            if (mounted.current) setUser(response.data);
        })

        return () => mounted.current = false;
    }, [])

    return <div className="nav-bar">
        {user && 
            <div className="user-wrapper">
                <AiOutlineUser size={60} />
                <div>{user.username}</div>
            </div>
        }
    </div>;
}