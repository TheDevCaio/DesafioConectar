import axios from 'axios';

const API_URL = 'https://api.exchangerate-api.com/v4/latest/USD'; 
export const buscarTaxaCambio = async (ano: number): Promise<number> => {
  try {
    const response = await axios.get(`${API_URL}?year=${ano}`);
    console.log(response);
    if (response.data && response.data.rates) {
      return response.data.rates.BRL || 0;
    }
    
    throw new Error('Taxa de câmbio não encontrada');
  } catch (error) {
    console.error('Erro ao buscar a taxa de câmbio:', error);
    return 0; 
  }
};