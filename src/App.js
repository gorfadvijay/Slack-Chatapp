import React from 'react';
import MessageList from './components/MessageList';
import SendMessageForm from './components/SendMessageForm';
import RoomList from './components/RoomList';
import NewRoomForm from './components/NewRoomForm';
import Chatkit from '@pusher/chatkit';
import { tokenUrl, instanceLocator } from './config';
// import Message from './components/Message';
class App extends React.Component {
  state = {
    messages: [],
    joinableRooms: [],
    joinedRooms: []
  };

  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator,
      userId: 'Baap',
      tokenProvider: new Chatkit.TokenProvider({
        url: tokenUrl
      })
    });
    chatManager.connect().then(currentUser => {
      this.currentUser = currentUser;
      this.currentUser
        .getJoinableRooms()
        .then(joinableRooms => {
          this.setState({
            joinableRooms,
            joinedRooms: this.currentUser.rooms
          });
        })
        .catch(err => console.log('error on joinabel roos', err));

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
    });
  }
  sendMessage = text => {
    this.currentUser.sendMessage({
      text,
      roomId: 19385890
    });
  };

  render() {
    return (
      <div className="app">
        <RoomList
          rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
        />
        <MessageList messages={this.state.messages} />
        <SendMessageForm sendMessage={this.sendMessage} />
        <NewRoomForm />
      </div>
    );
  }
}

export default App;
