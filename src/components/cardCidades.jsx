import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import "./cardTiposImoveis.css";

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';


function CardTiposImoveis() {

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
          items: 2
        }
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
        <h2 className="h2">Descubra novas</h2>
            <Carousel 
            responsive={responsive}
            keyBoardControl={false}
            showDots={false}
            arrows={false} 
>
                {tipos.map((tipos, key) => {
                        return (
                            <>
                            <div className="carousel-cell" key={key}>
                                    <a href="#">
                                        <div className="card-tipos">
                                        <div className="tipos-img">
                                            <img
                                            src="https://www.loumarturismo.com.br/m//assets/img/wyndham750x800.png"
                                            className="img-fluid"
                                            alt=""
                                            />
                                        </div>
                                        <div className="tipos-name">
                                            <p>{tipos.nome}</p>
                                        </div>
                                        </div>
                                    </a>
                                    </div>
                            </>
                        );
                        })}
            </Carousel>
    </Container>

</>
  );
}

export default CardTiposImoveis;
