import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Container, Row, Col } from "react-bootstrap";
import json from "../components/jsonImgFuncionarios";
import { Card, Divider } from "@mui/material";
import './css/quemSomos.css';
import bgCard from './assets/bg-card-funcionarios.svg'

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export function QuemSomos() {
  const [funcionarios, setFuncionarios] = useState([]);
  useEffect(() => {
    const loadAll = async () => {
      let funcionarios = await json.imgFuncionarios();
      setFuncionarios(funcionarios);
    };
    loadAll();
  }, []);

  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col>
            <Container className="youtube_section">
              <Row>
                <h3>
                  {" "}
                  Conheça nossa história <br></br>e descubra nossa trajetória
                </h3>
                <div className="embed-responsive embed-responsive-16by9 align-content-center">
                  <iframe
                    className="embed-responsive-item"
                    src="https://www.youtube.com/embed/f4DH6pu4ejs"
                  ></iframe>
                </div>
              </Row>
            </Container>
            <h2 className="text-center mt-5 h2">Nós fazemos a Iguassu Invest</h2>
            <Carousel
              responsive={responsive}
              keyBoardControl={false}
              showDots={false}
              arrows={true}
              autoPlay={true}
            >
              {funcionarios.map((funcionario, key) => {
                return (
                  <Card className="card" style={{backgroundImage: `url(${bgCard})`}} key={key}>
                    <div className="img-funcionarios" style={{backgroundImage: `url(${funcionario.url})`}}></div>
                    <h3>{funcionario.name}</h3>
                    <p className="desc-funcionario">{funcionario.desc}</p>
                  </Card>
                );
              })}
            </Carousel>
          </Col>
        </Row>
        <Row className="quem-somos-section">
          <Col>
            <h2 className="h2">Quem Somos</h2>
            <p>
              A<b> Iguassu Invest</b> atua no Mercado desde 2012 e oferece assessoria
              imobiliária na compra e venda de imóveis em Foz do Iguaçu e
              região. Oferecemos um serviço inovador, buscando sempre
              identificar as necessidades de nossos clientes, prezando pela
              qualidade dos serviços e oferecendo um atendimento personalizado.
              Procuramos também antecipar as tendências do mercado imobiliário
              para oferecer os melhores produtos aos nossos clientes. É
              idealizadora do evento CASAFOZ DESIGN, mostra de arquitetura e
              design que reuniu mais de 50 arquitetos, 300 expositores e mais de
              50 mil visitantes de todas as partes do Brasil, Paraguai e
              Argentina. É parceira do Tetris Container Hostel, fundado em 2014
              é mais do que um meio de hospedagem, é um ambiente de conexões e
              experiências. Tem como propósito é criar um ambiente receptivo
              para conectar os hóspedes com pessoas locais e de outras partes do
              mundo, e transformar a estadia em uma experiência única. Em 2014 o
              Tetris foi eleito o melhor hostel do Brasil. Em 2019 foi lançado a
              Tetris Franquias, projeto de expansão e abertura de novas unidades
              em outras cidades do Brasil e América do Sul. Seja nosso parceiro,
              estamos aguardando seu contato!
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
}
