import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import { buscarPopulacaoBrasil } from '../services/buscarPopulacaoBrasil'; 

vi.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('buscarPopulacaoBrasil', () => {
  it('retorna a população arredondada quando a resposta é válida', async () => {
    const ano = 2020;
    const populacaoMock = 211049527;

    mockedAxios.get.mockResolvedValueOnce({
      data: [null, [{ value: populacaoMock }]],
    });

    const resultado = await buscarPopulacaoBrasil(ano);
    expect(resultado).toBe(populacaoMock);
  });

  it('retorna 1 se a população não for encontrada', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: [null, [{}]],
    });

    const resultado = await buscarPopulacaoBrasil(2021);
    expect(resultado).toBe(1);
  });

  it('retorna 1 se a API falhar', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Erro na API'));

    const resultado = await buscarPopulacaoBrasil(2022);
    expect(resultado).toBe(1);
  });
});