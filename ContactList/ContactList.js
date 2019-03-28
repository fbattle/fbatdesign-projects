// contacts is a const array here, but the data source could be anything.
// id : unique ID associated with the contact
// first : first name of contact
// last : last name of contact
const contacts = [
    {
      id: 1,
      first: 'Fred',
      last: 'Battle'
    },
    {
      id: 2,
      first: 'Marge',
      last: 'Simpson'
    },
    {
      id: 3,
      first: 'Homer',
      last: 'Simspon'
    },
    {
      id: 4,
      first: 'Bart',
      last: ''
    },

];


// Individual contacts.
class Contact extends React.Component {
  constructor (props) {
    super(props);
    this.setContact = this.setContact.bind(this);
  }

  setContact() {
    this.props.setContact(this.props.first, this.props.last, this.props.id);
  }

  render () {
    return(<div id="contact" className="contact" onClick={this.setContact}>
            <p>First Name {this.props.first}</p>
            <p> Last Name {this.props.last}</p>
          </div>);
  }
} // end Contact class

// Contact List Picker
class ContactList extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    let contactList = this.props.contactList;
    if (contactList) {
      contactList = contactList.map((contact) => { return(
        <Contact id={contact['id']} key={contact['id']}
            first={contact['first']} last={contact['last']}
            setContact={this.props.setContact}/>
        )}
      );
      return(<div id="picker" className="picker">
              {contactList}
            </div>);
    } else {
      return null;
    }
  }
} // end ContactList class


// Example app to launch the ContactList
class Sheet extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      initials: '',   // Contact's name initials
      first: '',      // Contact's first name
      last: '',       // Contact's last name
      id: 0,          // Unique ID for contact
      contactsList: ''    // List of contacts to create
    };
    this.contactLaunch = this.contactLaunch.bind(this);
    this.setContact = this.setContact.bind(this);
  }

  contactLaunch() {
      this.setState({
        contactsList: contacts
      });
  }

  setContact(first, last, id) {
    let initials = first ? first[0] : '';
    initials += last ? last[0] : '';
    this.setState({
      initials: initials,
      first: first ? first : '',
      last: last ? last : '',
      id: id,
      contactsList: ''
    });
  }

  render () {
    return(<div id="sheet" className="sheet">
            <div id="current_contact" className="contact">
              <div id="initials" className="initials">
                <p>{this.state.initials}</p>
              </div>
              <div id="name" className="name">
                <p id="first_name">{this.state.first}</p>
                <p id="last_name">{this.state.last}</p>
              </div>
              <button id="launch" onClick={this.contactLaunch}>
                Show Contacts
              </button>
            </div>

            <div id="list_container">
              <ContactList contactList={this.state.contactsList}
                  setContact={this.setContact}/>
            </div>
    </div>);
  }
} // end Sheet class

ReactDOM.render(<Sheet/>,
                document.getElementById('app'));
