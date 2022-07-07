import React from "react";
import { TextField } from "@mui/material";


export default function TextInput({ value, onChange, label, type="text" }) {

    return <TextField 
            type={type}
            sx={{margin: "5px"}}
            size="small"
            variant="outlined"
            value={value}
            label={label}
            onChange={e => onChange(e.target.value)}
        />
}