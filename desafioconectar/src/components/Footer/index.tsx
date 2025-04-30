import React from "react";
import { FooterStyle,  SocialIcons, Escritor } from "./style";
import { Link } from "react-router-dom"; 
import { FaWhatsapp, FaGithub } from "react-icons/fa"; 

export function Footer() {
  return (
    <FooterStyle>
        <Escritor>© TheDevCaio</Escritor>

        <SocialIcons>

          <a href="https://wa.me/32988648333" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp />
          </a>
          

          <a href="https://github.com/TheDevCaio" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
        </SocialIcons>
    </FooterStyle>
  );
}