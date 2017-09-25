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
      isVoteQuest: true,
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
        <Board emit={this.props.emit} />
        <ButtonFrame
          emit={this.props.emit}
          isPickQuest={this.state.isPickQuest}
          isVoteQuest={this.state.isVoteQuest}
          setPickVoteQuest={this.setPickVoteQuest}
          voteCount={this.props.voteCount}
          voteComplete={this.props.voteComplete}
        />
        <Character character={this.props.character} />
        <PlayerFrame
          emit={this.props.emit}
          players={this.props.players}
          isPickQuest={this.state.isPickQuest}
        />
      </div>
    );
  }
}

Game.propTypes = {
  emit: PropTypes.func.isRequired,
  character: PropTypes.object.isRequired,
  players: PropTypes.array.isRequired,
  voteComplete: PropTypes.bool.isRequired,
  voteCount: PropTypes.array.isRequired
};

export default Game;
