import React, { Component, PropTypes } from 'react';
import './badge.less';

export default class Badge extends Component {

  // Set PropTypes for our component to make it obvious that it expects an array of contacts
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