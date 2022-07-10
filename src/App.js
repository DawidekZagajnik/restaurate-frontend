import React from "react";
import LoginPage from "./pages/Login";
import Home from "./pages/Home";
import ProtectedRoute from "./pages/ProtectedRoute";
import { ThemeProvider, createTheme } from "@mui/material";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import RegisterPage from "./pages/Register";
import Restaurant from "./pages/Restaurant";


const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#f62"
    },
    secondary: {
      main: "#ddd"
    }
  }
})


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/register" element={<RegisterPage />} />
          <Route exact path="/" element={<ProtectedRoute><Home /></ProtectedRoute>}/>
          <Route path="/restaurant" element={<ProtectedRoute><Restaurant/></ProtectedRoute>}/>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
