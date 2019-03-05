import styled from 'styled-components';

export default styled.div`
  > .pictures-wrapper {
    overflow-y: scroll;
    height: 333px;
    width: 100%;
    text-align: center;
    box-sizing: border-box;
    padding: 0 10px 0 8px;
    position: relative;
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
