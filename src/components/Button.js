import {Button as MuiButton, CircularProgress} from "@mui/material";


export default function Button({ label, onClick, loading }) {
    return <MuiButton
        sx={{margin: "5px"}} 
        onClick={onClick}
        variant="outlined"
    >{loading ? <CircularProgress size={25} /> : label}</MuiButton>
}