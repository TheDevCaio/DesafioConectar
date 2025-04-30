import styled from "styled-components";

export const NavbarStyle = styled.nav`
  width: 100%;
  height: 10vh;
  background: #4CAF50;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  box-sizing: border-box;
  position: relative;

  @media(max-width: 746px){
  height: 8vh;
  }
`;

export const Title = styled.h1`
  font-size: 1.9rem;
  font-weight: bold;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`;

export const HamburgerIcon = styled.img`
  display: none;
  width: 28px;
  height: 28px;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

export const ButtonContainer = styled.div<{ isOpen: boolean }>`
  display: flex;
  flex-direction: row;
  gap: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    width: auto;
    display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
    background-color: #4CAF50;
    padding: 10px 0;
    position: absolute;
    top: 8vh; 
    right: 0; 
    z-index: 999;
    border-radius: 5px;
  }
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

  @media (max-width: 480px) {
    padding: 6px 12px;
    font-size: 0.9rem;
    min-width: 100%;
  }
`;
