import React, { Component, PropTypes } from 'react';
import ListItem from './ListItem';

export default class ListHeader extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    products: PropTypes.array.isRequired
  }

  render() {
    const { text, products } = this.props;

    return (
      <div className="listsection">
        <div className="listheader">
          {text}
        </div>
        {products.map(product =>
          <ListItem
            text={product.text}
            key={product.id}
          />
        )}
      </div>
    );
  }
}
