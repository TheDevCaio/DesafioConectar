import axios from "axios";

const api = axios.create({
  baseURL: "https://servicodados.ibge.gov.br/api/v3/agregados",
});

export async function buscarDadosPIB() {
    try {
      const [pibTotal, pibPerCapita] = await Promise.all([
        api.get("/5938/periodos/all/variaveis/37?localidades=N1[all]"), 
        api.get("/5938/periodos/all/variaveis/5938?localidades=N1[all]")
      ]);
  
      return [
        pibTotal.data,
        pibPerCapita.data
      ];
    } catch (error) {
      console.error("Erro ao buscar dados do IBGE:", error);
      throw error;
    }

}