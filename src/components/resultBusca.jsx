import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import axios from "axios";

import iconArea from "../pages/assets/icons/icon-area-1.svg";
import iconAreaExt from "../pages/assets/icons/icon-area-2.svg";
import IconBed from "../pages/assets/icons/icon-bed.svg";
import IconCar from "../pages/assets/icons/icon-car.svg";
import IconLocation from "../pages/assets/icons/icon-location-on.svg";
import IconShower from "../pages/assets/icons/icon-shower.svg";
import { useNavigate } from "react-router-dom";
import { AppContext } from '../contexts/AppContext';
import { Box } from "@mui/material";

function ResultBusca({ cidade, tipo }) {
  // pega a quantidade de imoveis e calcula a quatidade de páginas
  const { setLoading } = useContext(AppContext)

  const navigate = useNavigate();

  const [quantidade, setQuantidade] = useState([]);
  let quantidadeImoveis = quantidade;
  let paginas = quantidade > 20 ? Math.round(quantidadeImoveis / 20) : quantidade;

  const [imoveis, setImoveis] = useState([]);

  let page;

  page = 1;


  async function getImoveis(cidade, tipo, page) {
    try {
      if (!cidade && !tipo) {
        let res = await axios.get(
          `https://sleepy-bayou-22688.herokuapp.com/api/imoveisDisponiveis/${page}`
        );
        setImoveis(res.data.lista);
        setQuantidade(res.data.quantidade);
      } else if (cidade === "" && tipo) {
        let res = await axios.get(
          `https://sleepy-bayou-22688.herokuapp.com/api/imoveisDisponiveis/${page}/${tipo}`
        );
        setImoveis(res.data.lista);
        setQuantidade(res.data.quantidade);
      } else if (cidade && !tipo) {
        let res = await axios.get(
          `https://sleepy-bayou-22688.herokuapp.com/api/imoveisDisponiveis/${page}/0/${cidade}`
        );
        setImoveis(res.data.lista);
        setQuantidade(res.data.quantidade);
      }
      else {
        let res = await axios.get(
          `https://sleepy-bayou-22688.herokuapp.com/api/imoveisDisponiveis/${page}/${tipo}/${cidade}`
        );
        setImoveis(res.data.lista);
        setQuantidade(res.data.quantidade);
      }
    } catch (error) {
      console.error(error);
    }

    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    getImoveis(cidade, tipo, page);
  }, [cidade, tipo]);

  // Muda a página quando clica no botão da paginação e scrolla até o topo
  function handlePagination(event) {
    page = event.currentTarget.textContent;
    getImoveis(cidade, tipo, page);
    window.scrollTo(0, 0);
  }

  function handleDetails(imovel) {
    console.log(imovel)
    navigate(`/todososimoveis/${imovel.codigo}`, { state: imovel });
  }

  return (
    <>
      <Container>
        <Row>
          {imoveis.length > 0 ? imoveis.map((imovel, key) => (
            <Col xs="12" sm="12" md="6" lg="4" className="mt-4" key={`imovel:${key}`}>
              <div className="carousel-super-destaque">
                <div className="card-imoveis">
                  <div
                    className="card-imoveis_img__top"
                    style={{
                      backgroundImage: `url(${imovel.urlfotoprincipal})`,
                    }}
                  ></div>
                  <div className="card-imoveis_body">
                    <div className="card-imoveis_body_title">
                      <h3 className="card-imoveis_card__title">
                        {imovel.titulo}
                      </h3>
                    </div>
                    <div className="card-imoveis_text">
                      <p style={{
                        maxWidth: "100%",
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 1,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}>
                        <img
                          src={IconLocation}
                          className="img-responsive card-imoveis_icon__ubication"
                        />
                        {imovel.endereco}
                      </p>
                      <p>
                        <img
                          src={IconShower}
                          className="card-imoveis_icon__left img-responsive"
                        />
                        {imovel.numerobanhos} banheiros
                        <img
                          src={IconShower}
                          className="card-imoveis_icon__shower img-responsive"
                        />
                        {imovel.numerosuites} suites
                        <img
                          src={IconBed}
                          className="card-imoveis_icon__bed img-responsive"
                        />
                        {imovel.numeroquartos} quartos
                      </p>
                      <div className="card-imoveis_area">
                        <p>
                          <img
                            src={IconCar}
                            className="card-imoveis_icon__left img-responsive"
                          />
                          {imovel.numerovagas} vagas
                          <img
                            src={iconArea}
                            className="card-imoveis_icon__shower img-responsive"
                          />
                          {imovel.arealote} m² de lote
                          <img
                            src={iconArea}
                            className="card-imoveis_icon__bed img-responsive"
                          />
                          {imovel.areaprincipal} m² construção
                        </p>
                      </div>
                    </div>
                    <div style={{ marginTop: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      <button
                        className="button-more_info"
                        onClick={() => handleDetails(imovel)}
                      >
                        mais detalhes
                      </button>
                      <div style={{ width: 10 }} />
                      <a
                        href="https://api.whatsapp.com/send?phone=5545998171516&text=Ol%C3%A1,%20tenho%20interesse%20neste%20im%C3%B3vel,%20c%C3%B3digo%20776%20Aguardo%20breve%20o%20contato.%20Obrigado!."
                        style={{ width: '100%', maxWidth: '145px' }}
                      >
                        <button className="button-more_agend" style={{ width: '100%', maxWidth: '145px' }}>
                          agendar visita
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          )) : (
            <div>
              <h6>Nenhum imóvel encontrado com este(s) filtro(s)</h6>
            </div>
          )}
        </Row>
      </Container>
      {quantidade > 20 && (
        <Container className="mt-3 align-center">
          <Row>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Stack spacing={2}>
                <Pagination
                  count={paginas}
                  onChange={handlePagination}
                  shape="rounded"
                />
              </Stack>
            </Box>
          </Row>
        </Container>
      )}
    </>
  );
}

export default ResultBusca;
