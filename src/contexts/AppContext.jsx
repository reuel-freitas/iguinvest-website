import { createContext, useState } from "react";
import { Backdrop, CircularProgress } from '@mui/material'

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
    const [loading, setLoading] = useState(false)
    return (
        <AppContext.Provider value={{ loading, setLoading }}>
            {children}
        </AppContext.Provider>
    )
}