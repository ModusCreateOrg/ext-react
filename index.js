import React from 'react';
import ReactDom from 'react-dom';
import Router from 'react-router';
import App from './app/App';
import routes from './app/common/Routes';

const rootRoute = {
  childRoutes: [{
    path: '/',
    component: App,
    childRoutes: routes
  }]
};

ReactDom.render((
  <Router children={rootRoute} />
), document.getElementById('root'));
