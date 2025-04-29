import axios from "axios";

const api = axios.create({
  baseURL: "https://servicodados.ibge.gov.br/api/v3/agregados",
});

export async function buscarDadosPIB() {

}