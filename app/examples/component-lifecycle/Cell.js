import React, { Component, PropTypes } from 'react';

export default class Cell extends Component {

  // Set PropTypes for our component to make it obvious that it expects an array of contacts
  static propTypes = {
    cell  : PropTypes.object.isRequired,
    unit  : PropTypes.string,
    basis : PropTypes.number,
    color : PropTypes.string
  }

  static defaultProps = {
    unit  : 'rem',
    basis : 1,
    color : '#000'
  }

  render() {
    let cell = this.props.cell;

    return (
      <div className="cell" style={ this.buildCellStyle(cell) }></div>
    );
  }

  buildCellStyle(cell) {
    let { unit, basis, color } = this.props;

    return {
      top   : (cell.yPos * basis) + unit,
      left  : (cell.xPos * basis) + unit,
      color : cell.color || color
    };
  }
}