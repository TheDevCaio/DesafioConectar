'use client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import React from 'react';
import EvolucaoPIB from './pages/EvolucaoPIB';
import TabelaPIB from './pages/TabelaPIB';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EvolucaoPIB />} />
        <Route path="/tabela" element={<TabelaPIB />} />
      </Routes>
    </BrowserRouter>
  );
}