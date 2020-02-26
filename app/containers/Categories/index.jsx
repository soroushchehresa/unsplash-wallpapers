// @flow

import React, { memo, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Loading from 'app/components/Loading';
import CategoryItem from './components/CategoryItem';
import StyledCategories from './style';
import { setActiveCategory } from './redux';

type Props = {
  setActiveCategoryAction : (data : number) => void,
  activeCategory : number,
};

const Categories = memo(({ activeCategory, setActiveCategoryAction } : Props) => {
  const [getCategoriesLoading, setGetCategoriesLoading] = useState(true);
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    import('./assets/categories')
      .then((module) => {
        setGetCategoriesLoading(false);
        setCategories(module.default.items);
      });
  }, []);

  return (
    <StyledCategories>
      {
        getCategoriesLoading &&
        <div className="loading-wrapper">
          <Loading size="20px" color="#bbb" />
        </div>
      }
      <div className="categories-wrapper">
        {
          (categories && !getCategoriesLoading) &&
          categories.map((categoryItem) => (
            <CategoryItem
              key={categoryItem.id}
              title={categoryItem.title}
              background={categoryItem.background}
              icon={categoryItem.icon}
              onClick={() => setActiveCategoryAction(categoryItem.id)} // eslint-disable-line
              active={activeCategory === categoryItem.id}
            />
          ))
        }
      </div>
    </StyledCategories>
  );
});

export default connect(
  state => ({
    activeCategory: state.getIn(['Categories', 'activeCategory']),
  }),
  {
    setActiveCategoryAction: setActiveCategory,
  },
)(Categories);
