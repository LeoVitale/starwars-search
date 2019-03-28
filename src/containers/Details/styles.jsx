import styled from 'styled-components';

const background = `${process.env.PUBLIC_URL}/assets/images/backgrounds/100.jpg`;
export const Container = styled.div`
  display: flex;
  position: relative;
  height: 760px;
  align-items: middle;
  justify-content: center;
  padding: 50px;
  background-color: #000;
  border-radius: 5px;
  background: url(${background}) no-repeat center center;
  background-size: cover;
  color: white;
  box-shadow: 0px 9px 33px 0px rgba(0, 0, 0, 0.53);
`;

export const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #000;
  top: 0;
  left: 0;
  z-index: 0;
  border-radius: 5px;
  opacity: 0.6;
`;
