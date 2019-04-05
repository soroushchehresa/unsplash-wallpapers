// @flow

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Loading from 'app/components/Loading';
import CategoryItem from './components/CategoryItem';
import StyledCategories from './style';
import { setActiveCategory } from './redux';

type Props = {
  setActiveCategoryAction : (data : number) => void,
  activeCategory : number,
};

type State = {
  getCategoriesLoading : boolean,
}

@connect(
  state => ({
    activeCategory: state.getIn(['Categories', 'activeCategory']),
  }),
  {
    setActiveCategoryAction: setActiveCategory,
  },
)
class Categories extends PureComponent<Props, State> {
  constructor(props : Props) {
    super(props);
    this.state = {
      getCategoriesLoading: true,
      categories: null,
    };
  }

  componentDidMount() {
    import('./assets/categories')
      .then((module) => {
        this.setState({ categories: module.default.items, getCategoriesLoading: false });
      });
  }

  render() {
    const { activeCategory, setActiveCategoryAction } = this.props;
    const { getCategoriesLoading, categories } = this.state;
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
  }
}

export default Categories;
