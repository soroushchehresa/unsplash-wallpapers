// @flow

import React from 'react';
import StyledPhotoItem from './style';

type Props = {
  imageSRC: string,
  onClick: () => void
};

export default ({ imageSRC, onClick }: Props) => (
  <StyledPhotoItem
    src={imageSRC}
    onClick={onClick}
  />
);
