import styled from 'styled-components';

export default styled.div`
  box-sizing: border-box;
  margin: 0;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  > .spinner {
    width: ${props => props.size};
    height: ${props => props.size};
    border-radius: 50%;
    background-color: transparent;
    border: 2px solid ${props => props.color};
    border-top-color: rgba(255,255,255,.2);
    -webkit-animation: 1s spin linear infinite;
    animation: 1s spin linear infinite;
  }
  @keyframes spin {
    from {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;
