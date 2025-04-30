import styled from "styled-components";


export const NavbarStyle = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  height: 60px;
  background: #4CAF50;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between; 
  padding: 0 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  box-sizing: border-box; 
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export const Button = styled.button`
  background-color: #fff;
  color: #4CAF50;
  border: none;
  padding: 8px 16px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #4CAF50;
    color: #fff;
  }

  &:active {
    background-color: #45a049;
  }
`;