import React from 'react';
import Styles from './styles';

export default ({ ...rest }) => (
  <Styles {...rest}>
    <div className="spinner" />
  </Styles>
);
