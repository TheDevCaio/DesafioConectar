import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TabelaPIB from '../pages/TabelaPIB';

describe('TabelaPIB', () => {
  it('renderiza o título "Tabela de PIB"', () => {
    render(<TabelaPIB />);
    expect(screen.getByText(/Tabela de PIB/i)).toBeInTheDocument();
  });
});