import React from "react";
import "./NavigationBar.css";
import apiCall, { unsetToken } from "../utils/apiCall";
import { useNavigate } from "react-router-dom";
import {AiOutlineUser} from "react-icons/ai";
import { IconButton, TextField } from "@mui/material";
import {BiSearchAlt, BiLogOut} from "react-icons/bi";


export default function NavigationBar ({ onSearch }) {

    const user = React.useRef(null);
    const [searchWord, setSearchWord] = React.useState("");
    const navigate = useNavigate();

    React.useEffect(() => {
        if (user.current === null) {
            apiCall({
                url: "/my-account",
                method: "GET"
            })
            .catch(e => navigate("/login"))
            .then(response => {
                user.current = response.data;
            })
        }
    }, [navigate])

    return <div className="nav-bar">
        {user && <div className="nav-bar-item">
                <IconButton >
                    <AiOutlineUser size={40} />
                </IconButton>
                <div style={{margin: 0}}>My account</div>
            </div>
        }
        {onSearch && 
            <div className="nav-bar-item" style={{flexDirection: "row"}}>
                <TextField 
                    size="small"
                    color="secondary"
                    placeholder="Search restaurants"
                    value={searchWord}
                    onChange={e => setSearchWord(e.target.value)}
                    onKeyDown={e => {if (e.key === "Enter") onSearch(searchWord);}}
                />
                <IconButton style={{margin: 3}} onClick={() => onSearch(searchWord)}>
                    <BiSearchAlt size={20}/>
                </IconButton>
            </div>
        }
        {user && 
            <div className="nav-bar-item">
                <IconButton onClick={() => {unsetToken(); navigate("/login");}}>
                    <BiLogOut size={40} />
                </IconButton>
                <div style={{margin: 0}}>Logout</div>
            </div>
        }
    </div>;
}