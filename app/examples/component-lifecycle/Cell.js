import React, { Component, PropTypes } from 'react';
import './cell.less';

export default class Cell extends Component {

  // Set PropTypes for our component to make it obvious what it expects
  static propTypes = {
    cell    : PropTypes.object.isRequired,
    unit    : PropTypes.string,
    basis   : PropTypes.number,
    color   : PropTypes.string,
    animate : PropTypes.bool
  }

  static defaultProps = {
    unit    : 'rem',
    basis   : 1,
    color   : '#000',
    animate : false
  }

  render() {
    let {cell, animate} = this.props,
        className;

    className = 'cell ' + (cell.dead? 'dead ' : '') + (animate? 'animate ' : '');

    return (
      <div className={ className } style={ this.buildCellStyle(cell) }></div>
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