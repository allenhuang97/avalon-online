import React from 'react';
import io from 'socket.io-client';

import Home from './home.jsx';
import Lobby from './lobby.jsx';
import Game from './game.jsx';

import { HOME_VIEW, LOBBY_VIEW, GAME_VIEW } from './constants/views.js';

import './stylesheets/main.scss';

const socket = io();

class Container extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      view: HOME_VIEW,
      players: [],
      character: {},
      playerVotes: { accept: 0, reject: 0 },
      voteComplete: false,
    };
  }

  setView = (newView) => {
    this.setState({ view: newView });
  }

  emitAction = (client, data) => {
    socket.emit(client, data);
  }

  render() {
    socket.on('update', (data) => {
      this.setState({ players: Object.keys(data.users).map(t => data.users[t].name) });
    });

    socket.on('get_character', (assignedCharacter) => {
      this.setState({ character: assignedCharacter });
      this.setView(GAME_VIEW);
    });

    socket.on('game_update', (data) => {
      console.log(data);
    });

    socket.on('serverVoteEnd', (data) => {
      console.log(data.voteCount);
      this.setState({
        playerVotes: { accept: data.voteCount[0], reject: data.voteCount[1] },
        voteComplete: true
      });
    });

    let view;

    if (this.state.view === HOME_VIEW) {
      view = (
        <Home
          setView={this.setView}
          emitAction={this.emitAction}
        />
      );
    } else if (this.state.view === LOBBY_VIEW) {
      view = (
        <Lobby
          setView={this.setView}
          emitAction={this.emitAction}
          players={this.state.players}
        />
      );
    } else if (this.state.view === GAME_VIEW) {
      view = (
        <Game
          setView={this.setView}
          emitAction={this.emitAction}
          character={this.state.character}
          players={this.state.players}
          playerVotes={this.state.playerVotes}
          voteComplete={this.state.voteComplete}
        />
      );
    }

    return view;
  }
}

export default Container;
