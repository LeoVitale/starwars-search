import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledDynamicComponent = styled.div`
  margin: 0;
`;

const DynamicComponent = ({ tag, children, ...props }) => {
  const WithComponent = StyledDynamicComponent.withComponent(tag);

  return <WithComponent {...props}>{children}</WithComponent>;
};

DynamicComponent.propTypes = {
  tag: PropTypes.string,
};

DynamicComponent.defaultProps = {
  tag: 'div',
};

export default DynamicComponent;
