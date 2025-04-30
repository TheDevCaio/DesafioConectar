import styled from "styled-components";


export const FooterStyle = styled.footer`
  background-color: #333;
  color: white;
  padding: 20px 0;
  text-align: center;
`;

export const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const FooterLinks = styled.div`
  margin-bottom: 10px;
  a {
    color: white;
    margin: 0 15px;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const FooterButton = styled.div`
  margin-top: 10px;
  a {
    padding: 10px 20px;
    background-color: #007BFF;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    &:hover {
      background-color: #0056b3;
    }
  }
`;

export const SocialIcons = styled.div`
  margin-top: 20px;
  a {
    color: white;
    margin: 0 10px;
    font-size: 24px;
    &:hover {
      color: #007BFF;
    }
  }
`;