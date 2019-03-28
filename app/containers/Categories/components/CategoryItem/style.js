// @flow

import styled, { css } from 'styled-components';

export default styled.div`
  background-image: url("${props => props.background}");
  background-size: cover;
  background-position: center center;
  width: 177px;
  height: 100px;
  margin: 1px;
  object-fit: cover;
  background-color: rgba(255, 255, 255, 0.4);
  float: left;
  cursor: default;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.7);
    left: 0;
    top: 0;
  }
  > .active {
    font-size: 28px;
    color: white;
    position: absolute;
  }
  > img {
    width: 40px;
    height: 40px;
    position: absolute;
    top: 18px;
    object-fit: cover;
  }
  > h3 {
    color: #fff;
    position: absolute;
    bottom: 16px;
    margin: 0;
    font-size: 12px;
    font-weight: normal;
  }
  > .activeWrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.8);
    left: 0;
    top: 0;
    z-index: 9;
    display: flex;
    align-items: center;
    justify-content: center;
    > .circle {
      width: 50px;
      height: 50px;
      border-radius: 100px;
      border: 2px solid #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      > i {
        font-size: 26px;
        color: #fff;
      }
    }
  }
`;
