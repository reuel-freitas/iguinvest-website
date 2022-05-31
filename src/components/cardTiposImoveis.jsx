import React from "react";
import { Container } from "react-bootstrap";
import "./css/cardTiposImoveis.css";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";

function CardTiposImoveis({tipos}) {

  const navigate = useNavigate();

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
