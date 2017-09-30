import React from 'react';
import PropTypes from 'prop-types';

import Player from './player.jsx';

class PlayerFrame extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div id="playerFrame">
        {this.props.players.map((player, i) =>
          (<Player
            key={i}
            index={i}
            playerName={player}
            numPlayers={this.props.players.length}
            pickingQuest={this.props.pickingQuest}
          />)
        )}
      </div>
    );
  }
}

PlayerFrame.propTypes = {
  pickingQuest: PropTypes.bool.isRequired,
  players: PropTypes.array.isRequired,
};

export default PlayerFrame;
