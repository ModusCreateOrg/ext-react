import React, { Component, PropTypes } from 'react';

class HelloUser extends Component {
  static propTypes = {
    user: PropTypes.string
  }

  static defaultProps = {
    user: 'John'
  }

  render() {
    const { user } = this.props;
    const msgStyle = {
      border: '1px solid red'
    };
    return (
        <div className="greeting" style={msgStyle}>Hello {user}!</div>
    );
  }
}

export default HelloUser;
