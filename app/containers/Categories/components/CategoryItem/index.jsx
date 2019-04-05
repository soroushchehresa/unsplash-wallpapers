// @flow

import React, { PureComponent } from 'react';
import StyledCategoryItem from './style';

type Props = {
  title : string,
  background : string,
  icon : string,
  onClick : () => void,
  active : boolean
};

export default class CategoryItem extends PureComponent<Props> {
  render() {
    const {
      background,
      icon,
      title,
      onClick,
      active,
    } = this.props;
    return (
      <StyledCategoryItem
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
      </StyledCategoryItem>
    );
  }
}
