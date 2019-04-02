// @flow

import styled, { css } from 'styled-components';
import theme from 'styled-theming';
import { boxsBackgroundColor, textsColor } from 'app/styles/theme';

const buttonIconColor = theme('mode', {
  Light: '#666',
  Dark: '#fff',
});

export default styled.div`
  background: ${boxsBackgroundColor};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 7px 10px;
  position: relative;
  ${process.platform === 'darwin' && css`border-radius: 5px 5px 0 0;`}
  > .arrow {
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    top: -8.5px;
    width: 17px;
    height: 18px;
    background: ${boxsBackgroundColor};
    transform: rotate(45deg);
  }
  .logoWrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    > img {
      width: 16px;
      height: 16px;
      margin-right: 10px;
    }
    > p {
      color: ${textsColor};
      margin: 0;
      font-size: 12px;
      > span {
        font-weight: bold;
        margin-right: 5px;
      }
    }
  }
  .buttonsWrapper {
    display: flex;
    flex-direction: row;
    > button {
      margin-left: 5px;
      width: 25px;
      height: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      &.active {
        background: rgba(159,159,159,.4);
      }
      > i {
        cursor: default;
        font-size: 16px;
        color: ${buttonIconColor};
      }
    }
  }
`;
