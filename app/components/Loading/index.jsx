// @flow

import React, { PureComponent } from 'react';
import Styles from './styles';

type Props = {
  size : string,
  color : string,
}

export default class Loading extends PureComponent<Props> {
  render() {
    const { size, color } = this.props;
    return (
      <Styles
        size={size}
        color={color}
      >
        <div className="spinner" />
      </Styles>
    );
  }
}
