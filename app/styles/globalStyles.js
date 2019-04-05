// @flow

import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  @import '../node_modules/font-awesome/css/font-awesome.min.css';
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,700|Roboto:400,700');
  
  [data-theme^="light"],
  [data-theme] [data-theme^="light"] {
    --main-color: #000;
  }
  
  [data-theme^="dark"],
  [data-theme] [data-theme^="dark"],
  [data-theme="light-dark-sidebar"] nav {
    --main-color: #fff;
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
    transition: 700ms ease opacity;
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
    background: #3a3e3f;
  }
`;
