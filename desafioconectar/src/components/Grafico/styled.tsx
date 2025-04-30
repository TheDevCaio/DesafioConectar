import styled from 'styled-components';

export const GraphWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f4f7fb;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 30px;
  width: 100%;
  max-width: 800px;
  
  h1 {
    font-size: 2rem;
    font-weight: 600;
    color:rgb(63, 153, 90);
    margin-bottom: 20px;
    text-align: center;
  }

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 15px;
  }
`;

export const ChartContainer = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 10px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

  .recharts-cartesian-grid line {
    stroke: #e1e1e1;
    stroke-dasharray: 3 3;
  }

  .recharts-tooltip-wrapper {
    background-color: rgba(0, 0, 0, 0.75);
    color: #fff;
    border-radius: 5px;
    padding: 10px;
  }

  .recharts-legend-item {
    display: flex;
    align-items: center;
    margin: 0 15px;
    font-size: 0.875rem;
    font-weight: 500;
    color: #3f5b99;
  }

  .recharts-legend-item-symbol {
    margin-right: 8px;
  }


  .recharts-yAxis text {
    font-size: 0.875rem;
    fill: #555;  
  }

  @media (max-width: 768px) {
    height: 300px;
  }
`;