import axios from 'axios';

export interface DadosPIB {
  ano: number;
  pibTotal: number;
  pibPerCapita: number;
}

export const buscarDadosPIB = async (): Promise<DadosPIB[]> => {
  try {
    const agregado = 1712;
    const variaveis = '214|1982';
    const localidades = 'BR';

    const response = await axios.get(
      `https://servicodados.ibge.gov.br/api/v3/agregados/${agregado}/variaveis/${variaveis}?localidades=${localidades}`
    );

    const resultados = response.data[0].resultados;
    const series = resultados.map((item: any) => item.series[0].serie);

    const anos = Object.keys(series[0]);

    return anos.map((ano) => ({
      ano: Number(ano),
      pibTotal: Number(series[0][ano]),
      pibPerCapita: Number(series[1][ano]),
    }));
  } catch (error) {
    console.error('Erro ao buscar dados do IBGE:', error);
    return [];
  }
};