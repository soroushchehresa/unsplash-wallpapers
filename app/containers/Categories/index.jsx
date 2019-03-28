// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import { withRouter } from 'react-router';
import Navbar from 'app/components/Navbar';
import CategoryItem from './components/CategoryItem';
import StyledHistory from './style';

import architectureBackground from './assets/backgrounds/Architecture.jpg';
import architectureIcon from './assets/icons/Architecture.png';

import texturesBackground from './assets/backgrounds/Textures.jpg';
import texturesIcon from './assets/icons/Textures.png';

import natureBackground from './assets/backgrounds/Nature.jpg';
import natureIcon from './assets/icons/Nature.png';

import businessBackground from './assets/backgrounds/Business.jpg';
import businessIcon from './assets/icons/Business.png';

import animalsBackground from './assets/backgrounds/Animals.jpg';
import animalsIcon from './assets/icons/Animals.png';

import fashionBackground from './assets/backgrounds/Fashion.jpg';
import fashionIcon from './assets/icons/Fashion.png';

import foodBackground from './assets/backgrounds/Food.jpg';
import foodIcon from './assets/icons/Food.png';

import experimentalBackground from './assets/backgrounds/Experimental.jpg';
import experimentalIcon from './assets/icons/Experimental.png';

import wallpapersBackground from './assets/backgrounds/Wallpapers.jpg';
import wallpapersIcon from './assets/icons/Wallpapers.png';

import spiritualityBackground from './assets/backgrounds/Spirituality.jpg';
import spiritualityIcon from './assets/icons/Spirituality.png';

type Props = {};

type State = {
  pictures : Array,
  currentWallpaper : string,
};

@connect(
  null,
  {},
)
@withRouter
@autobind
class History extends Component<Props, State> {
  constructor(props : Props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <StyledHistory>
        <Navbar />
        <div className="container">
          <div className="pictures-wrapper">
            <CategoryItem
              key="1065976"
              title="Wallpapers"
              background={wallpapersBackground}
              icon={wallpapersIcon}
              onClick={() => alert('1065976')} // eslint-disable-line
              active={true}
            />
            <CategoryItem
              key="3330455"
              title="Food"
              background={foodBackground}
              icon={foodIcon}
              onClick={() => alert('3330455')} // eslint-disable-line
              active={false}
            />
            <CategoryItem
              key="3356576"
              title="Fashion"
              background={fashionBackground}
              icon={fashionIcon}
              onClick={() => alert('3356576')} // eslint-disable-line
              active={false}
            />
            <CategoryItem
              key="3330452"
              title="Animals"
              background={animalsBackground}
              icon={animalsIcon}
              onClick={() => alert('3330452')} // eslint-disable-line
              active={false}
            />
            <CategoryItem
              key="3330448"
              title="Nature"
              background={natureBackground}
              icon={natureIcon}
              onClick={() => alert('3330448')} // eslint-disable-line
              active={false}
            />
            <CategoryItem
              key="3356581"
              title="Spirituality"
              background={spiritualityBackground}
              icon={spiritualityIcon}
              onClick={() => alert('3356581')} // eslint-disable-line
              active={false}
            />
            <CategoryItem
              key="3348877"
              title="Business & Work"
              background={businessBackground}
              icon={businessIcon}
              onClick={() => alert('3348877')} // eslint-disable-line
              active={false}
            />
            <CategoryItem
              key="3348849"
              title="Architecture"
              background={architectureBackground}
              icon={architectureIcon}
              onClick={() => alert('3348849')} // eslint-disable-line
              active={false}
            />
            <CategoryItem
              key="3330445"
              title="Textures & Patterns"
              background={texturesBackground}
              icon={texturesIcon}
              onClick={() => alert('3330445')} // eslint-disable-line
              active={false}
            />
            <CategoryItem
              key="3356584"
              title="Experimental"
              background={experimentalBackground}
              icon={experimentalIcon}
              onClick={() => alert('3356584')} // eslint-disable-line
              active={false}
            />
          </div>
        </div>
      </StyledHistory>
    );
  }
}

export default History;
