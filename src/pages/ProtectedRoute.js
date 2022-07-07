import React from "react";
import {Navigate} from "react-router-dom";
import { getToken } from "../utils/apiCall";


const ProtectedRoute = ({children}) => {
    if (getToken() === null) {
        return <Navigate to="/login" replace/>
    }
    return children
}