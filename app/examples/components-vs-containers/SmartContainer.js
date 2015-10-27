/**
 * Components vs. Containers example
 *
 * Rather than over complicate your components with logic (particularly data fetching logic),
 * keep your components simple (dumb) and move the logic into a separate (smart) container.
 *
 * More reading: https://medium.com/@learnreact/container-components-c0e67432e005
 */
import React, { Component } from 'react';
import DumbComponent from './DumbComponent';
import './list.less';

export default class SmartContainer extends Component {

  constructor() {
    super();

    // Set an initial empty state for the container here.
    this.state = {
      contacts: []
    };
  }

  componentDidMount() {
    const url = '/app/examples/components-vs-containers/contacts.json';

    // fetch your data here after the component has mounted
    fetch(url).then( response => response.json() ).then( json => this.setState({contacts: json.contacts}) );
  }

  render() {
    return <DumbComponent contacts={this.state.contacts} />;
  }

}