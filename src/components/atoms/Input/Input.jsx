import React, { memo } from 'react';
import { InputStyled } from './styles';

const Input = props => {
  return <InputStyled {...props} />;
};

export default memo(Input);
