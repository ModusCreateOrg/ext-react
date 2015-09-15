import React, { Component, PropTypes } from 'react';

export default class ListItem extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func
  }

  static contextTypes = {
    filter: PropTypes.instanceOf(RegExp).isRequired
  }

  render() {
    const { text, onClick } = this.props;
    const { filter } = this.context;

    return (
      <div className="listitem" onClick={onClick}
        dangerouslySetInnerHTML={{
          __html: text.replace(filter, (match, p1) => p1 ? `<strong>${p1}</strong>` : '')
        }}
      ></div>
    );
  }
}
