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
import {
  GraphWrapper,
  ChartContainer,
  CustomLegend,
  Title,
  CheckboxGroup,
  CheckboxLabel,
} from './styles';
import { buscarTaxaCambio } from '../../services/taxaCambio';
import buscarPopulacaoBrasil from '../../services/buscarPopulacaoBrasil';
import { DadosPIB, buscarDadosPIB } from '../../services/ibgeservice';

const Grafico: React.FC = () => {
  const [dados, setDados] = useState<DadosPIB[]>([]);
  const [mostrarPIBTotal, setMostrarPIBTotal] = useState(false);
  const [mostrarPIBPerCapita, setMostrarPIBPerCapita] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
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

  const formatarDolar = (valor: number) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(valor);

  const CustomYAxisLabelLeft = ({ viewBox }: any) => {
    const { x, y, height } = viewBox;
    return (
      <text
        x={x - 40}
        y={y + height / 2 - 42}
        textAnchor="middle"
        dominantBaseline="middle"
        transform={`rotate(-90, ${x - 40}, ${y + height / 2})`}
        fill="#000"
      >
        PIB Total (US$)
      </text>
    );
  };

  

  

  const CustomYAxisLabelRight = ({ viewBox }: any) => {
    const { x, y, height } = viewBox;
    return (
      <text
        x={x + 40}
        y={y + height / 2 - 66}
        textAnchor="middle"
        dominantBaseline="middle"
        transform={`rotate(90, ${x + 40}, ${y + height / 2 -26})`}
        fill="#000"
      >
        PIB per Capita (US$)
      </text>
    );
  };

  return (
    <GraphWrapper>
      <Title>Evolução do PIB e do PIB per capita brasileiro</Title>

      <CheckboxGroup>
        <CheckboxLabel color="#8884d8">
          <input
            type="checkbox"
            checked={mostrarPIBTotal}
            onChange={() => setMostrarPIBTotal(!mostrarPIBTotal)}
          />
          <span>PIB Total</span>
        </CheckboxLabel>
        <CheckboxLabel color="#ff7300">
          <input
            type="checkbox"
            checked={mostrarPIBPerCapita}
            onChange={() => setMostrarPIBPerCapita(!mostrarPIBPerCapita)}
          />
          <span>PIB per Capita</span>
        </CheckboxLabel>
      </CheckboxGroup>

      <ChartContainer>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={dados}
            margin={{ top: 20, right:30, left: 89, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="ano"
              label={{
                value: 'Ano',
                position: 'insideBottom',
                offset: -5,
              }}
            />
          <YAxis
            yAxisId="left"
            label={<CustomYAxisLabelLeft />}
            tickFormatter={formatarDolar}
            tick={{ fontSize: window.innerWidth <= 768 ? 10 : 14 }} // aqui está o segredo
          />
            <YAxis
              yAxisId="right"
              orientation="right"
              label={<CustomYAxisLabelRight />}
              tickFormatter={formatarDolar}
            />
            <Tooltip
              formatter={(value: number, name: string) => [formatarDolar(value), name]}
              labelFormatter={(label: number) => `Ano: ${label}`}
            />
            {mostrarPIBTotal && (
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="pibTotal"
                name="PIB Total"
                stroke="#8884d8"
                strokeWidth={2}
                dot={false}
              />
            )}
            {mostrarPIBPerCapita && (
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="pibPerCapita"
                name="PIB per Capita"
                stroke="#ff7300"
                strokeWidth={3}
                dot
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>

      <CustomLegend>
        {mostrarPIBTotal && (
          <div>
            <span className="dot" style={{ backgroundColor: '#8884d8' }}></span>
            PIB Total
          </div>
        )}
        {mostrarPIBPerCapita && (
          <div>
            <span className="dot" style={{ backgroundColor: '#ff7300' }}></span>
            PIB per Capita
          </div>
        )}
      </CustomLegend>
    </GraphWrapper>
  );
};

export default Grafico;