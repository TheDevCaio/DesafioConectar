import axios from "axios";

const api = axios.create({
  baseURL: "https://servicodados.ibge.gov.br/api/v3/agregados",
});

export type DadosPIBAno = {
  ano: string;
  pibTotal: number;
  pibPerCapita: number;
};

export async function buscarDadosPIB(): Promise<DadosPIBAno[]> {
  const anos = [
    "2010","2011","2012","2013","2014","2015",
    "2016","2017","2018","2019","2020","2021",
  ];

  try {
    const dadosPorAno = await Promise.all(
      anos.map(async (ano) => {
        const [resTotal, resPerCapita] = await Promise.all([
          api.get(`/5938/periodos/${ano}/variaveis/37?localidades=N1[all]`),
          api.get(`/5938/periodos/${ano}/variaveis/5939?localidades=N1[all]`),
        ]);

        const totalRaw = resTotal.data[0].resultados[0].series["all"].serie[ano];
        const perCapitaRaw = resPerCapita.data[0].resultados[0].series["all"].serie[ano];

        return {
          ano,
          pibTotal: parseFloat(totalRaw ?? "0"),
          pibPerCapita: parseFloat(perCapitaRaw ?? "0"),
        };
      })
    );

    return dadosPorAno;
  } catch (error) {
    console.error("Erro ao buscar dados do IBGE:", error);
    throw error;
  }
}