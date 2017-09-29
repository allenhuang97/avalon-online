import React from 'react';
import PropTypes from 'prop-types';

import Player from './player.jsx';

class PlayerFrame extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedPlayers: [] // Boolean array of players that are selected
    };
  }

  updateSelectedPlayers = (index) => {
    const selectedPlayers = this.state.selectedPlayers;

    selectedPlayers[index] = !selectedPlayers[index];
    this.setState({ selectedPlayers: selectedPlayers });

    // Emit action, change questPickPlayerClient to updateQuestPickSelection?
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
            isPickQuest={this.props.isPickQuest}
            updateSelectedPlayers={this.updateSelectedPlayers}
          />)
        )}
      </div>
    );
  }
}

PlayerFrame.propTypes = {
  isPickQuest: PropTypes.bool.isRequired,
  players: PropTypes.array.isRequired,
};

export default PlayerFrame;
