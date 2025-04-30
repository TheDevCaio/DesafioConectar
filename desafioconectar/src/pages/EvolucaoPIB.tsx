'use client';
import React from 'react';
import Grafico from '../components/Grafico';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import GlobalStyle, { Container } from '../components/GlobalStyles';


export default function EvolucaoPIB() {
  return (
    <div>
    <Container>
    <GlobalStyle />
      <Navbar/>
      <Grafico />
     <Footer/>
    </Container>
    </div>
  );
}