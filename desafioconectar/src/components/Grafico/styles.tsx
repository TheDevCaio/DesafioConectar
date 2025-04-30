import styled from 'styled-components';


export const GraphWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #F1F1F1;
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  padding: 25px;
  margin: 30px;
  width: 100%;
  margin-top: 10vh;
  margin-left: 3.6vw;
  max-width: 1400px;

  h1 {
    font-size: 2.2rem;
    font-weight: 700;
    color: #388E3C;
    margin-bottom: 25px;
    text-align: center;
  }

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 20px;
  }
`;

export const ChartContainer = styled.div`
  width: 100%;
  height: 450px;
  border-radius: 12px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);

  font-family: 'Inter', sans-serif; /* ou a fonte padrão do seu projeto */
  font-size: 0.9rem; /* ajuste conforme necessário */
  color: #212121;

  .recharts-cartesian-grid line {
    stroke: #e1e1e1;
    stroke-dasharray: 3 3;
  }

  .recharts-tooltip-wrapper {
    background-color: rgba(0, 0, 0, 0.75);
    color: #fff;
    border-radius: 5px;
    padding: 5px;
    font-family: inherit;
    font-size: 0.9rem;
  }

  .recharts-yAxis text,
  .recharts-xAxis text,
  .recharts-label {
    font-family: inherit;
    font-size: 0.9rem;
    fill: #212121;
  }

  @media (max-width: 768px) {
    height: 350px;
  }
`;

export const CustomLegend = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: 15px;

  div {
    display: flex;
    align-items: center;
    font-weight: 600;
    color: #388E3C;
    font-size: 0.95rem;
  }

  .dot {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    margin-right: 8px;
  }
`;