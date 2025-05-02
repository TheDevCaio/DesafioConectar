import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  NavbarStyle,
  Title,
  HamburgerIcon,
  ButtonContainer,
  Button
} from "./styles";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <NavbarStyle>
      <Title>FinancieCGX.io</Title>

      <HamburgerIcon
        src="/menuMobile.png"
        alt="menu"
        onClick={() => setIsOpen(!isOpen)}
      />

      <ButtonContainer isOpen={isOpen}>
        <Link to="/">
          <Button>Evolução</Button>
        </Link>
        <Link to="/tabela">
          <Button>Tabela</Button>
        </Link>
      </ButtonContainer>
    </NavbarStyle>
  );
}