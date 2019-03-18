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
    roomId: [],
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
    chatManager
      .connect()
      .then(currentUser => {
        this.currentUser = currentUser;
        this.getRooms();
      })
      .catch(err => console.log('error on joinabel roos', err));
  }
  getRooms = () => {
    this.currentUser.getJoinableRooms().then(joinableRooms => {
      this.setState({
        joinableRooms,
        joinedRooms: this.currentUser.rooms
      });
    });
  };
  subscribeToRoom = roomId => {
    this.setState({
      messages: []
    });
    this.currentUser
      .subscribeToRoom({
        roomId,
        hooks: {
          onNewMessage: message => {
            this.setState({
              messages: [...this.state.messages, message]
            });
          }
        }
      })
      .then(room => {
        this.setState({
          roomId
        });
        this.getRooms();
      })
      .catch(err => console.log('error on joinabel roos', err));
  };
  sendMessage = text => {
    this.currentUser.sendMessage({
      text,
      roomId: this.state.roomId
    });
  };

  render() {
    return (
      <div className="app">
        <RoomList
          roomId={this.state.roomId}
          subscribeToRoom={this.subscribeToRoom}
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
