// Grafico.tsx
import React, { useEffect, useReducer, useState } from 'react';
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
import { DadosPIB, buscarDadosPIB } from '../../services/ibgeService';
import { buscarPopulacaoBrasil } from '../../services/buscarPopulacaoBrasil';
import { reducer, initialState } from '../../utils/reducerGlobal';

const Grafico: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
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
      const dadosCompletos = await Promise.all(
        dadosPIB.map(async (dado) => {
          const taxaCambio = await buscarTaxaCambio(dado.ano);
          const populacao = await buscarPopulacaoBrasil(dado.ano);

          if (!populacao) {
            console.error('População inválida. Não foi possível calcular o PIB per capita.');
            return null;
          }

          const pibEmDolar = dado.pibTotal / taxaCambio;
          const pibPerCapitaEmDolar = pibEmDolar / populacao;

          return {
            ...dado,
            pibTotal: pibEmDolar,
            pibPerCapita: pibPerCapitaEmDolar,
          };
        })
      );

      dispatch({ type: 'SET_DADOS', payload: dadosCompletos.filter((dado) => dado !== null) });
    };

    fetchData();
  }, []);

  const formatarDolar = (valor: number) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(valor);

  const formatarDolarMilhares = (valor: number) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(valor * 1000);

  const CustomYAxisLabelRight = ({ viewBox }: { viewBox: any }) => {
    const { x, y, height } = viewBox;
    const centroY = y + height / 2;

    return (
      <text
        x={x + 70}
        y={isMobile ? centroY - 40 : centroY - 90}
        textAnchor="middle"
        dominantBaseline="middle"
        transform={`rotate(90, ${x + 40}, ${isMobile ? centroY : centroY - 26})`}
        fill="#000"
        fontSize={isMobile ? 10 : 12}
      >
        Esq: PIB Brasileiro | Dir: PIB per Capita Brasileiro
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
            checked={state.mostrarPIBTotal}
            onChange={() => dispatch({ type: 'TOGGLE_PIB_TOTAL' })}
          />
          <span>PIB Total</span>
        </CheckboxLabel>
        <CheckboxLabel color="#ff7300">
          <input
            type="checkbox"
            checked={state.mostrarPIBPerCapita}
            onChange={() => dispatch({ type: 'TOGGLE_PIB_PER_CAPITA' })}
          />
          <span>PIB per Capita</span>
        </CheckboxLabel>
      </CheckboxGroup>

      <ChartContainer>
        <ResponsiveContainer width="100%" height={isMobile ? 300 : 400}>
          <LineChart data={state.dados} margin={{ top: 50, right: 40, left: 60, bottom: 40 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="ano"
              label={{
                value: 'Ano',
                position: 'insideBottom',
                offset: -5,
                style: { fill: '#333' },
              }}
              tick={{ style: { fontSize: isMobile ? 10 : 14, fill: '#333' } }}
            />
            <YAxis
              yAxisId="left"
              orientation="left"
              width={isMobile ? 70 : 80}
              tickFormatter={formatarDolar}
              tick={{
                style: { fontSize: isMobile ? 10 : 14, fill: '#333' },
              }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              width={isMobile ? 70 : 80}
              label={<CustomYAxisLabelRight viewBox={{ x: 0, y: 0, height: 200 }} />}
              tickFormatter={formatarDolarMilhares}
              tick={{
                style: { fontSize: isMobile ? 10 : 14, fill: '#333' },
              }}
            />
            <Tooltip
              formatter={(value: number, name: string) => {
                const formatado =
                  name === 'PIB per Capita' ? formatarDolarMilhares(value) : formatarDolar(value);
                return [formatado, name];
              }}
              labelFormatter={(label: number) => `Ano: ${label}`}
            />
            {state.mostrarPIBTotal && (
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
            {state.mostrarPIBPerCapita && (
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="pibPerCapita"
                name="PIB per Capita"
                stroke="#ff7300"
                strokeWidth={3}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>

      <CustomLegend>
        {state.mostrarPIBTotal && (
          <div>
            <span className="dot" style={{ backgroundColor: '#8884d8' }}></span>
            PIB Total
          </div>
        )}
        {state.mostrarPIBPerCapita && (
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
