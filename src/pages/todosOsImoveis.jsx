import React, { useEffect, useContext, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ResultBusca from "../components/resultBusca";
import { useLocation } from "react-router-dom";
import { cidadesDisponiveis, tiposdeImoveisDisponiveis } from "../services/webservice";
import { Box } from "@mui/material";
import { CurrencyFilter } from "../components/CurrencyFilter";
import { AppContext } from "../contexts/AppContext";

export function TodosOsImoveis() {

  const location = useLocation();
  const { setLoading } = useContext(AppContext)

  const [tipos, setTipos] = useState([]);
  const [cidades, setCidades] = useState([]);

  const [tipoSelecionado, setTipoSelecionado] = useState(!!location?.state?.tipo ? location.state.tipo.codigo : '');
  const [cidadeSelecionada, setCidadeSelecionada] = useState(!!location?.state?.cidade ? location.state.cidade.codigo : '');

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    const cidades = await cidadesDisponiveis(setLoading)
    setCidades(cidades.lista);
    const res = await tiposdeImoveisDisponiveis(setLoading)
    setTipos(res.lista);
    setLoading(false)
  }

  const loadSelectedCity = (e) => {
    setCidadeSelecionada(e.target.value)
  }

  return (
    <>
      <Container className="filter-all">
        <Row>
          <Col>
            <Box sx={{ marginTop: { xs: 2, md: 4 }, display: 'flex', justifyContent: 'center', flexWrap: { xs: 'wrap', md: 'no-wrap' }, gap: 1 }}>
              <select className="input_todos_imoveis" style={{ padding: '8px 10px', height: '40px', margin: '8px!important', borderRadius: '6px', border: '1px solid rgb(222, 222, 222' }} onChange={(e) => setCidadeSelecionada(e.target.value)} value={cidadeSelecionada}>
                <option>Cidade</option>
                {cidades.map((cidade, key) => {
                  return (
                    <option value={cidade.codigo} key={`cidade:${key}`}>
                      {cidade.nome}
                    </option>
                  );
                })}
              </select>
              <select className="input_todos_imoveis" style={{ padding: '8px 10px', height: '40px', margin: '8px!important', borderRadius: '6px', border: '1px solid rgb(222, 222, 222' }} onChange={(e) => setTipoSelecionado(e.target.value)} value={tipoSelecionado}>
                <option>Tipo de imóvel</option>
                {tipos.map((tipo, key) => {
                  return (
                    <option value={tipo.codigo} key={`tipo:${key}`}>
                      {tipo.nome}
                    </option>
                  );
                })}
              </select>
              <input className="input_todos_imoveis" style={{ padding: '8px 10px', height: '40px', margin: '8px!important', borderRadius: '6px', border: '1px solid rgb(222, 222, 222' }} name="valorMinimo" type="number" placeholder="Valor Minimo" />
              <input className="input_todos_imoveis" style={{ padding: '8px 10px', height: '40px', margin: '8px!important', borderRadius: '6px', border: '1px solid rgb(222, 222, 222' }} name="valorMaximo" type="number" placeholder="Valor Maximo" />
            </Box>
            {/* <Box>
                <CurrencyFilter />
              </Box> */}
          </Col>
        </Row>
      </Container>
      <ResultBusca
        cidade={cidadeSelecionada}
        tipo={tipoSelecionado}
      />
    </>
  )
}