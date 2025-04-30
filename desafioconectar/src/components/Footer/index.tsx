import React from "react";
import { FooterStyle, FooterContent, FooterLinks, FooterButton, SocialIcons } from "./style";
import { Link } from "react-router-dom"; // Caso queira usar React Router para navegação
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa"; // Exemplos de ícones de redes sociais

export function Footer() {
  return (
    <FooterStyle>
      <FooterContent>
        <FooterLinks>
          <Link to="/sobre">Sobre</Link>
          <Link to="/contato">Contato</Link>
          <Link to="/termos">Termos de Uso</Link>
          <Link to="/privacidade">Política de Privacidade</Link>
        </FooterLinks>

        <FooterButton>
          <Link to="/creditos">Créditos</Link>
        </FooterButton>

        <SocialIcons>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
        </SocialIcons>

        <div>© 2025 Nome do Projeto - Todos os direitos reservados</div>
      </FooterContent>
    </FooterStyle>
  );
}