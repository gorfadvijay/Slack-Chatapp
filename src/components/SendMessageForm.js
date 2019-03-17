import React from 'react';

class SendMessageForm extends React.Component {
  state = {
    message: []
  };
  handleChange = e => {
    this.setState({
      message: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state.message);
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit} className="send-message-form">
        <input
          onChange={this.handleChange}
          placeholder="Type Your Message and hit enter"
          type="text"
        />
      </form>
    );
  }
}

export default SendMessageForm;
