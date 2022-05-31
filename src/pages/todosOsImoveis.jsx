import React, { useEffect, useContext, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ResultBusca from "../components/resultBusca";
import { useLocation } from "react-router-dom";
import { cidadesDisponiveis, filtroImovel, tiposdeImoveisDisponiveis } from "../services/webservice";
import { Box, Button, IconButton } from "@mui/material";
import { CurrencyFilter } from "../components/CurrencyFilter";
import { AppContext } from "../contexts/AppContext";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

export function TodosOsImoveis() {

  const location = useLocation();
  const { setLoading } = useContext(AppContext)

  const [tipos, setTipos] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [imoveis, setImoveis] = useState([])
  const [quantidade, setQuantidade] = useState([]);

  const [filters, setFilters] = useState({
    cidade: !!location?.state?.cidade ? location.state.cidade.codigo : '',
    tipo: !!location?.state?.tipo ? location.state.tipo.codigo : '',
    min: null,
    max: null,
    page: 1
  })

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
    await getImoveis(filters?.page, filters?.tipo, filters?.cidade)
  }

  let quantidadeImoveis = quantidade;

  let paginas = quantidade > 20 ? Math.round(quantidadeImoveis / 20) : quantidade;

  async function getImoveis(page, tipo, cidade) {
    try {
      if (!cidade && !tipo) {
        let res = await filtroImovel({page: filters?.page, tipo: filters?.tipo, cidade: filters?.cidade})
        setImoveis(res.lista);
        setQuantidade(res.quantidade);
      } else if (cidade === "" && tipo) {
        let res = await filtroImovel({page: filters?.page, tipo: filters?.tipo, cidade: filters?.cidade})
        setImoveis(res.lista);
        setQuantidade(res.quantidade);
      } else if (cidade && !tipo) {
        let res = await filtroImovel({page: filters?.page, tipo: filters?.tipo, cidade: filters?.cidade})
        setImoveis(res.lista);
        setQuantidade(res.quantidade);
      }
      else {
        let res = await filtroImovel({page: filters?.page, tipo: filters?.tipo, cidade: filters?.cidade})
        setImoveis(res.lista);
        setQuantidade(res.quantidade);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false)
  }


  const handleSubmit = async () => {
    setLoading(true)
    await getImoveis(filters?.page, filters?.tipo, filters?.cidade);
    setLoading(false)
  }

  return (
    <>
      <Container className="filter-all">
        <Row>
          <Col>
            <Box sx={{
              marginTop: { xs: 2, md: 4 },
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: { xs: 'wrap', md: 'no-wrap' },
              gap: 1,
              backgroundColor: '#cccccc1f',
              boxShadow: '0px 5px 11px rgb(0 0 0 / 15%)',
              borderRadius: '16px',
              padding: 2,
              alignItems: 'center'
            }}>
              <select
                className="input_todos_imoveis"
                style={{ padding: '8px 10px', height: '40px', margin: '8px!important', borderRadius: '6px', border: '1px solid rgb(222, 222, 222', maxWidth: '180px' }}
                onChange={(e) => setFilters({ ...filters, cidade: e.target.value })} value={filters?.cidade}>
                <option>Cidade</option>
                {cidades.map((cidade, key) => {
                  return (
                    <option value={cidade.codigo} key={`cidade:${key}`}>
                      {cidade.nome}
                    </option>
                  );
                })}
              </select>
              <select
                className="input_todos_imoveis"
                style={{
                  padding: '8px 10px',
                  height: '40px',
                  margin: '8px!important',
                  borderRadius: '6px',
                  border: '1px solid rgb(222, 222, 222',
                  maxWidth: '180px',
                  marginRight: '5px'
                }}
                onChange={(e) => setFilters({ ...filters, tipo: e.target.value })} value={filters?.tipo}>
                <option>Tipo de imóvel</option>
                {tipos.map((tipo, key) => {
                  return (
                    <option value={tipo.codigo} key={`tipo:${key}`}>
                      {tipo.nome}
                    </option>
                  );
                })}
              </select>
              <CurrencyFilter />
              <IconButton
                // onClick={() => navigate('/todososimoveis', { state: { cidade: { codigo: filters?.cidade }, tipo: { codigo: filters?.tipo }, min: filters?.min, max: filters?.max } })}
                sx={{
                  display: { xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' },
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
              <Box
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}
                onClick={handleSubmit}
              >
                <Button variant="contained">Buscar</Button>
              </Box>
            </Box>
          </Col>
        </Row>
      </Container>
      <ResultBusca
        filters={filters}
        setFilters={setFilters}
        getImoveis={getImoveis}
        quantidade={quantidade}
        paginas={paginas}
        imoveis={imoveis}
      />
    </>
  )
}