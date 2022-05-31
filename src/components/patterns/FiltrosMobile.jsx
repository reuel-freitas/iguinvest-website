import React from "react";
import { Dialog, Typography, Box, Grid, Radio, Button, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

export const FiltrosMobile = ({ filters, setFilters, handleChangeCidade, handleChangeTipo, navigate, cidades, imoveisPorCidade }) => {
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