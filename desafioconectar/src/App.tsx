'use client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EvolucaoPIB from './EvolucaoPIB';
import TabelaPIB from './TabelaPIB';
import React from 'react';

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