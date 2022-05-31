import axios from 'axios'
import { useState, useEffect, forwardRef } from 'react'
import { useLocation, useParams } from "react-router-dom"

import { Dialog, Box, Toolbar, IconButton, Typography, Button, ImageList, ImageListItem, Grid, Link } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import Image from 'mui-image'



import iconArea from "../pages/assets/icons/icon-area-1.svg";
import iconAreaExt from "../pages/assets/icons/icon-area-2.svg";
import IconBed from "../pages/assets/icons/icon-bed.svg";
import IconCar from "../pages/assets/icons/icon-car.svg";
import IconLocation from "../pages/assets/icons/icon-location-on.svg";
import IconShower from "../pages/assets/icons/icon-shower.svg";
import { GridOn } from '@mui/icons-material';
import GoogleMaps from '../components/googleMaps';
import { detalheImovel } from '../services/webservice';


export function Imovel(props) {

    const location = useLocation();
    const params = useParams();

    const [showImagesDialog, setShowImagesDialog] = useState(false);
    const [showImagesCarousel, setShowImagesCarousel] = useState(false);
    const [currentImage, setCurrentImage] = useState(0);
    const [imovel, setImovel] = useState(location.state ? location.state : {});

    useEffect(() => {
        loadDetail()
    }, [])

    const loadDetail = async () => {
        const response = await detalheImovel(params.id);
        console.log(response);
    }
    const latitude = imovel.latitude;
    const longitude = imovel.longitude;
    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', padding: { xs: 1, md: 0 } }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', padding: { xs: 0, sm: 0, md: 4 }, width: '100%', maxWidth: '1200px' }}>
                    <Box sx={{ padding: 2 }}>
                        <Typography variant="h5">{imovel?.titulo}</Typography>
                        <Typography>{imovel?.endereco}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', padding: { xs: 1, md: 0 } }}>
                        <Box sx={{ maxWidth: '1120px', width: '100%', marginTop: { xs: 0, md: 4 } }}>
                            <Grid container spacing={1} columns={16}>
                                <Grid item xs={16} sm={16} md={8}>
                                    <Box
                                        sx={{
                                            height: { xs: '280px', md: '500px' },
                                            width: '100%',
                                            paddingBottom: 1,
                                            '&:  hover': {
                                                filter: 'brightness(.5)',
                                                transition: '0.3s ease-in-out',
                                            }
                                        }}>
                                        <Image
                                            onClick={() => setShowImagesDialog(true)}
                                            src={imovel?.fotos[0].url}
                                            alt="tdsadas"
                                            fit="cover"
                                            durantio={0}
                                            sx={{
                                                width: "100%",
                                                height: '100%',
                                                borderRadius: { xs: '13px', md: '13px 0 0 13px' },
                                                cursor: 'pointer'
                                            }}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={8} sx={{ display: { xs: 'none', sm: 'none', md: 'grid' } }}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            flexWrap: "wrap",
                                            justifyContent: "space-evenly",
                                            height: "500px",
                                            // '&:  hover': {
                                            //     filter: 'brightness(.5)',
                                            // },
                                            // transition: '0.3s ease-in-out'
                                        }}
                                    >{imovel.fotos.filter((foto, index) => index > 0 && index < 5).map((picture, idx) =>

                                        <img
                                            onClick={() => setShowImagesDialog(true)}
                                            src={picture.url}
                                            alt="tdsadas"
                                            style={{
                                                width: "50%",
                                                borderTopRightRadius: idx === 1 ? '13px' : 0,
                                                borderBottomRightRadius: idx === 3 ? '13px' : 0,
                                                transition: '0.3s ease-in-out',
                                                cursor: 'pointer',
                                                paddingInline: 4,
                                                paddingBottom: 8
                                            }}
                                        />
                                    )}
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <Dialog
                        fullScreen
                        open={showImagesDialog}
                        onClose={() => setShowImagesDialog(false)}
                        sx={{ transition: '5s ease-in-out' }}
                    >
                        <Toolbar>
                            <IconButton
                                edge="start"
                                aria-label="fechar"
                                onClick={() => setShowImagesDialog(false)}
                                sx={{ color: "#000" }}
                            >
                                <ArrowBackIosNewIcon fontSize='small' />
                            </IconButton>
                        </Toolbar>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                            // marginInliner: '5rem'
                        }}>
                            <Box sx={{ width: { xs: '90%', md: '50%' }, height: '100%', marginBlock: 5 }}>
                                <ImageList variant="masonry" cols={2} gap={8} >
                                    {imovel.fotos.map((item, index) => (
                                        <Button onClick={() => {
                                            setCurrentImage(index)
                                            setShowImagesCarousel(true)
                                        }}>
                                            <ImageListItem key={item.img} sx={{ "&:hover": { filter: 'brightness(0.5)' } }}>
                                                <img
                                                    src={`${item.url}`}
                                                    alt={item.descricao}
                                                />
                                            </ImageListItem>
                                        </Button>
                                    ))}
                                </ImageList>
                            </Box>
                        </Box>
                    </Dialog>
                    <Carousel handleClose={() => setShowImagesCarousel(false)} open={showImagesCarousel} data={imovel.fotos} currentImage={currentImage} setCurrentImage={setCurrentImage} />
                </Box>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', padding: { xs: 2, md: 0 } }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', padding: { xs: 0, sm: 0, md: 4 }, width: '100%', maxWidth: '1200px' }}>
                    <Grid container sx={{ justifyContent: 'space-between' }}>
                        <Grid item xs={12} md={7}>
                            <Typography sx={{ fontSize: { xs: 18, md: 20 }, color: '#222222', fontWeight: 600, fontFamily: 'Montserrat' }}>{imovel.titulo ? imovel.titulo : {}}</Typography>
                            <Typography sx={{ fontSize: { xs: 0, md: 12 }, color: '#222222' }}> <img src={IconLocation} style={{ width: 12, paddingBottom: 4 }} /> {imovel.endereco}</Typography>
                            <ul style={{ listStyle: 'none', display: 'inline-flex', padding: 0, fontWeight: 400 }}>
                                <li style={{ paddingRight: 4 }}>{imovel.numeroquartos} quartos </li>
                                <li style={{ paddingInline: 4 }}>• {imovel.numerobanhos} banheiros </li>
                                <li style={{ paddingInline: 4 }}>• {imovel.numerosuites} suites </li>
                            </ul>
                            <hr />
                            <Typography style={{ whiteSpace: 'pre-line' }}>{imovel.descricao.replace(/(?:\r\n|\r|\n)/g, '\n')}</Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>

                            <Box sx={{ boxShadow: 'rgb(0 0 0 / 12%) 0px -3px 16px', border: '1px solid rgb(221, 221, 221)', height: '80px', position: 'fixed', bottom: 0, background: '#FFF', margin: 0, width: '100%', left: 0, paddingBlock: 2, paddingInline: 1, display: { md: 'none' }, zIndex: 1 }}>
                                <Grid container>
                                    <Grid item xs={7}>
                                        <Typography sx={{ color: '#222222', fontFamily: 'Montserrat', fontWeight: 600, fontSize: 18 }}>Valor: {imovel.valor}</Typography>
                                        <Typography sx={{ color: '#7b7b7b', fontWeight: 300, fontFamily: 'Montserrat', fontSize: '14px', marginTop: 0, lineHeight: '14px' }}>Telefone: {imovel.telefoneunidade}</Typography>
                                    </Grid>
                                    <Grid item xs={5}>
                                        <Link sx={{ textDecoration: 'none' }} href="https://api.whatsapp.com/send?phone=5545998171516&text=Ol%C3%A1,%20tenho%20interesse%20neste%20im%C3%B3vel,%20c%C3%B3digo%20776%20Aguardo%20breve%20o%20contato.%20Obrigado!.">
                                            <Button sx={{
                                                color: '#fff',
                                                fontSize: '12px',
                                                width: '100%',
                                                height: '44px',
                                                marginTop: 0,
                                                background: 'linear-gradient(to right, #E61E4D 0%, #E31C5F 50%, #D70466 100%) !important',
                                                '&:  hover': {
                                                    background: 'linear-gradient(48deg, rgba(247,58,92,1) 0%, rgba(250,76,103,1) 10%, rgba(254,102,119,1) 97%)',
                                                }
                                            }}>Entrar em contato</Button>
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>

                            <Box sx={{ boxShadow: 'rgb(0 0 0 / 12%) 0px 6px 16px', borderRadius: '12px', border: '1px solid rgb(221, 221, 221)', height: { xs: 320, md: 300 }, padding: '24px', display: { xs: 'none', md: 'block' } }}>
                                <Typography sx={{ color: '#222222', fontFamily: 'Montserrat', fontWeight: 600, fontSize: 20 }}>Valor: {imovel.valor}</Typography>
                                <Typography sx={{ color: '#7b7b7b', fontWeight: 300, fontFamily: 'Montserrat', fontSize: '14px', marginTop: .5 }}>Telefone: {imovel.telefoneunidade}</Typography>
                                <Typography sx={{ color: '#7b7b7b', fontWeight: 300, fontFamily: 'Montserrat', fontSize: '14px' }}>Email: {imovel.emaileunidade}</Typography>
                                <Typography sx={{ color: '#222222', fontWeight: 600, fontFamily: 'Montserrat', textAlign: 'center', marginTop: 4, marginBottom: 1, fontSize: { xs: 16, md: 18 } }}>Entre em contato e <br />agende uma visita!</Typography>
                                <Link sx={{ textDecoration: 'none' }} href="https://api.whatsapp.com/send?phone=5545998171516&text=Ol%C3%A1,%20tenho%20interesse%20neste%20im%C3%B3vel,%20c%C3%B3digo%20776%20Aguardo%20breve%20o%20contato.%20Obrigado!.">
                                    <Button sx={{
                                        color: '#fff',
                                        width: '100%',
                                        height: '44px',
                                        marginTop: 2,
                                        background: 'linear-gradient(to right, #E61E4D 0%, #E31C5F 50%, #D70466 100%) !important',
                                        '&:  hover': {
                                            background: 'linear-gradient(48deg, rgba(247,58,92,1) 0%, rgba(250,76,103,1) 10%, rgba(254,102,119,1) 97%)',
                                        }
                                    }}>Entrar em contato</Button>
                                </Link>
                            </Box>

                            <GoogleMaps latitude={latitude} longitude={longitude} />


                        </Grid>
                    </Grid>
                </Box>
            </Box>





        </>
    )
}

const Carousel = ({ data, open, handleClose, currentImage, setCurrentImage }) => {

    const handleSwipeLeft = (currentImage) => {
        if (!currentImage) {
            return null
        } else {
            setCurrentImage(currentImage - 1)
        }
    }
    
    const handleSwipeRight = (currentImage) => {
        if (currentImage + 1 === data.length) {
            return null
        } else {
            setCurrentImage(currentImage + 1)
        }
    }

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
        >
            <Box sx={{ display: { xs: 'flex', md: 'block' }, flexDirection: 'column', flexWrap: 'nowrap', width: '100%', height: '100%', backgroundColor: '#000', paddingBlock: 2, paddingInline: { xs: 0, sm: 5, md: 10 } }}>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Button
                        variant="contained"
                        aria-label="fechar"
                        onClick={handleClose}
                        size='small'
                        sx={{ textTransform: 'none', backgroundColor: "#000", '&:hover': { backgroundColor: "#808080" } }}
                        startIcon={<CloseIcon fontSize='small' sx={{ color: '#FFFFFF' }} />}>
                        <Typography sx={{ color: '#FFFFFF' }}>Fechar</Typography>
                    </Button>
                    <Typography sx={{ color: '#FFFFFF' }}>{currentImage + 1}/{data.length}</Typography>
                </Toolbar>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: { xs: 'center', sm: 'space-between' }, flex: 1, paddingBlock: { xs: 1, sm: 5, md: 10 } }}>
                    <IconButton sx={{ display: { xs: 'none', sm: 'inherit' } }}>
                        <ArrowCircleLeftIcon fontSize='large' onClick={handleSwipeLeft} sx={{ color: '#FFFFFF' }} />
                    </IconButton>
                    <Image
                        src={`${data[currentImage].url}`}
                        alt={data.descricao}
                        fit="cover"
                        durantio={0}
                        sx={{
                            width: "100%",
                            borderRadius: { xs: 0, md: 5 },
                            minHeight: { xs: 235, sm: 300, md: 500 },
                            maxWidth: { xs: 420, sm: 500, md: 900 },
                            maxHeight: { xs: 200, sm: 300, md: 500 },
                        }}
                    />
                    <IconButton sx={{ display: { xs: 'none', sm: 'inherit' } }}>
                        <ArrowCircleRightIcon fontSize='large' onClick={handleSwipeRight} sx={{ color: '#FFFFFF' }} />
                    </IconButton>
                </Box>
            </Box>
        </Dialog>
    )
}

