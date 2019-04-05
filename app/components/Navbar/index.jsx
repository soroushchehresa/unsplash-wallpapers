// @flow

import React, { PureComponent } from 'react';
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

type State = {
  disableChangeRoute : Object,
};

@connect(
  state => ({
    activeTheme: state.getIn(['Settings', 'activeTheme']),
  }),
  {},
)
class Navbar extends PureComponent<Props, State> {
  constructor(props : Props) {
    super(props);
    this.state = {
      disableChangeRoute: false,
    };
  }

  handleChangePage(path : string) {
    const { location } = this.props;
    const { disableChangeRoute } = this.state;
    if (!disableChangeRoute) {
      this.setState({ disableChangeRoute: true }, () => {
        history.push(location.pathname === path ? '/' : path);
        setTimeout(() => {
          this.setState({ disableChangeRoute: false });
        }, 100);
      });
    }
  }

  render() {
    const { location, activeTheme } = this.props;
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
            onClick={() => this.handleChangePage('/categories')}
            className={location.pathname === '/categories' ? 'active' : ''}
          >
            <i className="fa fa-th-large" />
          </button>
          <button
            type="button"
            onClick={() => this.handleChangePage('/history')}
            className={location.pathname === '/history' ? 'active' : ''}
          >
            <i className="fa fa-history" />
          </button>
          <button
            type="button"
            onClick={() => this.handleChangePage('/settings')}
            className={location.pathname === '/settings' ? 'active' : ''}
          >
            <i className="fa fa-gear" />
          </button>
        </div>
      </Styles>
    );

  }
}

export default Navbar;
