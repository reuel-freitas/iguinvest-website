import { createContext, useEffect, useState } from "react";
import { cidadesDisponiveis, tiposdeImoveisDisponiveis } from "../services/webservice";

export const ImoveisContext = createContext({});

export const ImoveisProvider = ({ children }) => {
    const [tipos, setTipos] = useState([]);
    const [cidades, setCidades] = useState([]);

    useEffect(() => {
        loadData();
    }, [])

    const loadData = async () => {
        const response = await cidadesDisponiveis();
        setCidades(response.lista);
        const res = await tiposdeImoveisDisponiveis();
        setTipos(res.lista);
    };

    return (
        <ImoveisContext.Provider value={{ tipos, cidades }}>
            {children}
        </ImoveisContext.Provider>
    )

}