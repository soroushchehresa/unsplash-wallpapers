// @flow

import React from 'react';
import StyledPhotoItem from './style';

type Props = {
  imageSRC : string,
  onClick : () => void,
  active : boolean
};

export default ({ imageSRC, onClick, active } : Props) => (
  <StyledPhotoItem
    imageSRC={imageSRC}
    onClick={onClick}
    active={active}
  >
    {
      active
      && (
        <div className="activeWrapper">
          <div className="circle">
            <i className="active fa fa-check" />
          </div>
        </div>
      )
    }
  </StyledPhotoItem>
);
