import styled from 'styled-components';

export default styled.div`
  > .pictures-wrapper {
    overflow-y: scroll;
    height: 330px;
    width: 100%;
    text-align: center;
    box-sizing: border-box;
    padding: 0 10px 0 8px;
    .empty-history {
      display: flex;
      height: 320px;
      align-items: center;
      justify-content: center;
      color: #999;
    }
  }
`;
