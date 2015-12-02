import React, { Component, PropTypes } from 'react';
import './badge.less';

export default class Badge extends Component {

  static propTypes = {
    subhead : PropTypes.string,
    value   : PropTypes.number
  }

  render() {
    let subhead = this.props.subhead,
        value = this.props.value;

    return (
      <div className="badge">
        <div className="subhead">{subhead}</div>
        {value}
      </div>
    );
  }
}