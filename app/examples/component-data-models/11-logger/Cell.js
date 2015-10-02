import React, { Component, PropTypes } from 'react';

export default class Cell extends Component {
  static propTypes = {
    symbol: PropTypes.string.isRequired
  }

  render() {
    const { symbol } = this.props;
    const cls = `symbol icon-${symbol}`;

    return (
      <div className={cls}>
        <span className="value">{symbol}</span>
      </div>
    );
  }
}
