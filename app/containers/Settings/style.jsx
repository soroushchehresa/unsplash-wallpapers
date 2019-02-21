import styled from 'styled-components';

export default styled.div`
  .container {
    display: flex;
    justify-content: center;
    .quit {
      position: absolute;
      top: 60px;
      background: #ccc;
      font-size: 13px;
      padding: 5px 20px;
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
