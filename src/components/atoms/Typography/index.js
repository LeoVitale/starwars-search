import styled from 'styled-components';
import DynamicComponent from './DynamicComponent';

export const CharacterName = styled(DynamicComponent)`
  font-weight: 900;
  text-transform: uppercase;
  font-size: 5.5rem;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.4);
`;

export const BodyText = styled(DynamicComponent)`
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 2rem;
`;

export const Subtitle = styled(DynamicComponent)`
  font-weight: 900;
  font-size: 1.6rem;
  vertical-align: middle;
  margin-bottom: 10px;
  :before {
    content: ' ';
    width: 8px;
    height: 15px;
    background-color: #ffc500;
    vertical-align: middle;
    display: inline-block;
    margin-right: 10px;
  }
`;

export const SearchResultName = styled(DynamicComponent)`
  font-weight: 900;
  text-transform: uppercase;
  font-size: 2rem;
`;
