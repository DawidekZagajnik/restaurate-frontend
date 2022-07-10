import {Button as MuiButton, CircularProgress} from "@mui/material";


export default function Button({ label, onClick, loading, fullWidth=false }) {
    return <MuiButton
        sx={{margin: "5px", width: fullWidth ? "calc(100% - 10px)" : "auto"}} 
        onClick={onClick}
        variant="outlined"
    >{loading ? <CircularProgress size={25} /> : label}</MuiButton>
}