import React from 'react';
import { remote } from 'electron';
import Navbar from 'app/components/Navbar';
import StyledSettings from './style';

export default () => {
  const handleQuit = () => (remote.getCurrentWindow()).close();
  return (
    <StyledSettings>
      <Navbar />
      <div className="container">
        <button onClick={handleQuit} className="quit">Quit Unsplash Wallpapers</button>
        <p className="version">verion: {require('../../../package').version}</p>
      </div>
    </StyledSettings>
  );
};
