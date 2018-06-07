import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';
const FormItem = Form.Item;

class ContactList extends Component {
  constructor(props) {
    super(props);
    this.state = {edit: false};
  };

  handleUpdateName = (event, index) => {
    this.props.onUpdateName(event.target.value, index);
  }

  handleUpdateEmail = (event, index) => {
    this.props.onUpdateEmail(event.target.value, index);
  }

  handleDeleteContact = (event, index) => {
    event.preventDefault();
    this.props.onDeleteContact(index);
  }

  render() {
    let contacts = this.props.contacts.map((contact, index) => {
      return (
        <li key={index}>
          <Form layout="inline">
            <FormItem>
              <Input value={contact.name} onChange={(e) => this.handleUpdateName(e, index)} />
            </FormItem>
            <FormItem>
              <Input value={contact.email} onChange={(e) => this.handleUpdateEmail(e, index)} />
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit" onClick={(e) => this.handleDeleteContact(e, index)}>Delete</Button>
            </FormItem>
          </Form>
        </li>
      )
    })
    return (<ul>{contacts}</ul>)
  }
}

export default ContactList;
