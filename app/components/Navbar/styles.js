import styled from 'styled-components';

export default styled.div`
  background: #efefef;
  border-radius: 5px 5px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 7px 10px;
  position: relative;
  > .arrow {
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    top: -8.5px;
    width: 17px;
    height: 18px;
    background: #efefef;
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
      color: #666;
      width: 25px;
      height: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      &.active {
        background: #ccc;
      }
      > i {
        cursor: default;
        font-size: 16px;
        color: #666;
      }
    }
  }
`;
