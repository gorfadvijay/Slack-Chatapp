import React from 'react';

class RoomList extends React.Component {
  render() {
    return (
      <div className="rooms-list">
        <h3> Room-List</h3>
        {this.props.rooms.map(room => {
          const active = this.props.roomId === room.id ? 'active' : '';
          return (
            <li key={room.id} className={'room ' + active}>
              <a onClick={() => this.props.subscribeToRoom(room.id)} href="#">
                {' '}
                #{room.name}
              </a>
            </li>
          );
        })}
      </div>
    );
  }
}

export default RoomList;
