import React from 'react';
import { Link } from 'react-router';
import * as Examples from '../examples';

export const links = [];
const routes = [];
let key = 0;

for (const chapterName of Object.keys(Examples)) {
  const chapterExamples = Examples[chapterName];
  const childRoutes = [];
  const route = {
    path: `${chapterName}`
  };
  links.push(<h1 key={key++}>{chapterName}</h1>);

  for (const exampleName of Object.keys(chapterExamples)) {
    const example = chapterExamples[exampleName];
    const path = `/${chapterName}/${exampleName}`;

    links.push(<Link to={path} key={key++}>{exampleName}</Link>);
    childRoutes.push({
      path: `${exampleName}`,
      component: example
    });
  }

  route.childRoutes = childRoutes;
  routes.push(route);
}

export default routes;
