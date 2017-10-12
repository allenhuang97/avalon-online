import React from 'react';
import PropTypes from 'prop-types';

import Board from './board.jsx';
import ButtonFrame from './buttonFrame.jsx';
import Character from './character.jsx';
import PlayerFrame from './playerFrame.jsx';

import {
  gameSetupComplete,
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
      questNum: 1,
      questResults: [],
      questPicker: {},
      character: { character: '', special: { description: '', chars: [] } }
    };

    this.subscribeToSocketEvents();
  }

  subscribeToSocketEvents = () => {
    gameSetupComplete((data) => {
      console.log('assigning characters and quest picker', data);
      this.setState({
        character: data,
        questPicker: null // Replace with actual
      });
    });

    questPlayersUpdated((data) => {
      this.setState({ currentQuestPlayers: data });
    });

    voteStarted(() => {
      this.setState({
        votingQuest: true,
        pickingQuest: false
      });
    });

    voteFinished((data) => {
      this.setState({
        playerVotes: { accept: data.voteCount[0], reject: data.voteCount[1] },
        voteComplete: true,
        onQuest: data.voteCount[0] > data.voteCount[1]
      });
    });

    questFinished((data) => {
      this.setState({
        pickingQuest: true,
        votingQuest: false,
        questResults: this.state.questResults + data,
        questPicker: null // Replace with actual data
      });
    });
  }

  // TODO: add modals for voting, questing, and showing results
  // Setup toggling of the modals based on game state
  render() {
    return (
      <div id="game">
        <Board />
        <ButtonFrame
          pickingQuest={this.state.pickingQuest}
          votingQuest={this.state.votingQuest}
          playerVotes={this.state.playerVotes}
          voteComplete={this.state.voteComplete}
        />
        <Character character={this.state.character} />
        <PlayerFrame
          players={this.props.players}
          pickingQuest={this.state.pickingQuest}
        />
      </div>
    );
  }
}

Game.propTypes = {
  players: PropTypes.array.isRequired
};

export default Game;
