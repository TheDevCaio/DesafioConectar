
import React, { useEffect, useReducer } from 'react';
import { buscarPopulacaoBrasil } from '../../services/buscarPopulacaoBrasil';
import { buscarDadosPIB } from '../../services/ibgeService';
import { TabelaContainer, TabelaEstilizada, Title } from './styles';
import { reducer, initialState } from '../../utils/reducerGlobal';

type DadosTela2 = {
  ano: number;
  pibTotal: number;
  pibPerCapita: number;
};

const TabelaPIB = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const formatarDolarMilhares = (valor: number) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(valor);

  useEffect(() => {
    const fetchData = async () => {
      const pibData = await buscarDadosPIB();
      const anos = [2007, 2008, 2009, 2010, 2011, 2012];
      const dadosCompletos = await Promise.all(
        pibData.map(async (item) => {
          if (anos.includes(item.ano)) {
            const populacao = await buscarPopulacaoBrasil(item.ano);
            const pibPerCapita = (item.pibTotal / populacao) * 100;

            return {
              ano: item.ano,
              pibTotal: item.pibTotal,
              pibPerCapita,
            };
          }
          return null;
        })
      );

      dispatch({ type: 'SET_DADOS', payload: dadosCompletos.filter((item) => item !== null) });
    };

    fetchData();
  }, []);

  return (
    <TabelaContainer>
      <Title>Tabela de PIB por Ano (2007-2012)</Title>
      <TabelaEstilizada>
        <thead>
          <tr>
            <th>Ano</th>
            <th>PIB Total (em dólares)</th>
            <th>PIB Per Capita (em dólares)</th>
          </tr>
        </thead>
        <tbody>
          {state.dados.map((item) => (
            <tr key={item.ano}>
              <td>{item.ano}</td>
              <td>{formatarDolarMilhares(item.pibTotal)}</td>
              <td>{formatarDolarMilhares(item.pibPerCapita)}</td>
            </tr>
          ))}
        </tbody>
      </TabelaEstilizada>
    </TabelaContainer>
  );
};

export default TabelaPIB;
