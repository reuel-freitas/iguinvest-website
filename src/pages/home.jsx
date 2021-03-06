import React, { useContext, useEffect, useState } from "react";
import "./css/home.css";
import logo from "./assets/logo.svg";
import SuperCardsHome from "../components/superCardHome";
import CardTiposImoveis from "../components/cardTiposImoveis";
import CardCidades from "../components/cidadesHome";
import { Row, Container } from "react-bootstrap";
import FiltroHome from "../components/filtroHome";
import { Typography, Box, Grid } from "@mui/material";
import Iconfind from "../pages/assets/icons/Icon-feather-search.svg";
import { tiposImoveisDisponiveisPorCidade } from "../services/webservice";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";
import { FiltrosMobile } from "../components/patterns/FiltrosMobile";
import { ImoveisContext } from "../contexts/ImoveisContext";

export function Home() {

  const navigate = useNavigate();

  const { setLoading } = useContext(AppContext);

  const { tipos, cidades } = useContext(ImoveisContext)

  const [filters, setFilters] = useState({ open: false, tipo: "", cidade: 1 });
  const [imoveisPorCidade, setImoveisPorCidade] = useState([]);

  useEffect(() => {
    setLoading(true)
    loadData(filters.cidade, filters.tipo)
    setLoading(false)
  }, [filters.cidade, filters.tipo])

  const loadData = async (cidade) => {
    try {
      let res = await tiposImoveisDisponiveisPorCidade(cidade)
      setImoveisPorCidade(res.lista)
    } catch (error) {
      console.error(error);
    }
  }

  const handleChangeCidade = (event) => {
    setFilters({ ...filters, cidade: event.target.value });
  };

  const handleChangeTipo = (event) => {
    console.log(event.target.value)
    setFilters({ ...filters, tipo: event.target.value });
  };

  return (
    <>
      <div className="hero">
        <div className="content-title-hero" style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            <button className="form_busca__mobile d-md-none" onClick={() => setFilters({ ...filters, open: true })}>
              Encontre seu imovel <img src={Iconfind} className="icon_find" alt="" />
            </button>
          </div>
          <Typography sx={{ marginTop: { xs: '3em', md: 0 }, textAlign: 'center', fontSize: 46, color: '#fff', fontWeight: 800, fontFamily: 'Montserrat' }}>Iguasu Invest</Typography>
          <hr className="hr" style={{ maxWidth: '320px' }} />
          <h2 className="subtitle-hero">A arte de viver bem</h2>
        </div>
        <div style={{ padding: '20px', paddingTop: 0 }}>
          <FiltroHome tipos={tipos} cidades={cidades} />
        </div>
      </div>
      <SuperCardsHome />
      <div>
        <CardTiposImoveis tipos={tipos} />
        <CardCidades cidades={cidades} />
        <Box sx={{ flexGrow: 1, paddingInline: { xs: '2rem', sm: '3rem', md: '10rem' }, marginBlock: '4rem', paddingBlock: '2rem', backgroundColor: '#f5f5f5' }}>
          <Grid container justifyContent='center' alignItems='center' spacing={2} sx={{ flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' } }}>
            <Grid item xs={12} sm={12} md={6}>
              <img
                src={logo}
                alt="iguassu invest"
                style={{
                  width: 250,
                  height: 'auto',
                  objectFit: 'contain'
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Box>
                <Typography sx={{ fontSize: '2.2em', color: '#212529', marginBlock: 2, textAlign: { xs: 'center', sm: 'center', md: 'start' } }}>Nossa Hist??ria</Typography>
                <Typography sx={{ fontSize: 16, color: '#212529', textAlign: { xs: 'center', sm: 'center', md: 'start' } }}> Lorem ipsum Suspendisse consectetur mi at nisl tristique mollis. Pellentesque tempor quam quis purus tempor, eget facilisis dui iaculis. Nunc nibh arcu, pellentesque eget libero et, dictum tempor elit.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Container className="youtube_section">
          <Row>
            <h3 style={{ fontSize: '1.8em' }}>Acompanhe nosso canal no Youtube </h3>
            <div className="embed-responsive embed-responsive-16by9 align-content-center">
              <iframe
                className="embed-responsive-item"
                src="https://www.youtube.com/embed/5CDaG_KXLUk"
              ></iframe>
            </div>
          </Row>
          <Row>
            <h3 className="mt-3">Aqui v??o vir as publica????es do Instagram</h3>
          </Row>
        </Container>
      </div >
      {filters.open &&
        <FiltrosMobile
          filters={filters}
          setFilters={setFilters}
          handleChangeCidade={handleChangeCidade}
          handleChangeTipo={handleChangeTipo}
          cidades={cidades}
          tipos={tipos}
          imoveisPorCidade={imoveisPorCidade}
          navigate={navigate}
        />
      }
    </>
  );
}


