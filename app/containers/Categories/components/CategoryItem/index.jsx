// @flow

import React from 'react';
import StyledPhotoItem from './style';

type Props = {
  title : string,
  background : string,
  icon : string,
  onClick : () => void,
  active : boolean
};

export default ({
  background,
  icon,
  title,
  onClick,
  active,
} : Props) => (
  <StyledPhotoItem
    background={background}
    onClick={onClick}
    active={active}
  >
    <img src={icon} alt={title} />
    <h3>{title}</h3>
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
