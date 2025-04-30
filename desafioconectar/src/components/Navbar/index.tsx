import React from "react";
import { NavbarStyle, Title, ButtonContainer, Button } from "./styles";
import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <NavbarStyle>
      <Title>FinancieCGX.io</Title>
      <ButtonContainer>
        <Link to="/">
          <Button>PIB Evolução</Button>
        </Link>
        <Link to="/tabela">
          <Button>PIB Tabela</Button>
        </Link>
      </ButtonContainer>
    </NavbarStyle>
  );
}