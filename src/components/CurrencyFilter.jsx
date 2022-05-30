import React, { useState } from 'react'
import { Box, Slider, Typography } from "@mui/material"

export const CurrencyFilter = props => {

    const [value, setValue] = React.useState([20, 37]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    // const valuetext = ({ value }) => {
    //     new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
    //     return value
    // }

    return (
        <Box sx={{ width: 300 }}>
            <Slider
                getAriaLabel={() => 'Temperature range'}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
            />
        </Box>
    )
}

function valuetext(value) {
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
    return value    
}

