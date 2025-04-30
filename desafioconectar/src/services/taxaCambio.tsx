import axios from 'axios';

export const buscarTaxaCambio = async (): Promise<number> => {
  try {
    const response = await axios.get('https://economia.awesomeapi.com.br/json/last/USD-BRL');
    const taxaCambio = parseFloat(response.data.USDBRL.bid); 
    console.log("Taxa de câmbio USD-BRL:", taxaCambio);
    return taxaCambio;
  } catch (error) {
    console.error('Erro ao buscar taxa de câmbio:', error);
    return 5.71; 
  }
};