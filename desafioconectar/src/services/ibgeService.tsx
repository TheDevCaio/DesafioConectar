import axios from 'axios';

export interface DadosPIB {
  ano: number;
  pibTotal: number;
}

export const buscarDadosPIB = async (): Promise<DadosPIB[]> => {
  try {
    const response = await axios.get(
      'https://servicodados.ibge.gov.br/api/v3/agregados/21/periodos/2007|2008|2009|2010|2011|2012/variaveis/37?localidades=N1[all]'
    );

    const dados = response.data;
    const serie = dados?.[0]?.resultados?.[0]?.series?.[0]?.serie;

    if (!serie) {
      console.error('Série de dados não encontrada.');
      return [];
    }

    const resultado: DadosPIB[] = Object.entries(serie).map(([ano, valor]) => ({
      ano: parseInt(ano),
      pibTotal: parseFloat(valor as string)
    }));

    return resultado;
  } catch (error) {
    console.error('Erro ao buscar dados do IBGE:', error);
    return [];
  }
};