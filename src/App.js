import React, {Fragment} from "react";
import LoginPage from "./pages/Login";
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
          <Route path="/login" element={<Fragment><LoginPage /></Fragment>} />
          <Route path="/register" element={<Fragment><RegisterPage /></Fragment>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
