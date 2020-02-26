// @flow

import React, { memo } from 'react';
import StyledPhotoItem from './style';

type Props = {
  imageSRC : string,
  onClick : () => void,
  active : boolean
};

export default memo(({ imageSRC, onClick, active } : Props) => (
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
));
