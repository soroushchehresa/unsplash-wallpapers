// @flow

import React from 'react';
import { withRouter } from 'react-router';
import logo from './assets/logo.png';
import Styles from './styles';

export default withRouter(({ history, location }) => {
  const handleChangePage = (path: string) => {
    if (location.pathname === path) {
      history.push('/');
    } else {
      history.push(path);
    }
  };
  return (
    <Styles>
      <div className="logoWrapper">
        <img src={logo} alt="logo" />
        <p>
          <span>Unsplash</span>
          Wallpapers
        </p>
      </div>
      <div className="buttonsWrapper">
        <button
          type="button"
          onClick={() => handleChangePage('/history')}
          className={location.pathname === '/history' ? 'active' : ''}
        >
          <i className="fa fa-history" />
        </button>
        <button
          type="button"
          onClick={() => handleChangePage('/settings')}
          className={location.pathname === '/settings' ? 'active' : ''}
        >
          <i className="fa fa-gear" />
        </button>
      </div>
    </Styles>
  );
});
