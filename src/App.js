import React, {Fragment} from "react";
import LoginPage from "./pages/Login";
import { ThemeProvider, createTheme } from "@mui/material";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";


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
          <Route exact path="/login" element={<Fragment><LoginPage /></Fragment>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
