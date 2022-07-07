import axios from "axios";
import {useNavigate} from "react-router-dom";

const apiUrl = window._env_.API_URL;

export const getToken = () => {
    const token = localStorage.getItem("restaurate-auth-token");
    if (token === null){
        return null;
    }
    return `Bearer ${token}`;
}

export const setToken = (token) => {
    localStorage.setItem("restaurate-auth-token", token);
}

export const unsetToken = () => {
    localStorage.setItem("restaurate-auth-token", null);
}

class ResponseError extends Error {
    constructor(response) {
        super();
        this.response = response;
    }
}

export default async function apiCall({ url, method, data={} }) {
    const config = {
        url, 
        method, 
        data,
        baseURL: apiUrl,
        headers: {
            "Authorization": getToken()
        }
    }
    config.timeout = 1000 * 60;
    return axios(config).catch(e => {
        if (e.response.status === 401) {
            unsetToken();
            const navigate = useNavigate();
            navigate("/login");
        }
        throw new ResponseError(e.response);
    });
}