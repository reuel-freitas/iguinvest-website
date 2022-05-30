import React from "react";
import { Navbar, Container, Nav} from "react-bootstrap";

export function Header() {
  return (
    <>
      <Navbar>
        <Container>
          <Navbar.Brand href="/"><img className="logo" src="/logo.svg"  /></Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/todososimoveis">Buscar Imóvel</Nav.Link>
            <Nav.Link href="/quemsomos">A Iguassu Invest</Nav.Link>
          </Nav>
        </Container>
      </Navbar>      
    </>
  );
}
