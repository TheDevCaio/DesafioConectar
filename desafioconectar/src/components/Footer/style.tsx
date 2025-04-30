import styled from "styled-components";

export const FooterStyle = styled.footer`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #333;
  color: white;
  padding: 20px;
  text-align: center;
  width: 100%;
  height: 8vh;
  box-sizing: border-box;

  @media (max-width: 768px) {
    position: fixed;
    margin-top: 91vh;
    height: 7vh;
    gap: 10px;

  }
`;

export const Escritor = styled.h3`
  margin-left: 3vw;
  color: #4CAF50;
  
  @media (max-width: 768px) {
    margin-left: 0;
    font-size: 15px;
  }
`;

export const SocialIcons = styled.div`
  display: flex;
  margin-left: 30px;
  margin-top: 1vh;

  a {
    color: white;
    margin: 0 8px;
    font-size: 24px;

    &:hover {
      color: #4CAF50;
    }
  }

  @media (max-width: 768px) {

        margin-left: 40vw;
  }
`;