import styled from 'styled-components';

export const Title = styled.h1`
  font-size: 2.2rem;
  font-weight: 700;
  color: #388e3c;
  margin-bottom: 25px;
  text-align: center;
  margin-top: -3vh;
  
  @media (max-width: 746px) {
    margin-top: 3vh;
    font-size: 1.6rem;
  }
`;

export const TabelaContainer = styled.div`
  width: 100%;
  max-width: 100%;
  margin: 40px auto;
  padding: 50px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.08);
  
  @media (max-width: 746px) {
    margin: 0;
    padding: 20px;
    width: 100%;
  }
`;

export const TabelaEstilizada = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  font-size: 16px;

  th,
  td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: center;
    font-size: inherit;
  }

  th {
    background-color: #f3f3f3;
    color: #333;
    font-weight: bold;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  tr:hover {
    background-color: #f1f1f1;
  }

  @media (max-width: 746px) {
    font-size: 14px;
    
    th, td {
      padding: 10px;
    }
  }
`;

export const TabelaWrapper = styled.div`
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
`;
