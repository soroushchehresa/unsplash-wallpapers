// @flow

import React from 'react';
import { withRouter } from 'react-router';
import type { history as historyType } from 'history';
import logo from './assets/logo.png';
import Styles from './styles';

type Props = {
  history : historyType,
  location : Object,
};

export default withRouter(({ history, location } : Props) => {
  const handleChangePage = (path : string) => {
    if (location.pathname === path) {
      history.push('/');
    } else {
      history.push(path);
    }
  };
  return (
    <Styles>
      <div className="arrow" />
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
