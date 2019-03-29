// @flow

import React from 'react';
import { connect } from 'react-redux';
import Navbar from 'app/components/Navbar';
import CategoryItem from './components/CategoryItem';
import StyledCategories from './style';
import { setActiveCategory } from './redux';
// categories image
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
import specialBackground from './assets/backgrounds/Special.jpg';
import specialIcon from './assets/icons/Special.png';
import artsBackground from './assets/backgrounds/Arts.jpg';
import artsIcon from './assets/icons/Arts.png';

type Props = {
  setActiveCategoryAction : (data : number) => void,
  activeCategory : number,
};

export default connect(
  state => ({
    activeCategory: state.getIn(['Categories', 'activeCategory']),
  }),
  { setActiveCategoryAction: setActiveCategory },
)(({ activeCategory, setActiveCategoryAction } : Props) => (
  <StyledCategories>
    <Navbar />
    <div className="container">
      <div className="categories-wrapper">
        <CategoryItem
          key="1065396"
          title="Special"
          background={specialBackground}
          icon={specialIcon}
          onClick={() => setActiveCategoryAction(1065396)} // eslint-disable-line
          active={activeCategory === 1065396}
        />
        <CategoryItem
          key="1065976"
          title="Wallpapers"
          background={wallpapersBackground}
          icon={wallpapersIcon}
          onClick={() => setActiveCategoryAction(1065976)} // eslint-disable-line
          active={activeCategory === 1065976}
        />
        <CategoryItem
          key="3330461"
          title="Arts & Culture"
          background={artsBackground}
          icon={artsIcon}
          onClick={() => setActiveCategoryAction(3330461)} // eslint-disable-line
          active={activeCategory === 3330461}
        />
        <CategoryItem
          key="3330455"
          title="Food"
          background={foodBackground}
          icon={foodIcon}
          onClick={() => setActiveCategoryAction(3330455)} // eslint-disable-line
          active={activeCategory === 3330455}
        />
        <CategoryItem
          key="3356576"
          title="Fashion"
          background={fashionBackground}
          icon={fashionIcon}
          onClick={() => setActiveCategoryAction(3356576)} // eslint-disable-line
          active={activeCategory === 3356576}
        />
        <CategoryItem
          key="3330452"
          title="Animals"
          background={animalsBackground}
          icon={animalsIcon}
          onClick={() => setActiveCategoryAction(3330452)} // eslint-disable-line
          active={activeCategory === 3330452}
        />
        <CategoryItem
          key="3330448"
          title="Nature"
          background={natureBackground}
          icon={natureIcon}
          onClick={() => setActiveCategoryAction(3330448)} // eslint-disable-line
          active={activeCategory === 3330448}
        />
        <CategoryItem
          key="3356581"
          title="Spirituality"
          background={spiritualityBackground}
          icon={spiritualityIcon}
          onClick={() => setActiveCategoryAction(3356581)} // eslint-disable-line
          active={activeCategory === 3356581}
        />
        <CategoryItem
          key="3348877"
          title="Business & Work"
          background={businessBackground}
          icon={businessIcon}
          onClick={() => setActiveCategoryAction(3348877)} // eslint-disable-line
          active={activeCategory === 3348877}
        />
        <CategoryItem
          key="3348849"
          title="Architecture"
          background={architectureBackground}
          icon={architectureIcon}
          onClick={() => setActiveCategoryAction(3348849)} // eslint-disable-line
          active={activeCategory === 3348849}
        />
        <CategoryItem
          key="3330445"
          title="Textures & Patterns"
          background={texturesBackground}
          icon={texturesIcon}
          onClick={() => setActiveCategoryAction(3330445)} // eslint-disable-line
          active={activeCategory === 3330445}
        />
        <CategoryItem
          key="3356584"
          title="Experimental"
          background={experimentalBackground}
          icon={experimentalIcon}
          onClick={() => setActiveCategoryAction(3356584)} // eslint-disable-line
          active={activeCategory === 3356584}
        />
      </div>
    </div>
  </StyledCategories>
));
