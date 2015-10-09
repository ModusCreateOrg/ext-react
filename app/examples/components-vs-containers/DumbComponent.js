import React, { Component, PropTypes } from 'react';
import ObjectImage from './ObjectImage';
import TwitterLink from './TwitterLink';

export default class DumbComponent extends Component {
  static propTypes = {
    contacts: PropTypes.array.isRequired
  }

  render() {
    const contacts = this.props.contacts;

    return (
      <div className="list">
        {contacts.map(contact =>
          <div className="list-item" key={contact.id}>
            <ObjectImage image={contact.image} name={contact.name} />
            <span className="list-item-details">
              <h1>{contact.name}</h1>
              <h2><TwitterLink handle={contact.twitter} /></h2>
            </span>
          </div>
        )}
      </div>
    );
  }
}