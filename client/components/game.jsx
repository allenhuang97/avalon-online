import React from 'react';
import PropTypes from 'prop-types';

import Board from './board.jsx';
import ButtonFrame from './buttonFrame.jsx';
import Character from './character.jsx';
import PlayerFrame from './playerFrame.jsx';

import {
  questPlayersUpdated,
  voteStarted,
  voteFinished,
  questFinished
} from 'sockets.js';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pickingQuest: true,
      votingQuest: false,
      onQuest: false,
      currentQuestPlayers: [],
      playerVotes: { accept: 0, reject: 0 },
      voteComplete: false,
      questNum: 0,
      questResults: []
    };

    this.subscribeToSocketEvents();
  }

  subscribeToSocketEvents = () => {
    questPlayersUpdated((data) => {
      this.setState({ currentQuestPlayers: data });
    });

    voteStarted(() => {
      this.setState({ votingQuest: true });
    });

    voteFinished((data) => {
      this.setState({
        playerVotes: { accept: data.voteCount[0], reject: data.voteCount[1] },
        voteComplete: true,
        onQuest: data.voteCount[0] > data.voteCount[1]
      });
    });

    questFinished(() => {
      this.setState({
        pickingQuest: true,
        votingQuest: false
      });
    });
  }

  render() {
    return (
      <div id="game">
        <Board />
        <ButtonFrame
          pickingQuest={this.state.pickingQuest}
          votingQuest={this.state.votingQuest}
          setPickVoteQuest={this.setPickVoteQuest}
          playerVotes={this.state.playerVotes}
          voteComplete={this.state.voteComplete}
        />
        <Character character={this.props.character} />
        <PlayerFrame
          players={this.props.players}
          pickingQuest={this.state.pickingQuest}
        />
      </div>
    );
  }
}

Game.propTypes = {
  players: PropTypes.array.isRequired,
  character: PropTypes.object.isRequired
};

export default Game;
