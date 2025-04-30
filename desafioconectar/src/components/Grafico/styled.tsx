import styled from 'styled-components';

export const GraphWrapper = styled.section`
  width: 100%;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin: 2rem auto;
  max-width: 960px;

  h2 {
    font-size: 2rem;
    text-align: center;
    margin-bottom: 1.5rem;
    color: #333;
  }

  @media (max-width: 768px) {
    padding: 1rem;

    h2 {
      font-size: 1.5rem;
    }
  }
`;