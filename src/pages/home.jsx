import React, { useContext, useEffect } from "react";
import "./css/home.css";
import logo from "./assets/logo.svg";
// import '../getImoveisHome';
import SuperCardsHome from "../components/superCardHome";
import CardTiposImoveis from "../components/cardTiposImoveis";
import CardCidades from "../components/cidadesHome";
import { Row, Col, Container } from "react-bootstrap";
import FiltroHome from "../components/filtroHome";
import { Dialog, Typography, Box, Grid, Radio, Button, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import Iconfind from "../pages/assets/icons/Icon-feather-search.svg";
import CheckIcon from '@mui/icons-material/Check';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import axios from "axios";
import { cidadesDisponiveis, tiposdeImoveisDisponiveis, tiposImoveisDisponiveisPorCidade } from "../services/webservice";
import { useNavigate } from "react-router-dom";
import { fontFamily } from "@mui/system";
import { AppContext } from "../contexts/AppContext";

export function Home() {

  const navigate = useNavigate();

  const [filters, setFilters] = React.useState({ open: false, tipo: "", cidade: 1 });
  const [tipos, setTipos] = React.useState([]);
  const [cidades, setCidades] = React.useState([]);
  const [imoveisPorCidade, setImoveisPorCidade] = React.useState([]);
  const { setLoading } = useContext(AppContext);

  useEffect(() => {
    loadImoveis()
  }, []);

  const loadImoveis = async () => {
    const res = await tiposdeImoveisDisponiveis(setLoading)
    setTipos(res.lista);
    const cidades = await cidadesDisponiveis(setLoading)
    setCidades(cidades.lista);
  }

  useEffect(() => {
    getImoveis(filters.cidade, filters.tipo)
  }, [filters.cidade, filters.tipo])

  const getImoveis = async (cidade) => {
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
        <div className="content-title-hero" style={{textAlign: 'center'}}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <button className="form_busca__mobile d-md-none" onClick={() => setFilters({ ...filters, open: true })}>
            Encontre seu imovel <img src={Iconfind} className="icon_find" alt="" />
          </button>
        </div>
          <Typography sx={{marginTop: {xs: '3em', md: 0}, textAlign: 'center', fontSize: 46, color: '#fff', fontWeight: 800, fontFamily: 'Montserrat' }}>Iguasu Invest</Typography>
          <hr className="hr" style={{maxWidth: '320px'}}/>
          <h2 className="subtitle-hero">A arte de viver bem</h2>
        </div>
        <div style={{padding: '20px', paddingTop: 0}}>
        <FiltroHome />
        </div>
        
      </div>
      <SuperCardsHome />
      <div>
        <CardTiposImoveis />
        <CardCidades />
        <Box sx={{ flexGrow: 1, paddingInline: { xs: '2rem', sm: '3rem', md: '10rem' }, marginBlock: '4rem', paddingBlock: '2rem', backgroundColor: '#f5f5f5' }}>
          <Grid container justifyContent='center' alignItems='center' spacing={2}>
            <Grid item xs={12} sm={12} md={6}>
              <img
                src={logo}
                alt="iguassu invest"
                sx={{
                  maxWidth: { xs: 200, sm: 200, md: 250 }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Box>
                <Typography sx={{ fontSize: '2.2em', color: '#212529', marginBlock: 2, textAlign: { xs: 'center', sm: 'center', md: 'start' } }}>Nossa História</Typography>
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
            <h3 className="mt-3">Aqui vão vir as publicações do Instagram</h3>

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

const FiltrosMobile = ({ filters, setFilters, handleChangeCidade, handleChangeTipo, navigate, cidades, imoveisPorCidade }) => {
  return (
    <Dialog
      fullScreen
      open={filters.open}
      onClose={() => setFilters({ ...filters, open: false })}
      sx={{ width: '100%', display: { xs: 'block', sm: 'block', md: 'none', lg: 'none' }, justifyContent: 'flex-end' }}
      PaperProps={{
        style: {
          backgroundImage: `linear-gradient(to right, #ff0451, #812240)`,
        },
      }}
    >
      <Box sx={{ backgroundColor: '#fff', borderTopLeftRadius: '25px', borderTopRightRadius: '25px', marginTop: 6 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 4, paddingBottom: 60 }}>
          <Typography variant="h6" sx={{ fontFamily: 'Montserrat', fontSize: 18, fontWeight: 600}}>Escolha a cidade do seu imóvel</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', marginTop: 3 }}>
            {cidades.map((cidade, index) => (
              <Box key={`cidades: ${index}`} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography sx={{ color: '#222', fontFamily: 'Montserrat'}}>{cidade.nome}</Typography>
                <Radio
                  checked={filters?.cidade == cidade.codigo}
                  onChange={handleChangeCidade}
                  value={cidade.codigo}
                  name="radio-buttons"
                  sx={{}}
                  icon={<RadioButtonUncheckedIcon style={{ color: "#ff0451" }} />}
                  checkedIcon={<CheckIcon style={{ color: "#ff0451", border: '2px solid #ff0451', borderRadius: '50%' }} />}
                  inputProps={{ 'aria-label': 'A' }}
                />
              </Box>
            ))}
          </Box>
          <Typography variant="h6" sx={{ fontFamily: 'Montserrat', fontSize: 18, fontWeight: 600, marginTop: 4}}>Escolha o tipo de imóvel</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', marginTop: 1 }}>
            {imoveisPorCidade.map((tipo, index) => (
              <Box key={`tipo:${index}`} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography sx={{ color: '#222',fontFamily: 'Montserrat', padding: 0 }}>{tipo.nome}</Typography>
                <Radio
                  checked={filters?.tipo == tipo.codigo}
                  onChange={handleChangeTipo}
                  value={tipo.codigo}
                  name="radio-buttons"
                  sx={{transition: '1s ease-in'}}
                  icon={<RadioButtonUncheckedIcon style={{ color: "#ff0451" }} />}
                  checkedIcon={<CheckIcon style={{ color: "#ff0451", border: '2px solid #ff0451', borderRadius: '50%', padding: 4 }} />}
                  inputProps={{ 'aria-label': 'A' }}
                />
              </Box>
            ))}
          </Box>
        </Box>
        <Box sx={{ boxShadow: 'rgb(0 0 0 / 12%) 0px -3px 16px', border: '1px solid rgb(221, 221, 221)', height: '80px', position: 'fixed', bottom: 0, background: '#FFF', margin: 0, width: '100%', left: 0, paddingBlock: 2, paddingInline: 1, display: { md: 'none' } }}>
          <Grid container>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Button
                  onClick={() => navigate('/todososimoveis', { state: { cidade: { codigo: filters?.cidade }, tipo: { codigo: filters?.tipo } } })}
                  sx={{
                    color: '#fff',
                    fontSize: '12px',
                    width: '100%',
                    maxWidth: '220px',
                    height: '44px',
                    marginTop: 0,
                    fontFamily: 'Montserrat',
                    background: 'linear-gradient(to right, #E61E4D 0%, #E31C5F 50%, #D70466 100%) !important',
                    '&:  hover': {
                      background: 'linear-gradient(48deg, rgba(247,58,92,1) 0%, rgba(250,76,103,1) 10%, rgba(254,102,119,1) 97%)',
                    }
                  }}>
                  Buscar
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box sx={{position: 'absolute', top: 5, right: 5}}>
        <IconButton onClick={() => setFilters({ ...filters, open: false })}>
          <CloseIcon style={{ color: '#fff'}} />
        </IconButton>
      </Box>
    </Dialog>
  )
}
