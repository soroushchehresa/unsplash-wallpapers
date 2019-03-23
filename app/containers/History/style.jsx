// @flow

import styled from 'styled-components';

export default styled.div`
  .container {
    background: #efefef;
    height: 100vh;
    width: 100%;
    overflow: hidden;
    position: relative;
    > .pictures-wrapper {
      position: absolute;
      left: 0;
      top: 0;
      right: -17px;
      overflow-y: scroll;
      height: calc(100vh - 50px);
      width: 100%;
      text-align: center;
      padding: 0 8px;
    }
    .empty-history {
      color: #999;
      position: absolute;
      left: 0;
      right: 0;
      top: -30px;
      bottom: 0;
      margin: auto;
      display: table;
      text-align: center;
      width: 100%;
    }
  }
`;
