// @flow

import styled from 'styled-components';
import { boxsBackgroundColor } from 'app/styles/theme';

export default styled.div`
  background: ${boxsBackgroundColor};
  height: calc(100vh - 50px);
  width: 100%;
  overflow: hidden;
  position: relative;
  > .loading-wrapper {
    height: calc(100vh - 50px);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  > .pictures-wrapper {
    position: absolute;
    left: 0;
    top: 0;
    right: -17px;
    overflow-y: scroll;
    width: 100%;
    height: 100%;
    text-align: center;
    padding: 0 8px;
    > .empty-list {
          color: #999;
    }
  }
  .empty-history {
    color: #999;
    text-align: center;
    width: 100%;
  }
`;
