import React, { Component, PropTypes } from 'react';
import ObjectImage from './ObjectImage';
import TwitterLink from './TwitterLink';

export default class DumbComponent extends Component {

  // Set PropTypes for our component to make it obvious that it expects an array of contacts
  static propTypes = {
    contacts: PropTypes.array.isRequired
  }

  render() {
    const contacts = this.props.contacts;

    /**
     * (Almost) all of the markup for this component is below, just to make things easier to follow.
     * Ideally you'd want to break out "list-item" and "list-item-details" into their own components
     * to maximize reusability.
     */
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