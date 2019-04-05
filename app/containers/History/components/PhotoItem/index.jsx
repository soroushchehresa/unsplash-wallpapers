// @flow

import React, { PureComponent } from 'react';
import StyledPhotoItem from './style';

type Props = {
  imageSRC : string,
  onClick : () => void,
  active : boolean
};

export default class PhotoItem extends PureComponent<Props> {
  render() {
    const { imageSRC, onClick, active } = this.props;
    return (
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
  }
}
