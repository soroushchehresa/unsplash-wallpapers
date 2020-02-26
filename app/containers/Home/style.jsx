// @flow

import styled from 'styled-components';
import { boxsBackgroundColor, textsColor } from 'app/styles/theme';
import theme from 'styled-theming';

const setWallpaperButtonColor = theme('mode', {
  Light: '#fff',
  Dark: '#4e5252',
});

const setWallpaperButtonTextColor = theme('mode', {
  Light: '#222',
  Dark: '#b4b3b7',
});

const setWallpaperButtonBorderColor = theme('mode', {
  Light: '#ccc',
  Dark: '#4e5252',
});

const downloadButtonTextColor = theme('mode', {
  Light: '#666',
  Dark: '#ccc',
});

export default styled.div`
  background: ${boxsBackgroundColor};
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
    position: relative;
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
    > .location {
      position: absolute;
      left: 5px;
      bottom: 5px;
      color: #fff;
      background: rgba(0,0,0,.5);
      opacity: .5;
      border-radius: 3px;
      padding: 3px 10px 4px;
      font-size: 10px;
      > i {
        margin-right: 5px;
      }
    }
  }
  > .setWallpaperButton {
    padding: 13px 0;
    margin: 12px 12px 0;
    background: ${setWallpaperButtonColor};
    border: 1px solid ${setWallpaperButtonBorderColor};
    border-radius: 5px;
    font-size: 13px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 48px;
    color: ${setWallpaperButtonTextColor};
    font-weight: 400;
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
    > .author {
      cursor: default;
      font-size: 12px;
      color: ${textsColor};
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
      color: ${downloadButtonTextColor};
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
`;
