'use client';
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { buscarDadosPIB } from '../../services/ibgeservice';
import { GraphWrapper } from './styled';

type DadosPIB = {
  ano: string;
  pibTotal: number;
  pibPerCapita: number;
};

export default function Grafico() {
  const [dados, setDados] = useState<DadosPIB[]>([]);

  useEffect(() => {
    async function carregarDados() {
      const resultado = await buscarDadosPIB() as any;

      const dadosFormatados: DadosPIB[] = Object.entries(
        resultado[0].resultados[0].series['all'].serie as Record<string, string>
      ).map(([ano, valor]) => ({
        ano,
        pibTotal: parseFloat(valor),
        pibPerCapita: parseFloat(
          (resultado[0].resultados[1].series['all'].serie as Record<string, string>)[ano] ?? '0'
        ),
      }));

      setDados(dadosFormatados);
    }

    carregarDados();
  }, []);

  return (
    <GraphWrapper>
      <h1>Evolução do PIB Brasileiro</h1>
      <ResponsiveContainer>
        <LineChart data={dados}>
          <XAxis dataKey="ano" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pibTotal" name="PIB Total (USD)" stroke="#8884d8" />
          <Line type="monotone" dataKey="pibPerCapita" name="PIB per Capita (USD)" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </GraphWrapper>
  );
}