// @flow

import React from 'react';
import { connect } from 'react-redux';
import os from 'os';
import history from 'app/utils/history';
import logo from './assets/logo.png';
import lightLogo from './assets/light-logo.png';
import Styles from './styles';

type Props = {
  location : Object,
  activeTheme : string,
};

const mapStateToProps = state => ({
  activeTheme: state.getIn(['Settings', 'activeTheme']),
});

export default connect(mapStateToProps, null)(({ location, activeTheme } : Props) => {
  const handleChangePage = (path : string) => {
    history.push(location.pathname === path ? '/' : path);
  };
  return (
    <Styles>
      {os.type() === 'Darwin' && <div className="arrow" />}
      <div className="logoWrapper">
        <img src={activeTheme === 'Dark' ? lightLogo : logo} alt="logo" />
        <p>
          <span>Unsplash</span>
          Wallpapers
        </p>
      </div>
      <div className="buttonsWrapper">
        <button
          type="button"
          onClick={() => handleChangePage('/categories')}
          className={location.pathname === '/categories' ? 'active' : ''}
        >
          <i className="fa fa-th-large" />
        </button>
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
