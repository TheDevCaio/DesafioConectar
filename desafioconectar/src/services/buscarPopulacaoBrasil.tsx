import axios from 'axios';

export const buscarPopulacaoBrasil = async (ano: number): Promise<number> => {
  try {
    const response = await axios.get(
      `https://api.worldbank.org/v2/country/BR/indicator/SP.POP.TOTL?format=json&date=${ano}`
    );

    const dados = response.data;

    const populacao = dados[1]?.[0]?.value;

    if (!populacao) {
      console.error(`População para o ano ${ano} não encontrada.`);
      return 1;
    }

    return Math.round(populacao);
  } catch (error) {
    console.error(`Erro ao buscar população do ano ${ano}:`, error);
    return 1;
  }
};
