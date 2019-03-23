import styled from 'styled-components';

export default styled.div`
  .container {
    display: flex;
    justify-content: center;
    .run-at-startup {
      user-select: none;
      margin: 20px 0;
      display: block;
      input {
        margin-right: 5px;
      }
    }
    .quit {
      position: absolute;
      bottom: 50px;
      background: #ccc;
      font-size: 12px;
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
