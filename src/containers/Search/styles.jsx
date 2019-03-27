import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export const SearchResults = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 30px;
  width: 1000px;
  height: 400px;
  overflow: auto;
`;
