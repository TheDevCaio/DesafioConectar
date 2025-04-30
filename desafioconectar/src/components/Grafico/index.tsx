'use client';
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { GraphWrapper } from './styled';
import { buscarDadosPIB } from '../../services/ibgeservice';

export interface DadosPIB {
    ano: number;
    pibTotal: number;
    pibPerCapita: number;
  }
  
const Grafico: React.FC = () => {
  const [dados, setDados] = useState<DadosPIB[]>([]);

  useEffect(() => {
    buscarDadosPIB().then(setDados);
  }, []);

  return (
    <GraphWrapper>
      <h1>Evolução do PIB</h1>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={dados}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="ano" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pibTotal" name="PIB Total (US$)" stroke="#8884d8" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="pibPerCapita" name="PIB per Capita (US$)" stroke="#82ca9d" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </GraphWrapper>
  );
};

export default Grafico;