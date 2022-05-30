import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#ff0451',
            contrastText: '#FFF'
        },
        secondary: {
            main: '#000',
            contrastText: '#fff'
        },
    },

    typography: {
        fontWeightRegular: 500,
        fontSize: 16,
        fontFamily: ["Montserrat"].join(','),
        h2: {
            fontSize: '2.5em',
            fontWeight: 600,
            textAlign: 'center',
            margin: '1em 0.4em 0.4em 0.4em'
        },
        h5: {
            fontWeight: 700,
            fontSize: 22,
            marginBottom: 10,
            marginTop: 10
        },
        h6: {
            fontWeight: 700,
            paddingBottom: 20
        },
        body1: {
            fontSize: 16
        }
    }
}
);

export default theme
