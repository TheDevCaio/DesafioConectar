import { useEffect, useState } from 'react';
import { buscarDadosPIB } from '../services/ibgeService';

const EvolucaoPIB = () => {
  const [dadosPIB, setDadosPIB] = useState<any>(null);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const dados = await buscarDadosPIB();
        setDadosPIB(dados);
      } catch (error) {
        console.error('Erro ao carregar dados do PIB:', error);
      }
    };

    carregarDados();
  }, []);

  return (
    <div>
      <h1>Evolução do PIB</h1>
      {/* Aqui depois vamos colocar o gráfico usando o Recharts */}
      {dadosPIB ? <pre>{JSON.stringify(dadosPIB, null, 2)}</pre> : <p>Carregando...</p>}
    </div>
  );
};

export default EvolucaoPIB;