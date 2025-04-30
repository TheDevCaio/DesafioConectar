import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { GraphWrapper, ChartContainer, CustomLegend, Title } from './styles';
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

      const dadosEmDolar = dadosPIB
        .map((dado) => {
            const pibEmDolar = dado.pibTotal / taxaCambio;  
            const pibPerCapitaEmDolar = pibEmDolar / populacao;  
          return {
            ...dado,
            pibTotal: pibEmDolar,
            pibPerCapita: pibPerCapitaEmDolar,
          } as DadosPIB;
        })
        .filter((dado): dado is DadosPIB => dado !== null);

      setDados(dadosEmDolar);
    };

    fetchData();
  }, []);

  const CustomYAxisLabel = ({ viewBox }: any) => {
    const { x, y, height } = viewBox;
    const isMobile = window.innerWidth <= 768;


    return (
      <text
        x={isMobile ? x - 50 : x - 190} 
        y={isMobile ? y + height / 2 + 10: y + height / 2 + 20} 
        textAnchor="middle"
        dominantBaseline="middle"
        transform={isMobile ? `rotate(-90, ${x + 20}, ${y + height / 2 + 40})` : `rotate(-90, ${x - 40}, ${y + height / 2})`}
        fill="#000"
      >
        Dólar
      </text>
    );
  };

  return (
    <GraphWrapper>
      <Title>Evolução do PIB e do PIB per capta brasileiro</Title>
      <ChartContainer>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={dados}
            margin={{ top: 20, right: 20, left: 40, bottom: 20 }}
          >
            <CartesianGrid />
            <XAxis
              dataKey="ano"
              label={{
                value: 'Ano',
                position: 'insideBottom',
                offset: -5,
              }}
            />
            <YAxis
              label={<CustomYAxisLabel />}
              tickFormatter={(value) =>
                `US$ ${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
              }
            />
            <Tooltip
              formatter={(value: number) =>
                `US$ ${value.toFixed(4).replace(',', '.')}`
              }
            />
            <Line
              type="monotone"
              dataKey="pibTotal"
              name="PIB Total"
              stroke="#8884d8"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="pibPerCapita"
              name="PIB per Capita"
              stroke="#82ca9d"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>

      <CustomLegend>
        <div>
          <span className="dot" style={{ backgroundColor: '#8884d8' }}></span>
          PIB Total
        </div>
        <div>
          <span className="dot" style={{ backgroundColor: '#82ca9d' }}></span>
          PIB per Capita
        </div>
      </CustomLegend>
    </GraphWrapper>
  );
};

export default Grafico;