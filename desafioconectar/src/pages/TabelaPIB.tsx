import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import axios from 'axios';

type DadosPIB = {
  ano: string;
  quantidadeProduzida: number;
  quantidadeVendida: number;
};

export default function TabelaPIB() {
  const [dados, setDados] = useState<DadosPIB[]>([]);
  const [pagina, setPagina] = useState(0);
  const itensPorPagina = 10;

  function formatarNumero(valor: number) {
    return valor.toLocaleString('pt-BR');
  }

  async function buscarDadosIBGE() {
    const agregado = 1712;
    const variaveis = '214|1982';
    const localidades = 'BR';

    const url = `https://servicodados.ibge.gov.br/api/v3/agregados/${agregado}/variaveis/${variaveis}?localidades=${localidades}`;
    const response = await axios.get(url);
    return response.data;
  }

  useEffect(() => {
    async function carregarDados() {
      const resultado = await buscarDadosIBGE();

      const serieProduzida = resultado[0].resultados[0].series['all'].serie as Record<string, string>;
      const serieVendida = resultado[0].resultados[1].series['all'].serie as Record<string, string>;

      const dadosFormatados: DadosPIB[] = Object.entries(serieProduzida).map(([ano, valor]) => ({
        ano,
        quantidadeProduzida: parseFloat(valor),
        quantidadeVendida: parseFloat(serieVendida[ano] ?? '0'),
      }));

      setDados(dadosFormatados);
    }

    carregarDados();
  }, []);

  const dadosPagina = dados.slice(pagina * itensPorPagina, (pagina + 1) * itensPorPagina);

  const handlePageClick = (event: { selected: number }) => {
    setPagina(event.selected);
  };

  return (
    <div>
      <h1>Tabela de Produção e Venda</h1>
      <table>
        <thead>
          <tr>
            <th>Ano</th>
            <th>Quantidade Produzida</th>
            <th>Quantidade Vendida</th>
          </tr>
        </thead>
        <tbody>
          {dadosPagina.map((item) => (
            <tr key={item.ano}>
              <td>{item.ano}</td>
              <td>{formatarNumero(item.quantidadeProduzida)}</td>
              <td>{formatarNumero(item.quantidadeVendida)}</td>
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
