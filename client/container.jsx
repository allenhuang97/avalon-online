import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';

import Home from './home.jsx';
import Lobby from './lobby.jsx';
import Game from './game.jsx';

const socket = io();

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 0,
      players: [],
      character: {},
      voteCount: [],
      voteComplete: false,
    };
  }

  setStateNum = (newStateNum) => {
    this.setState({ num: newStateNum });
  }

  emit = (client, data) => {
    socket.emit(client, data);
  }

  render() {
    socket.on('update', (data) => {
      this.setState({ players: Object.keys(data.users).map(t => data.users[t].name) });
    });

    socket.on('get_character', (data) => {
      this.setState({ character: data });
      this.setStateNum(2);
    });

    socket.on('game_update', (data) => {
      console.log(data);
    });

    socket.on('serverVoteEnd', (voteCount) => {
      console.log(voteCount.voteCount);
      this.setState({
        voteCount: voteCount.voteCount,
        voteComplete: true
      });
    });

    if (this.state.num === 0) {
      return (
        <Home
          setStateNum={this.setStateNum}
          emit={this.emit}
        />
      );
    } else if (this.state.num === 1) {
      return (
        <Lobby
          setStateNum={this.setStateNum}
          emit={this.emit}
          players={this.state.players}
        />
      );
    } else if (this.state.num === 2) {
      return (
        <Game
          setStateNum={this.setStateNum}
          emit={this.emit}
          character={this.state.character}
          players={this.state.players}
          voteCount={this.state.voteCount}
          voteComplete={this.state.voteComplete}
        />
      );
    }

    return (<div />);
  }
}

ReactDOM.render(<Container />, document.getElementById('app')); //eslint-disable-line
