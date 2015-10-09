import React, { Component } from 'react';
import DumbComponent from './DumbComponent';
import './list.less';

export default class SmartContainer extends Component {

  constructor() {
    super();

    this.state = {
      contacts: []
    };
  }

  componentDidMount() {
    const url = '/app/examples/components-vs-containers/contacts.json';
    fetch(url).then( response => response.json() ).then( json => this.setState({contacts: json.contacts}) );
  }

  render() {
    return <DumbComponent contacts={this.state.contacts} />;
  }

}