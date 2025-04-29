import React, { useEffect, useState } from 'react';
import { buscarDadosPIB } from '../services/ibgeservice';

type DadosPIB = {
  ano: string;
  pibTotal: number;
  pibPerCapita: number;
};

export default function TabelaPIB() {
  const [dados, setDados] = useState<DadosPIB[]>([]);

  function formatarMoeda(valor: number) {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'USD',
    });
  }
  
  useEffect(() => {
    async function carregarDados() {
      try {
        const resultado = await buscarDadosPIB() as any;

        const dadosFormatados: DadosPIB[] = Object.entries(
          resultado[0].resultados[0].series['all'].serie as Record<string, string>
        ).map(([ano, valor]) => ({
          ano,
          pibTotal: parseFloat(valor),
          pibPerCapita: parseFloat(
            (resultado[0].resultados[1].series['all'].serie as Record<string, string>)[ano] ?? '0'
          ),
        }));


        dadosFormatados.sort((a, b) => parseInt(a.ano) - parseInt(b.ano));

        setDados(dadosFormatados);
      } catch (error) {
        console.error("Erro ao carregar os dados:", error);
      }
    }

    carregarDados();
  }, []);

  return (
  <></>
  );
}