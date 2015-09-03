import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { links } from './common/Routes';
import './app.less';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.object
  }

  render() {
    const { children } = this.props;

    return (
      <div id="app">
        <aside id="sidebar">
          <Link to="/">Home</Link>
          { links }
        </aside>
        <article id="main">
          { children }
        </article>
      </div>
    );
  }
}
