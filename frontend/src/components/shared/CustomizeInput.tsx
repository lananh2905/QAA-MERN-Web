import React from "react";
import { TextField } from "@mui/material";

type Props = {
    name: string;
    type: string;
    label: string;
}

const CustomizeInput = ({ name, type, label }: Props) => {
    return (
        <TextField
            
            name={name}
            type={type}
            label={label}
            margin= "normal"
            InputLabelProps={ {style :{ color: "white" }}}
            InputProps={{style :{ 
                width: "400px",
                color: "white",
                borderRadius: "10px", 
                fontSize: "20px",

            }}}
        />
    );
};

export default CustomizeInput;