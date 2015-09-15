import React, { Component, PropTypes } from 'react';
import ListHeader from './ListHeader';
import Filter from './Filter';
import './list.less';

function filterProducts(filter) {
  const regExpFilter = filter;
  return function(item) {
    return item.text.search(regExpFilter) > -1;
  };
}

export default class ListContainer extends Component {
  static childContextTypes = {
    filter: PropTypes.instanceOf(RegExp)
  }

  getChildContext() {
    return {
      filter: this.state.filter
    };
  }

  onFilterChange(ev) {
    const { value } = ev.target;
    this.setState({filter: new RegExp(`(${value})`, 'ig')});
  }

  render() {
    const products = this.filterProductData();

    return (
      <div className="list">
        <Filter onFilterChange={e => this.onFilterChange(e)} />
        {Object.keys(products).map(productGroup =>
          <ListHeader
            text={productGroup}
            key={productGroup}
            products={products[productGroup]}
          />
        )}
      </div>
    );
  }

  filterProductData() {
    const { filter, products } = this.state;
    const filteredData = {};

    if (filter.length < 1) {
      return products;
    }

    for (const productGroup of Object.keys(products)) {
      const subProducts = products[productGroup].filter(filterProducts(filter));

      if (subProducts.length > 0) {
        filteredData[productGroup] = subProducts;
      }
    }

    return filteredData;
  }

  state = {
    filter: new RegExp(),

    products: {
      'Fruit': [
        {id: 1, text: 'Apple'},
        {id: 2, text: 'Banana'},
        {id: 3, text: 'Orange'},
        {id: 4, text: 'Pineapple'},
        {id: 5, text: 'Lime'},
        {id: 6, text: 'Strawberry'},
        {id: 7, text: 'Mango'},
        {id: 8, text: 'Papaya'},
        {id: 9, text: 'Grape'}
      ],
      'Vegetable': [
        {id: 10, text: 'Carrot'},
        {id: 11, text: 'Cabbage'},
        {id: 12, text: 'Spinach'},
        {id: 13, text: 'Lettuce'},
        {id: 14, text: 'Potato'},
        {id: 15, text: 'Leek'},
        {id: 16, text: 'Onion'},
        {id: 17, text: 'Zucchini'}
      ]
    }
  }
}
