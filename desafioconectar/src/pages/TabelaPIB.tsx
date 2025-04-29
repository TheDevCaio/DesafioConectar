import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { buscarDadosPIB } from '../services/ibgeservice';

type DadosPIB = {
  ano: string;
  pibTotal: number;
  pibPerCapita: number;
};

export default function TabelaPIB() {
  const [dados, setDados] = useState<DadosPIB[]>([]);
  const [pagina, setPagina] = useState(0);
  const itensPorPagina = 10;

  function formatarMoeda(valor: number) {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'USD',
    });
  }
  
  useEffect(() => {
    async function carregarDados() {
      const resultado = await buscarDadosPIB();
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

  const dadosPagina = dados.slice(pagina * itensPorPagina, (pagina + 1) * itensPorPagina);

  const handlePageClick = (event: any) => {
    const selectedPage = event.selected;
    setPagina(selectedPage);
  };

  return (
    <div>
      <h1>Tabela de PIB por Ano</h1>
      <table>
        <thead>
          <tr>
            <th>Ano</th>
            <th>PIB Total (USD)</th>
            <th>PIB per Capita (USD)</th>
          </tr>
        </thead>
        <tbody>
          {dadosPagina.map((item) => (
            <tr key={item.ano}>
              <td>{item.ano}</td>
              <td>{formatarMoeda(item.pibTotal)}</td>
              <td>{formatarMoeda(item.pibPerCapita)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <ReactPaginate
        previousLabel={'← Anterior'}
        nextLabel={'Próximo →'}
        pageCount={Math.ceil(dados.length / itensPorPagina)}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    </div>
  );
}