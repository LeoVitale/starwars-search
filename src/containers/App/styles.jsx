import styled, { createGlobalStyle } from 'styled-components';
import background from 'images/backgrounds/100.jpg';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html,
  body {
    margin: 0;
    height: 100vh;
    font-family: 'Lato', sans-serif;
    font-size: 16px;
  }
`;

export const MainContainer = styled.div`
  height: 100vh;
  display: flex;
  align-content: center;
  align-items: center;
  background-color: black;
  justify-content: center;
`;

export const AppContainer = styled.div`
  width: 1500px;
  z-index: 10;
  border-radius: 10px;
`;

export const BackgroundImage = styled.div`
  z-index: 0;
  position: fixed;
  height: 120vh;
  width: 120vw;
  background: url(${background}) no-repeat center center;
  background-size: cover;
`;

export const Logo = styled.img`
  width: 200px;
  margin: auto;
  display: block;
  margin-bottom: 30px;
`;
