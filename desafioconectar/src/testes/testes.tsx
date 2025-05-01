import { render, screen, waitFor } from '@testing-library/react';

import * as BuscarPopulacaoBrasil from '../services/buscarPopulacaoBrasil';
import * as BuscarDadosPIB from '../services/ibgeservice';
import TabelaPIB from '../pages/TabelaPIB';


jest.mock('../../services/buscarPopulacaoBrasil');
jest.mock('../../services/ibgeservice');

describe('TabelaPIB', () => {
  beforeEach(() => {

    jest.resetAllMocks();
  });

  test('deve renderizar a tabela corretamente', async () => {

    const pibMock = [
      { ano: 2007, pibTotal: 5000000 },
      { ano: 2008, pibTotal: 5500000 },
    ];
    const populacaoMock = 1000000;


    (BuscarDadosPIB.buscarDadosPIB as jest.Mock).mockResolvedValue(pibMock);
    (BuscarPopulacaoBrasil.buscarPopulacaoBrasil as jest.Mock).mockResolvedValue(populacaoMock);

    render(<TabelaPIB />);


    await waitFor(() => screen.getByText('Tabela de PIB por Ano (2007-2012)'));

 
    expect(screen.getByText('2007')).toBeInTheDocument();
    expect(screen.getByText('2008')).toBeInTheDocument();
    expect(screen.getByText('$5,000,000.00')).toBeInTheDocument(); 
    expect(screen.getByText('$5.00')).toBeInTheDocument(); 
  });

  test('deve formatar os valores corretamente em dólares', async () => {

    const pibMock = [
      { ano: 2007, pibTotal: 5000000 },
    ];
    const populacaoMock = 1000000;


    (BuscarDadosPIB.buscarDadosPIB as jest.Mock).mockResolvedValue(pibMock);
    (BuscarPopulacaoBrasil.buscarPopulacaoBrasil as jest.Mock).mockResolvedValue(populacaoMock);

    render(<TabelaPIB />);

   await waitFor(() => screen.getByText('2007'));


    const pibtotal = screen.getByText('$5,000,000.00');
    const pibPerCapita = screen.getByText('$5.00');

    expect(pibtotal).toBeInTheDocument();
    expect(pibPerCapita).toBeInTheDocument();
  });

  test('não deve renderizar dados fora do intervalo de anos', async () => {
    // Mock de resposta das APIs
    const pibMock = [
      { ano: 2006, pibTotal: 5000000 }, 
    ];
    const populacaoMock = 1000000;


    (BuscarDadosPIB.buscarDadosPIB as jest.Mock).mockResolvedValue(pibMock);
    (BuscarPopulacaoBrasil.buscarPopulacaoBrasil as jest.Mock).mockResolvedValue(populacaoMock);

    render(<TabelaPIB />);


    await waitFor(() => screen.getByText('Tabela de PIB por Ano (2007-2012)'));


    expect(screen.queryByText('2006')).toBeNull();
  });

  test('deve chamar as funções de API corretamente', async () => {
    const pibMock = [
      { ano: 2007, pibTotal: 5000000 },
    ];
    const populacaoMock = 1000000;

    (BuscarDadosPIB.buscarDadosPIB as jest.Mock).mockResolvedValue(pibMock);
    (BuscarPopulacaoBrasil.buscarPopulacaoBrasil as jest.Mock).mockResolvedValue(populacaoMock);

    render(<TabelaPIB />);

    await waitFor(() => expect(BuscarDadosPIB.buscarDadosPIB).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(BuscarPopulacaoBrasil.buscarPopulacaoBrasil).toHaveBeenCalledTimes(1));
  });
});