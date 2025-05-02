// src/__tests__/TabelaPIB.test.tsx
import { render, screen } from '@testing-library/react'
import TabelaPIB from '../components/TabelaPIB/TabelaPIB'

test('renderiza o título da tabela', () => {
  render(<TabelaPIB />)
  expect(screen.getByText(/Tabela de PIB/i)).toBeInTheDocument()
})
