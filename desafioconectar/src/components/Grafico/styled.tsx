import styled from 'styled-components';

export const GraphWrapper = styled.div`
  width: 100%;
  height: 500px;
  padding: 1rem;

  h1 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    text-align: center;
  }

  @media (max-width: 746px) {
    height: 300px;

    h1 {
      font-size: 1.2rem;
    }
  }
`;