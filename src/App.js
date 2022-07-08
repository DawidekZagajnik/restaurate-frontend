import React from "react";
import LoginPage from "./pages/Login";
import Home from "./pages/Home";
import ProtectedRoute from "./pages/ProtectedRoute";
import { ThemeProvider, createTheme } from "@mui/material";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import RegisterPage from "./pages/Register";


const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ff5500"
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
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
