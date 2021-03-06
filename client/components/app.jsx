import React from 'react';

import LandingPage from './landingPage.jsx';
import Lobby from './lobby.jsx';
import Game from './game.jsx';

import { LANDING_PAGE, LOBBY, GAME } from 'constants/views.js';
import { lobbyUpdated, gameStarted } from 'sockets.js';

import 'stylesheets/main.scss';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      view: LANDING_PAGE,
      players: [],
    };

    this.subscribeToSocketEvents();
  }

  setView = (newView) => {
    this.setState({ view: newView });
  }

  subscribeToSocketEvents = () => {
    lobbyUpdated((data) => {
      this.setState({ players: Object.keys(data.users).map(t => data.users[t].name) });
    });

    gameStarted(() => {
      this.setView(GAME);
    });
  }

  render() {
    let view;

    if (this.state.view === LANDING_PAGE) {
      view = (
        <LandingPage
          setView={this.setView}
          numPlayersInLobby={this.state.players.length}
        />
      );
    } else if (this.state.view === LOBBY) {
      view = (
        <Lobby players={this.state.players} />
      );
    } else if (this.state.view === GAME) {
      view = (
        <Game
          players={this.state.players}
        />
      );
    }

    return view;
  }
}

export default App;
