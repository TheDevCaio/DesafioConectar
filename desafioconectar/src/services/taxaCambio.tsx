import axios from 'axios';

export const buscarTaxaCambio = async (): Promise<number> => {
  try {
    const response = await axios.get('https://api.exchangerate-api.com/v4/latest/BRL'); 
    const taxaCambio = response.data.rates.USD;  
    return taxaCambio;
  } catch (error) {
    console.error('Erro ao buscar taxa de câmbio:', error);
    return 1; 
  }
};