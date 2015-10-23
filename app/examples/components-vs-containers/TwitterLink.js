import React, { Component, PropTypes } from 'react';

export default class TwitterLink extends Component {
  static propTypes = {
    handle: PropTypes.string.isRequired
  }

  render() {
    const handle = this.props.handle;

    return (
      <a href={"http://www.twitter.com/" + handle}>{handle}</a>
    );
  }
}