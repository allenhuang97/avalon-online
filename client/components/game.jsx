import React from 'react';
import PropTypes from 'prop-types';

import Board from './board.jsx';
import ButtonFrame from './buttonFrame.jsx';
import Character from './character.jsx';
import PlayerFrame from './playerFrame.jsx';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pickingQuest: true,
      votingQuest: false
    };
  }

  setPickVoteQuest = (pick, vote) => {
    this.setState({
      pickingQuest: pick,
      votingQuest: vote
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
          playerVotes={this.props.playerVotes}
          voteComplete={this.props.voteComplete}
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
  character: PropTypes.object.isRequired,
  players: PropTypes.array.isRequired,
  voteComplete: PropTypes.bool.isRequired,
  playerVotes: PropTypes.object.isRequired
};

export default Game;
