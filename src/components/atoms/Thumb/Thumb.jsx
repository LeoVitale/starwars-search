import React, { memo } from 'react';
import { StyledThumb } from './styles';

const Thumb = props => {
  return <StyledThumb {...props} />;
};

export default memo(Thumb);
