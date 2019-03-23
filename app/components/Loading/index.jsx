// @flow

import React from 'react';
import Styles from './styles';

type Props = {
  size : string,
  color : string,
}

export default ({ size, color } : Props) => (
  <Styles
    size={size}
    color={color}
  >
    <div className="spinner" />
  </Styles>
);
