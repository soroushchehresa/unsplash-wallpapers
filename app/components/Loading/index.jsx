// @flow

import React, { memo } from 'react';
import Styles from './styles';

type Props = {
  size : string,
  color : string,
}

export default memo(({ size, color } : Props) => (
  <Styles
    size={size}
    color={color}
  >
    <div className="spinner" />
  </Styles>
));
