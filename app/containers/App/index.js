// @flow

import React, { Fragment, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { Route } from 'react-router';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import moment from 'moment';
import { connect } from 'react-redux';
import storage from 'electron-json-storage';
import { withRouter } from 'react-router';
import Navbar from 'app/components/Navbar';
import { getPhoto } from 'app/containers/Home/redux';
import GlobalStyle from 'app/styles/globalStyles';

type Props = {
  children : React.Node,
  getPhotoAction : (data : { data : boolean }) => void,
  activeCategory : string,
  activeTheme : string,
  location : Object,
};

const App = ({
  children,
  activeTheme,
  location,
  getPhotoAction,
  activeCategory,
} : Props) => {
  const checkUpdateTime = async () => {
    storage.getMany(['autoUpdateWallpaperSchedule', 'autoUpdateWallpaperLastUpdate'], (error, data) => {
      if (error) {
        console.log(error);
      } else if (Object.keys(data.autoUpdateWallpaperLastUpdate).length && Object.keys(data.autoUpdateWallpaperSchedule).length) {
        const now = moment();
        const last = moment(data.autoUpdateWallpaperLastUpdate, 'MM/DD/YYYY HH:mm:ss');
        const diffTime = now.diff(last, 'hours');
        switch (data.autoUpdateWallpaperSchedule) {
          case 'Hourly':
            if (diffTime >= 1) {
              getPhotoAction({ setAutomaticWallpaper: true, activeCategory });
            }
            break;
          case 'Daily':
            if (diffTime >= 24) {
              getPhotoAction({ setAutomaticWallpaper: true, activeCategory });
            }
            break;
          case 'Weekly':
            if (diffTime >= 168) {
              getPhotoAction({ setAutomaticWallpaper: true, activeCategory });
            }
            break;
          default:
            break;
        }
      }
    });
  };
  useEffect(() => {
    setInterval(checkUpdateTime, 10000);
  }, []);
  return (
    <ThemeProvider theme={{ mode: activeTheme }}>
      <Fragment>
        <Navbar location={location} />
        <div className="app-container">
          <Route
            render={() => (
              <TransitionGroup>
                <CSSTransition
                  key={location.pathname}
                  classNames="fade"
                  timeout={300}
                >
                  {children}
                </CSSTransition>
              </TransitionGroup>
            )}
          />
          <GlobalStyle />
        </div>
      </Fragment>
    </ThemeProvider>
  );
};

export default withRouter(connect(
  state => ({
    activeCategory: state.getIn(['Categories', 'activeCategory']),
    activeTheme: state.getIn(['Settings', 'activeTheme']),
  }),
  {
    getPhotoAction: getPhoto,
  },
)(App));
