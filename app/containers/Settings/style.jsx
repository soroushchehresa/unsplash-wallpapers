// @flow

import styled from 'styled-components';

export default styled.div`
  .container {
    background: #efefef;
    display: flex;
    height: 100vh;
    align-items: center;
    flex-direction: column;
    padding: 0 10px;
    box-sizing: border-box;
    top: 0;
    > h3 {
      margin: 10px 0 20px;
      font-size: 20px;
      text-align: center;
    }
    > label {
      text-align: center;
      margin-bottom: 10px;
      &.run-at-startup {
        user-select: none;
        display: block;
        input {
          margin-left: 5px;
        }
      }
      &.auto-update {
        > select {
          margin-left: 5px;
          outline: none;
        }
      }
    }
    .quit {
      position: absolute;
      bottom: 35px;
      background: #fff;
      font-size: 12px;
      padding: 5px 10px;
      margin: auto;
      border-radius: 4px;
    }
    .version {
      position: absolute;
      bottom: 7px;
      margin: auto;
      text-align: center;
      font-size: 11px;
      color: #999;
      cursor: default;
    }
  }
`;
