export type DadosTela2 = {
    ano: number;
    pibTotal: number;
    pibPerCapita: number;
  };
  
  export type State = {
    dados: DadosTela2[];
    mostrarPIBTotal: boolean;
    mostrarPIBPerCapita: boolean;
    isMobile: boolean;
  };
  
  export type Action =
    | { type: 'SET_DADOS'; payload: DadosTela2[] }
    | { type: 'TOGGLE_PIB_TOTAL' }
    | { type: 'TOGGLE_PIB_PER_CAPITA' }
    | { type: 'SET_MOBILE'; payload: boolean };
  
  export const initialState: State = {
    dados: [],
    mostrarPIBTotal: false,
    mostrarPIBPerCapita: false,
    isMobile: false,
  };
  
  export function reducer(state: State, action: Action): State {
    switch (action.type) {
      case 'SET_DADOS':
        return { ...state, dados: action.payload };
      case 'TOGGLE_PIB_TOTAL':
        return { ...state, mostrarPIBTotal: !state.mostrarPIBTotal };
      case 'TOGGLE_PIB_PER_CAPITA':
        return { ...state, mostrarPIBPerCapita: !state.mostrarPIBPerCapita };
      case 'SET_MOBILE':
        return { ...state, isMobile: action.payload };
      default:
        return state;
    }
  }