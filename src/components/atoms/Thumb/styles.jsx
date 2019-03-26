import styled from 'styled-components';

export const StyledThumb = styled.div`
  width: 500px;
  height: 500px;
  background: url(${props => props.src || ''}) no-repeat;
  background-size: cover;
  border-radius: ${props => (props.circle ? '50%' : '0')};
  z-index: 1;
`;
