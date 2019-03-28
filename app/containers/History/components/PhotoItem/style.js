// @flow

import styled, { css } from 'styled-components';

export default styled.div`
  background-image: url("${props => props.imageSRC}");
  background-size: cover;
  background-position: center center;
  width: 117px;
  height: 75px;
  margin: 1px;
  object-fit: cover;
  background-color: rgba(255, 255, 255, 0.4);
  float: left;
  cursor: default;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  ${props => props.active && css`
    &:before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,.5);
      left: 0;
      top: 0;
    }
  `}
  > .activeWrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 9;
    display: flex;
    align-items: center;
    justify-content: center;
    > .circle {
      width: 35px;
      height: 35px;
      border-radius: 100px;
      border: 2px solid #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      > i {
        font-size: 20px;
        color: #fff;
      }
    }
  }
`;
