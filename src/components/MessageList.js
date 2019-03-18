import React from 'react';
import reactDOM from 'react-dom';
import Message from './Message';

class MessageList extends React.Component {
  componentDidUpdate() {
    const node = ReactDOM;
  }
  render() {
    return (
      <div className="message-list">
        {this.props.messages.map((message, index) => {
          return (
            <Message
              key={index}
              username={message.senderId}
              text={message.text}
            />
          );
        })}
      </div>
    );
  }
}

export default MessageList;
