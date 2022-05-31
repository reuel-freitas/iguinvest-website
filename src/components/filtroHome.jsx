import React, { useContext, useEffect, useState } from "react";
import "./css/filtroHome.css";
import axios from "axios";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { cidadesDisponiveis, tiposdeImoveisDisponiveis } from "../services/webservice";
import { AppContext } from "../contexts/AppContext";
import { IconButton, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { CurrencyFilter } from "./CurrencyFilter";

function valuetext(value) {
  return `${value}°C`;
}

function FiltroHome({ tipos, cidades }) {

  const navigate = useNavigate();

  const { setLoading } = useContext(AppContext);

  const [filters, setFilters] = React.useState({
    open: false,
    tipo: "",
    cidade: 1,
    min: null,
    max: null
  });

  const handleChange = ({ target }) => {
    setFilters({ ...filters, [target.name]: target.value });
  }

  const handleChangeCidade = (event) => {
    setFilters({ ...filters, cidade: event.target.value });
  };

  const handleChangeTipo = (event) => {
    console.log(event.target.value)
    setFilters({ ...filters, tipo: event.target.value });
  };

  console.log(filters)

  // new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(target.value)

  return (
    <>
      <form className="form_busca__desktop d-none d-md-flex d-lg-block">
        <div className="" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', flexWrap: 'wrap', paddingInline: '10px' }}>
          <select className="form_busca__inputs ml-4" name="cidade" id="cidade" onChange={handleChangeCidade}>
            <option>Qual a localização?</option>
            {cidades.map((cidades, key) => {
              return (
                <option key={key} value={cidades.codigo}>
                  {cidades.nome}
                </option>
              );
            })}
          </select>
          <select
            className="form_busca__inputs"
            name="tipoImovel"
            id="tipoImovel"
            onChange={handleChangeTipo}
          >
            <option>Tipo de imóvel?</option>
            {tipos.map((tipos, key) => {
              return (
                <option key={key} value={tipos.codigo}>
                  {tipos.nome}
                </option>
              );
            })}
          </select>
          <input
            onChange={handleChange}
            className="tipos-filtro"
            name="min"
            type="number"
            placeholder="Valor Minimo"
          />
          <input
            onChange={handleChange}
            className="tipos-filtro"
            name="max"
            type="number"
            placeholder="Valor Maximo"
          />
          <IconButton
            onClick={() => navigate('/todososimoveis', { state: { cidade: { codigo: filters?.cidade }, tipo: { codigo: filters?.tipo }, min: filters?.min, max: filters?.max } })}
            sx={{
              color: "#fff",
              paddingInline: '10px',
              backgroundColor: '#ff0451',
              borderRadius: '6px',
              padding: 0.78,
              marginLeft: 0.5,
              maxHeight: '32px',
              '&:  hover': {
                filter: 'brightness(.7)',
                transition: '0.3s ease-in-out',
                backgroundColor: '#ff0451'
              }
            }}>
            <SearchIcon fontSize="small" />
          </IconButton>
        </div>
      </form>
    </>
  );
}

export default FiltroHome;
