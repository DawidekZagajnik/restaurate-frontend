import React from "react";
import "./NavigationBar.css";
import apiCall, { unsetToken } from "../utils/apiCall";
import { useNavigate } from "react-router-dom";
import {AiOutlineUser} from "react-icons/ai";
import { IconButton, TextField } from "@mui/material";
import {BiSearchAlt, BiLogOut} from "react-icons/bi";


export default function NavigationBar ({ onSearch }) {

    const [user, setUser] = React.useState(null);
    const mounted = React.useRef(false);
    const [searchWord, setSearchWord] = React.useState("");
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
        {onSearch && 
            <div className="nav-bar-item" style={{flexDirection: "row"}}>
                <TextField 
                    size="small"
                    color="secondary"
                    placeholder="Search restaurants"
                    value={searchWord}
                    onChange={e => setSearchWord(e.target.value)}
                />
                <IconButton style={{margin: 3}} onClick={() => onSearch(searchWord)}>
                    <BiSearchAlt size={20}/>
                </IconButton>
            </div>
        }
        {user && <>
                <div className="nav-bar-item">
                    <IconButton >
                        <AiOutlineUser size={40} />
                    </IconButton>
                    <div style={{margin: 0}}>My account</div>
                </div>
                <div className="nav-bar-item">
                    <IconButton onClick={() => {unsetToken(); navigate("/login");}}>
                        <BiLogOut size={40} />
                    </IconButton>
                    <div style={{margin: 0}}>Logout</div>
                </div>
            </>
        }
    </div>;
}