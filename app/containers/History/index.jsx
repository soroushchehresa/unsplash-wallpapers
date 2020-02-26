// @flow

import React, { memo, useEffect, useState } from 'react';
import storage from 'electron-json-storage';
import { connect } from 'react-redux';
import type { history as historyType } from 'history';
import type { Map as MapType } from 'immutable';
import { withRouter } from 'react-router';
import wallpaper from 'wallpaper';
import { setPhoto } from 'app/containers/Home/redux';
import Loading from 'app/components/Loading';
import PhotoItem from './components/PhotoItem';
import StyledHistory from './style';

type Props = {
  history : historyType,
  setPhotoAction : () => void
};

const History = memo(({ setPhotoAction, history } : Props) => {
  const [pictures, setPictures] = useState([]);
  const [currentWallpaper, setCurrentWallpaper] = useState('');
  const [getPicturesLoading, setGetPicturesLoading] = useState(true);

  useEffect(() => {
    storage.get('pictures', (error, pictures) => {
      if (pictures && pictures.list) {
        setPictures(pictures.list);
        wallpaper.get()
          .then((path) => {
            setCurrentWallpaper(path);
          });
      }
      setGetPicturesLoading(false);
    });
  }, []);

  const handleSetActivePhoto = (photoData : MapType) => {
    setPhotoAction(photoData);
    history.push('/');
  };

  return (
    <StyledHistory>
      {
        getPicturesLoading &&
        <div className="loading-wrapper">
          <Loading color="#bbb" size="22px" />
        </div>
      }
      {
        (!getPicturesLoading && (pictures.length > 0))
          ? (
            <div className="pictures-wrapper">
              {
                pictures.map(picItem => (
                  <PhotoItem
                    key={picItem.id}
                    imageSRC={picItem.urls.small}
                    onClick={() => handleSetActivePhoto(picItem)}
                    active={currentWallpaper === picItem.path}
                  />
                ))
              }
            </div>
          )
          : !getPicturesLoading && <p className="empty-history">You haven’t set any wallpaper yet</p>
      }
    </StyledHistory>
  );
});

export default connect(
  null,
  { setPhotoAction: setPhoto },
)(withRouter(History));
