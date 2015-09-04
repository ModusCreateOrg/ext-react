import React, { Component, PropTypes } from 'react';

export default class Filter extends Component {
  static propTypes = {
    onFilterChange: PropTypes.func.isRequired
  }

  render() {
    const { onFilterChange } = this.props;

    return (
      <input type="text" placeholder="Filter" onChange={onFilterChange} />
    );
  }
}
