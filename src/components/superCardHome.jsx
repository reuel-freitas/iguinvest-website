import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import "./css/superCardHome.css";
import { useNavigate } from "react-router-dom";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import iconArea from "../pages/assets/icons/icon-area-1.svg";
import iconAreaExt from "../pages/assets/icons/icon-area-2.svg";
import IconBed from "../pages/assets/icons/icon-bed.svg";
import IconCar from "../pages/assets/icons/icon-car.svg";
import IconLocation from "../pages/assets/icons/icon-location-on.svg";
import IconShower from "../pages/assets/icons/icon-shower.svg";

function SuperCardsHome() {

  const navigate = useNavigate();

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  const [imoveis, setImoveis] = useState([]);
  useEffect(() => {
    axios
      .get("https://sleepy-bayou-22688.herokuapp.com/api/ImoveisDestaqueDisponiveis")
      .then((response) => {
        setImoveis(response.data.lista);
      })
      .catch(() => {
        console.log("Deu errado");
      });
  }, []);

  function handleDetails(imovel) {
    console.log(imovel)
    navigate(`/todososimoveis/${imovel.codigo}`, { state: imovel });
  }

  return (
    <>
      <Container>
        <h2 className="h2" style={{ fontSize: '1.8em' }}>Super Destaque</h2>
        <Carousel
          responsive={responsive}
          keyBoardControl={false}
          showDots={false}
          arrows={true}
          autoPlay={true}
        >
          {imoveis.map((imovel, key) => {
            return (
              <Col xs="12" sm="12" md="12" lg="12" className="mt-4" key={`imovel:${key}`}>
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
                      <p>
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
                        style={{ width: '100%', maxWidth: '170px' }}
                      >
                        <button className="button-more_agend" style={{ width: '100%', maxWidth: '170px' }}>
                          agendar visita
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            );
          })}
        </Carousel>
      </Container>

    </>
  );
}

export default SuperCardsHome;
