import React, { Component } from 'react';
import { Input, Tag } from 'antd';

class ContactInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editable: false,
      value: this.props.value
    };
  };

  showInput = () => {
    this.setState({ editable: true }, () => this.input.focus());
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  }

  handleSave = (event) => {
    this.setState({ editable: false });
    this.props.onSave(this.state.value);
  }

  saveInputRef = input => this.input = input

  render() {
    const { editable } = this.state;
    return (
      <div>
        {editable && (
          <Input
            ref={this.saveInputRef}
            type="text"
            style={{ width: 150, height: 28, lineHeight: '28px', margin: 0, padding: '2px 7px', border: 'none', fontWeight: 500, fontSize: 14 }}
            value={this.state.value}
            onChange={this.handleChange}
            onBlur={this.handleSave}
            onPressEnter={this.handleSave}
          />
        )}
        {!editable && (
          <Tag
            onClick={this.showInput}
            style={{ width: 150, height: 28, lineHeight: '28px', margin: 0, padding: '2px 7px', border: 'none', fontWeight: 500, fontSize: 14, background: '#f0f2f5' }}
          >
            {this.props.value}
          </Tag>
        )}
      </div>
    )
  }
}

export default ContactInput;
