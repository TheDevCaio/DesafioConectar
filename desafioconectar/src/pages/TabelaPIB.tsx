import React from 'react';

import Tabela from '../components/Tabela';
import { Footer } from '../components/Footer';
import { Navbar } from '../components/Navbar';
import GlobalStyle, { Container } from '../components/GlobalStyles';



const TabelaPIB = () => {

  return (
    <Container>
    <GlobalStyle />
    <Navbar/>
   <Tabela/>
   <Footer/>
   </Container>
  );
};

export default TabelaPIB;