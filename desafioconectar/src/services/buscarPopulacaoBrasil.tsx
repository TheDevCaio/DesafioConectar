import axios from 'axios';

const buscarPopulacaoBrasil = async (): Promise<number> => {
  try {

    const response = await axios.get(
      'https://api.worldbank.org/v2/country/BR/indicator/SP.POP.TOTL?format=json&date=2023'
    );

    const dados = response.data;


    const populacao = dados[1]?.[0]?.value;

    if (!populacao) {
      console.error('População não encontrada.');
      return 1; 
    }

    return Math.round(populacao); 
  } catch (error) {
    console.error('Erro ao buscar população do World Bank:', error);
    return 1;
  }
};

export default buscarPopulacaoBrasil;