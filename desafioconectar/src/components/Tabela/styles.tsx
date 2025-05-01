import styled from 'styled-components';

export const TabelaContainer = styled.div`
  width: 100%;
  max-width: 100%;
  margin: 40px auto;
  padding: 20px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.08);

  @media(max-width: 746px) {
    margin: 0px;
    padding: 0px;
    width: 100%;
  }
`;

export const TabelaEstilizada = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th,
  td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: center;
    font-size: 16px;
  }

  th {
    background-color: #f3f3f3;
    color: #333;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  @media(max-width: 746px) {
    font-size: 12px;
    th, td {
      padding: 8px;
    
    }
  }
`;

export const TabelaWrapper = styled.div`
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
`;
