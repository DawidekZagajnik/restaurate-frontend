import React from "react";
import {Navigate} from "react-router-dom";
import { getToken } from "../utils/apiCall";


export default function ProtectedRoute({ children }) {
    if (getToken() === null) {
        return <Navigate to="/login" replace />;
    }
    return children;
}