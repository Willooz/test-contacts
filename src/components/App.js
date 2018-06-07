import React, { Component } from 'react';
import update from 'immutability-helper';
import { Layout, Form, Icon, Input, Button, List } from 'antd';

import '../styles/App.css';

const { Header, Footer, Content } = Layout;
const FormItem = Form.Item;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      contacts: [],
      tags: []
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let contact = {
      name: this.state.name,
      email: this.state.email
    }
    this.setState({
      name: '',
      email: '',
      contacts: [...this.state.contacts, contact]
    });
  }

  handleUpdateName = (name, index) => {
    const contacts = update(this.state.contacts, { [index]: { name: { $set: name.target.value } } });
    this.setState({ contacts: contacts });
  }

  handleUpdateEmail = (email, index) => {
    const contacts = update(this.state.contacts, { [index]: { email: { $set: email } } });
    this.setState({ contacts: contacts });
  }

  handleDeleteContact = (index) => {
    const contacts = update(this.state.contacts, { $splice: [[index, 1]] });
    this.setState({ contacts: contacts });
  }

  render() {
    return (
      <Layout>
        <Header>
          <h1 className="App-title">Contacts</h1>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <h2 style={{ padding: '50PX 0 0 0' }}>Nouveau contact</h2>
          <Form layout="inline" onSubmit={this.handleSubmit}>
            <FormItem>
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Name" name="name" value={this.state.name} onChange={this.handleChange} />
            </FormItem>
            <FormItem>
              <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" name="email" value={this.state.email} onChange={this.handleChange} />
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit">Ajouter</Button>
            </FormItem>
          </Form>
          <h2 style={{ padding: '50PX 0 0 0' }}>Contacts</h2>
          <List
            size="large"
            bordered
            dataSource={this.state.contacts}
            locale={{emptyText: 'Aucun contact'}}
            renderItem={(item, index) => (<List.Item>
              <Form layout="inline">
                <FormItem>
                  <Input value={item.name} onChange={(e) => this.handleUpdateName(e, index)} />
                </FormItem>
                <FormItem>
                  <Input value={item.email} onChange={(e) => this.handleUpdateEmail(e, index)} />
                </FormItem>
                <FormItem>
                  <Button type="danger" htmlType="submit" onClick={(e) => this.handleDeleteContact(e, index)}>Supprimer</Button>
                </FormItem>
              </Form>
            </List.Item>)}
          />
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    );
  }
}

export default App;

          // <ContactList
          //   contacts={this.state.contacts}
          //   onUpdateName={this.handleUpdateName}
          //   onUpdateEmail={this.handleUpdateEmail}
          //   onDeleteContact={this.handleDeleteContact}/>
