import React, { Component, PropTypes } from 'react';

export default class ObjectImage extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired
  }

  getInitials(name) {
    return name.split(' ').reduce(
        function(prev, curr) {
            return prev + curr.substr(0,1);
        },
        ''
    );
  }

  render() {
    let {image, name} = this.props;

    return (
      <object className="object-image" data={image} type={image ? "image/jpeg" : null}>
        <span className="object-initials">{this.getInitials(name)}</span>
      </object>
    );
  }
}