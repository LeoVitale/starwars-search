import styled from 'styled-components';
const background = `${process.env.PUBLIC_URL}/assets/images/back-button.svg`;

export const StyledButton = styled.button`
  outline: none;
  cursor: pointer;
  position: absolute;
  top: 50px;
  left: 50px;
  width: 70px;
  height: 70px;
  z-index: 10;
  background: url(${background}) no-repeat center center;
  background-size: cover;
  border: none;
  transition: all 200ms ease-in-out;
  &:hover {
    transform: scale(1.2);
  }
`;
