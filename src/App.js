import React from 'react';
import MessageList from './components/MessageList';
import SendMessageForm from './components/SendMessageForm';
import RoomList from './components/RoomList';
import NewRoomForm from './components/NewRoomForm';
import Chatkit from '@pusher/chatkit';
import { tokenUrl, instanceLocator } from './config';
// import Message from './components/Message';
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: []
    };
  }
  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator,
      userId: 'Baap',
      tokenProvider: new Chatkit.TokenProvider({
        url: tokenUrl
      })
    });
    chatManager
      .connect()
      .then(currentUser => {
        currentUser.subscribeToRoom({
          roomId: 19385890,
          hooks: {
            onNewMessage: message => {
              this.setState({
                messages: [...this.state.messages, message]
              });
            }
          }
        });
      })
      .catch(error => {
        console.error('error:', error);
      });
  }
  render() {
    return (
      <div className="app">
        <RoomList />
        <MessageList messages={this.state.messages} />
        <SendMessageForm />
        <NewRoomForm />
      </div>
    );
  }
}

export default App;
