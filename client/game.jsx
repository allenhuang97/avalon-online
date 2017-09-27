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
      isPickQuest: true,
      isVoteQuest: false
    };
  }

  setPickVoteQuest = (pick, vote) => {
    this.setState({
      isPickQuest: pick,
      isVoteQuest: vote
    });
  }

  render() {
    return (
      <div id="game">
        <Board emitAction={this.props.emitAction} />
        <ButtonFrame
          emitAction={this.props.emitAction}
          isPickQuest={this.state.isPickQuest}
          isVoteQuest={this.state.isVoteQuest}
          setPickVoteQuest={this.setPickVoteQuest}
          playerVotes={this.props.playerVotes}
          voteComplete={this.props.voteComplete}
        />
        <Character character={this.props.character} />
        <PlayerFrame
          emitAction={this.props.emitAction}
          players={this.props.players}
          isPickQuest={this.state.isPickQuest}
        />
      </div>
    );
  }
}

Game.propTypes = {
  emitAction: PropTypes.func.isRequired,
  character: PropTypes.object.isRequired,
  players: PropTypes.array.isRequired,
  voteComplete: PropTypes.bool.isRequired,
  playerVotes: PropTypes.object.isRequired
};

export default Game;
