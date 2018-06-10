import React, { Component } from 'react';
import { Tag, Form, Input } from 'antd';
import ContactInput from './ContactInput';

const FormItem = Form.Item;

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      tags: ['business'],
      tag: '',
    };
  };

  handleUpdateName = name => {
    this.props.onUpdateName(name, this.props.index);
  }

  handleUpdateEmail = email => {
    this.props.onUpdateEmail(email, this.props.index);
  }

  handleAddTag = () => {
    let { tags, tag } = this.state;
    if (tag && tags.indexOf(tag) === -1) {
      tags = [...tags, tag];
    }
    this.setState({tags, tag: '' });
  }

  handleDeleteTag = (deletedTag) => {
    const tags = this.state.tags.filter(tag => tag !== deletedTag);
    this.setState({ tags });
  }

  render() {
    const { tags, tag } = this.state;
    return (
      <div>
        <Form layout="inline">
          <FormItem>
            <ContactInput value={this.props.name} onSave={this.handleUpdateName} />
          </FormItem>
          <FormItem>
            <ContactInput value={this.props.email} onSave={this.handleUpdateEmail} />
          </FormItem>
        </Form>
        {tags.map((tag, index) => {
          return (
            <Tag key={tag} closable={true} afterClose={() => this.handleDeleteTag(tag)}>{tag}</Tag>
          );
        })}
        <Input
          type="text"
          size="small"
          placeholder="ajouter tag"
          style={{ width: 100, height: 22, fontSize: 12 }}
          value={tag}
          onChange={(e) => this.setState({ tag: e.target.value })}
          onBlur={this.handleAddTag}
          onPressEnter={this.handleAddTag}
        />
      </div>
    )
  }
}

export default Contact;
