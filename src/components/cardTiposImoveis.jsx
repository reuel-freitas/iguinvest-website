import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import "./css/cardTiposImoveis.css";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link, useNavigate } from "react-router-dom";

function CardTiposImoveis() {

  const navigate = useNavigate();

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
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  const [tipos, setTipos] = useState([]);
  useEffect(() => {
    axios
      .get("https://sleepy-bayou-22688.herokuapp.com/api/tiposdeimoveisdisponiveis")
      .then((response) => {
        setTipos(response.data.lista);
      })
      .catch(() => {
        console.log("Deu errado");
      });
  }, []);
  return (
    <>
      <Container>
        <h2 className="h2" style={{ fontSize: '1.8em' }}>Tipos de Imóveis para você</h2>
        <ul className="ul_hozintal__scroll">
          {tipos.map((tipo, key) => {
            return (
              <li
                key={`tipo:${key}`}
                className="li_scroll"
                value={tipo.codigo}
                onClick={() => navigate('/todososimoveis', { state: { tipo } })}
                style={{ cursor: 'pointer' }}
              >
                {tipo.nome}
              </li>
            );
          })}
        </ul>
      </Container>
    </>
  );
}

export default CardTiposImoveis;
