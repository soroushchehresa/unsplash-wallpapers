// @flow

import { createGlobalStyle } from 'styled-components';
import { boxsBackgroundColor } from './theme';

export default createGlobalStyle`
  @import '../node_modules/font-awesome/css/font-awesome.min.css';
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,700|Roboto:400,700');

  * {
    user-select: none;
  }

  body {
    background: var(--main-color);
    font-family: 'Open Sans', serif;
    font-size: 14px;
    position: relative;
    height: ${process.platform === 'darwin' ? 'calc(100vh - 10px)' : '100vh'};
    margin: 0;
    padding: ${process.platform === 'darwin' ? '11px 0 0 0' : '0'};
    overflow: hidden;
  }
  
  button {
    background: transparent;
    border: none;
    outline: none;
    cursor: default;
  }
  
  a {
    text-decoration: none;
  }

  .fade-enter,
  .fade-exit {
    position: absolute;
    top: 0;
    left: 0;
    transition: 300ms ease opacity;
  }
  
  .fade-enter,
  .fade-exit-active {
    opacity: 0;
  }
  
  .fade-enter-active {
    opacity: 1;
    z-index: 1;
  }
  
  .app-container {
    background: ${boxsBackgroundColor};
    height: calc(100vh - 50px);
  }
  
  .lazy-loading-wrapper {
    height: calc(100vh - 50px);
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
