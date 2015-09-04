import React, { Component, PropTypes } from 'react';

export default class ListContainer extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func
  }

  render() {
    const { text, onClick } = this.props;

    return (
      <div className="listitem" onClick={onClick}>
        {text}
      </div>
    );
  }
}
