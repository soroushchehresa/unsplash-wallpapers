// @flow

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import type { Map as MapType } from 'immutable';
import axios from 'axios';
import path from 'path';
import fs from 'fs';
import os from 'os';
import Loading from 'app/components/Loading';
import StyledMain from './style';
import { getPhoto, setWallpaper } from './redux';

type Props = {
  getPhotoAction : () => void,
  setWallpaperAction : () => void,
  getPhotoLoading : boolean,
  photoData : MapType,
  setWallpaperLoading : boolean,
  activeCategory : number,
};

type State = {
  downloadLoading : boolean,
};

@connect(
  state => ({
    setWallpaperLoading: state.getIn(['Home', 'setWallpaperLoading']),
    getPhotoLoading: state.getIn(['Home', 'getPhotoLoading']),
    photoData: state.getIn(['Home', 'photoData']),
    activeCategory: state.getIn(['Categories', 'activeCategory']),
    activeTheme: state.getIn(['Settings', 'activeTheme']),
  }),
  {
    getPhotoAction: getPhoto,
    setWallpaperAction: setWallpaper,
  },
)
@autobind
class Home extends PureComponent<Props, State> {
  constructor(props : Props) {
    super(props);
    this.state = {
      downloadLoading: false,
    };
  }

  componentDidMount() {
    const { photoData, getPhotoAction, activeCategory } = this.props;
    if (photoData.size === 0) {
      getPhotoAction({ activeCategory });
    }
  }

  handleDownload() {
    const { photoData } = this.props;
    this.setState({ downloadLoading: true });
    axios.get(photoData.getIn(['links', 'download']), { responseType: 'arraybuffer' })
      .then(({ data }) => {
        const base64Image = new Buffer.from(data, 'binary').toString(
          'base64',
        );
        let picturePath = path.join(
          os.homedir(),
          '/Downloads',
          `unsplash-${photoData.get('id')}.png`,
        );
        picturePath = path.normalize(picturePath);
        fs.writeFile(picturePath, base64Image, 'base64', () => {
          this.setState({
            downloadLoading: false,
          });
          new Notification('Download Completed!', {
            body: `Image saved in "${os.homedir()}/Downloads"`,
            icon: path.join(__dirname, '../resources/icons/64x64.png'),
          });
        });
      })
      .catch(() => {
        this.setState({ downloadLoading: false });
        new Notification('Download Failed!', {
          body: 'network connection error...',
          icon: path.join(__dirname, '../resources/icons/64x64.png'),
        });
      });
  }

  render() {
    const {
      getPhotoLoading,
      getPhotoAction,
      photoData,
      setWallpaperAction,
      setWallpaperLoading,
      activeCategory,
      activeTheme,
    } = this.props;
    const { downloadLoading } = this.state;
    return (
      <StyledMain>
        <button
          className={`photoWrapper${getPhotoLoading || setWallpaperLoading ? ' disabled' : ''}`}
          style={{
            backgroundImage: `url(${photoData.getIn(['urls', 'small'])})`,
            backgroundColor: photoData.get('color'),
          }}
          onClick={() => getPhotoAction({ activeCategory })}
        >
          <div className="buttonWrapper">
            {getPhotoLoading ? (
              <Loading color="#fff" size="16px" />
            ) : (
              <i className="fa fa-refresh" />
            )}
          </div>
        </button>
        <button
          className="setWallpaperButton"
          disabled={getPhotoLoading || setWallpaperLoading}
          onClick={setWallpaperAction}
        >
          <span>Set as Wallpaper</span>
          {setWallpaperLoading && <Loading color={activeTheme === 'Dark' ? '#ccc' : '#666'} size="14px" />}
        </button>
        <div className="bottomWrapper">
          <a className="author" href={photoData.getIn(['links', 'html'])}>
            By
            {
              (photoData.size > 0)
                ? (
                  <span>
                    {photoData.getIn(['user', 'first_name'])}
                    {photoData.getIn(['user', 'last_name']) || ''}
                  </span>
                )
                : <span className="empty">-------</span>
            }
          </a>
          <button
            onClick={this.handleDownload}
            className={`download${getPhotoLoading || setWallpaperLoading || downloadLoading || photoData.size === 0 ? ' disabled' : ''}`}
          >
            Download
            {downloadLoading && <Loading color={activeTheme === 'Dark' ? '#ccc' : '#666'} size="10px" />}
          </button>
        </div>
      </StyledMain>
    );
  }
}

export default Home;
