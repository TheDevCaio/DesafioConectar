import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { GraphWrapper, ChartContainer } from './styled';

import { buscarTaxaCambio } from '../../services/taxaCambio';
import buscarPopulacaoBrasil from '../../services/buscarPopulacaoBrasil';
import { DadosPIB, buscarDadosPIB } from '../../services/ibgeservice';

const Grafico: React.FC = () => {
  const [dados, setDados] = useState<DadosPIB[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const dadosPIB = await buscarDadosPIB();
      const taxaCambio = await buscarTaxaCambio();
      const populacao = await buscarPopulacaoBrasil();

      if (populacao === 0) {
        console.error('População inválida. Não foi possível calcular o PIB per capita.');
        return; 
      }

      const dadosEmDolar = dadosPIB.map(dado => {
        const pibEmDolar = dado.pibTotal / taxaCambio;


        const pibPerCapitaEmDolar = pibEmDolar / populacao;

        return {
          ...dado,
          pibTotal: pibEmDolar, 
          pibPerCapita: pibPerCapitaEmDolar, 
        };
      });

      setDados(dadosEmDolar);
    };

    fetchData();
  }, []);

  return (
    <GraphWrapper>
      <h1>Evolução do PIB (em Dólar) e PIB per Capita (em Dólar)</h1>
      <ChartContainer>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={dados} margin={{ top: 20, right: 20, left: 40, bottom: 20 }}>
            <CartesianGrid />
            <XAxis dataKey="ano" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="pibTotal"
              name="PIB Total (Mil Dólares)"
              stroke="#8884d8"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="pibPerCapita"
              name="PIB per Capita (Dólares)"
              stroke="#82ca9d"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </GraphWrapper>
  );
};

export default Grafico;