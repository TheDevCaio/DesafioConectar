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
import { buscarDadosPIB, DadosPIB } from '../../services/ibgeservice';
import { buscarTaxaCambio } from '../../services/taxaCambio';


const Grafico: React.FC = () => {
  const [dados, setDados] = useState<DadosPIB[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const dadosPIB = await buscarDadosPIB();
      const taxaCambio = await buscarTaxaCambio();

      const dadosEmDolar = dadosPIB.map(dado => ({
        ...dado,
        pibTotal: dado.pibTotal / taxaCambio, 
      }));

      setDados(dadosEmDolar);
    };

    fetchData();
  }, []);

  return (
    <GraphWrapper>
      <h1>Evolução do PIB (em Dólar)</h1>
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
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </GraphWrapper>
  );
};

export default Grafico;