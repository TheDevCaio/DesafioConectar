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
  width: 100vw;
  max-width: 1400px;
  margin: 5vh auto 0 auto;


  @media(max-width: 746px){
  margin-top: 10vh;
  }
  h1 {
    font-size: 2.2rem;
    font-weight: 700;
    color: #388E3C;
    margin-bottom: 25px;
    text-align: center;

    @media (max-width: 768px) {
      font-size: 1.6rem;
    }
  }

  @media(max-width: 768px) {
    padding: 15px;
    width: 90%;
  }
`;

export const ChartContainer = styled.div`
  width: 100%;
  height: 450px;
  border-radius: 12px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  font-family: 'Inter', sans-serif; 
  font-size: 0.9rem;
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
    font-size: 0.85rem;
  }

  .recharts-yAxis text,
  .recharts-xAxis text,
  .recharts-label {
    font-family: inherit;
    font-size: 0.85rem;
    fill: #212121;
  }

  @media (max-width: 768px) {
    height: 50vh;
    min-width: 110vw;
  }
`;

export const CustomLegend = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 15px;

  div {
    display: flex;
    align-items: center;
    font-weight: 600;
    color: #388E3C;
    font-size: 0.9rem;
  }

  .dot {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    margin-right: 8px;
  }

  @media (max-width: 480px) {
    gap: 12px;

    div {
      font-size: 0.8rem;
    }
  }
`;

export const Title = styled.h1`
  font-size: 6px;
`;

export const CheckboxGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

export const CheckboxLabel = styled.label<{ color: string }>`
  display: flex;
  align-items: center;
  font-weight: 600;
  color: ${({ color }) => color || '#444'};
  font-size: 0.95rem;
  gap: 0.5rem;
  cursor: pointer;

  input[type='checkbox'] {
    accent-color: ${({ color }) => color || '#444'};
    width: 18px;
    height: 18px;
    cursor: pointer;
  }

  span {
    user-select: none;
  }
`;