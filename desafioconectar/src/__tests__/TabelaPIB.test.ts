import { render, screen } from '@testing-library/react';
import TabelaPIB from '../pages/TabelaPIB';
import EvolucaoPIB from '../pages/EvolucaoPIB';

test('monta a tela TabelaPIB e verifica título', () => {
  render(<TabelaPIB />);
  expect(screen.getByText(/Tabela de PIB/i)).toBeInTheDocument();
});