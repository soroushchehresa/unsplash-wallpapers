// @flow

import styled from 'styled-components';

export default styled.div`
  .container {
    background: #efefef;
    position: relative;
    display: flex;
    justify-content: stretch;
    flex-direction: column;
    .photoWrapper {
      &.disabled {
        pointer-events: none;
      }
      cursor: default;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 5px;
      height: 230px;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;
      background-color: rgba(255, 255, 255, 0.4);
      > .buttonWrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: default;
        width: 50px;
        height: 45px;
        border-radius: 5px;
        background: rgba(0, 0, 0, 0.4);
        > i {
          color: #fff;
          font-size: 20px;
        }
      }
    }
    > .setWallpaperButton {
      padding: 13px 0;
      margin: 12px 12px 0;
      background: #fff;
      border: 1px solid #ccc;
      border-radius: 5px;
      font-size: 13px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      height: 48px;
      &:disabled {
        pointer-events: none;
      }
      > span {
        margin: 0 10px;
      }
    }
    > .bottomWrapper {
      display: flex;
      align-items: center;
      flex-direction: row;
      justify-content: space-between;
      height: 40px;
      padding: 0 20px;
      > .autor {
        cursor: default;
        font-size: 12px;
        color: #333;
        > span {
          font-weight: bold;
          margin-left: 3px;
          &.empty {
            color: #cccccc;
          }
        }
      }
      > .download {
        font-size: 12px;
        color: #666;
        display: flex;
        align-items: center;
        justify-content: center;
        > div {
          margin-left: 5px;
        }
        &.disabled {
          pointer-events: none;
          color: #999;
        }
      }
    }
  }
`;
