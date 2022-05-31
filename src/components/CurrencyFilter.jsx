import React, { useState } from 'react'
import { Box, Slider, Typography, SliderThumb } from "@mui/material"
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

export const CurrencyFilter = props => {

    const [value, setValue] = React.useState([0, 2000000]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    let valorFormatado1 = Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(value[0])
    let valorFormatado2 = Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(value[1])

    return (
        <>
            <Box sx={{
                width: '100%',
                display: { xs: 'flex', sm: 'flex', md: 'none', lg: 'none', xl: 'none' },
                flexDirection: 'column',
                padding: 2
            }}>
                <Typography sx={{ textAlign: 'start', color: '#222', fontWeight: 500 }}>Média de preço</Typography>
                <AirbnbSlider
                    components={{ Thumb: AirbnbThumbComponent }}
                    getAriaLabel={(index) => (index === 0 ? 'Minimum price' : 'Maximum price')}
                    onChange={handleChange}
                    defaultValue={[0, 2000000]}
                    min={0}
                    max={2000000}
                />
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Typography sx={{ fontSize: 14, color: '#222' }}>{valorFormatado1}</Typography>
                    <Typography sx={{ fontSize: 14, color: '#222' }}>{valorFormatado2}</Typography>
                </Box>
            </Box>
            <Box sx={{ maxWidth: 340, width: '100%', display: { xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' }, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                <Typography sx={{ fontSize: 14, color: '#222', marginRight:3 }}>{valorFormatado1}</Typography>
                <AirbnbSlider
                    components={{ Thumb: AirbnbThumbComponent }}
                    getAriaLabel={(index) => (index === 0 ? 'Minimum price' : 'Maximum price')}
                    onChange={handleChange}
                    defaultValue={[0, 2000000]}
                    min={0}
                    max={2000000}
                />
                <Typography sx={{ fontSize: 14, color: '#222', marginLeft:3 }}>{valorFormatado2}</Typography>
            </Box>
        </>
    )
}

function AirbnbThumbComponent(props) {
    const { children, ...other } = props;
    return (
        <SliderThumb {...other}>
            {children}
            <span className="airbnb-bar" />
            <span className="airbnb-bar" />
            <span className="airbnb-bar" />
        </SliderThumb>
    );
}

AirbnbThumbComponent.propTypes = {
    children: PropTypes.node,
};

const AirbnbSlider = styled(Slider)(({ theme }) => ({
    color: '#ff0451',
    height: 3,
    padding: '13px 0',
    '& .MuiSlider-thumb': {
        height: 23,
        width: 23,
        backgroundColor: '#fff',
        border: '1px solid currentColor',
        '&:hover': {
            boxShadow: '0 0 0 8px #ff0451bf',
        },
        '& .airbnb-bar': {
            height: 9,
            width: 1,
            backgroundColor: 'currentColor',
            marginLeft: 1,
            marginRight: 1,
        },
    },
    '& .MuiSlider-track': {
        height: 3,
    },
    '& .MuiSlider-rail': {
        color: theme.palette.mode === 'dark' ? '#bfbfbf' : '#d8d8d8',
        opacity: theme.palette.mode === 'dark' ? undefined : 1,
        height: 3,
    },
}));
