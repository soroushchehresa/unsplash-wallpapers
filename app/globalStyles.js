// @flow

import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  @import '../node_modules/font-awesome/css/font-awesome.min.css';
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,700|Roboto:400,700');
  
  body {
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
`;
