import axios from "axios";

const apiUrl = window._env_.API_URL;

const getToken = () => {
    return `Bearer ${localStorage.getItem("restaurate-auth-token")}`;
}

export const setToken = (token) => {
    localStorage.setItem("restaurate-auth-token", token);
}

export const unsetToken = () => {
    localStorage.setItem("restaurate-auth-token", null);
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
    return axios(config)
}