import React from 'react';
import PropTypes from 'prop-types';

import { emitAction, questPlayersUpdated } from 'sockets.js';
import { UPDATE_QUEST_PLAYERS } from 'constants/clientEvents.js';

class Player extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      picked: false
    };

    this.subscribeToSocketEvents();
  }

  pickPlayer = () => {
    if (this.props.pickingQuest) {
      emitAction(UPDATE_QUEST_PLAYERS, this.props.index);
    }
  }

  subscribeToSocketEvents = () => {
    questPlayersUpdated((playersOnQuest) => {
      playersOnQuest.forEach((player) => {
        if (player.index === this.props.index) {
          this.setState({ picked: true });
        }
      });
    });
  }

  render() {
    const widthPercent = `${(100 / this.props.numPlayers).toString()}%`;
    const className = this.state.picked ? 'playerUnselected' : 'playerSelected';

    return (
      <div id="player" className={className} style={{ width: widthPercent }}>
        <a onClick={this.pickPlayer}>
          <img src="assets/portrait.png" alt="" />
        </a>
        <a onClick={this.pickPlayer}>
          {this.props.playerName}
        </a>
      </div>
    );
  }
}

Player.propTypes = {
  pickingQuest: PropTypes.bool.isRequired,
  numPlayers: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  playerName: PropTypes.string.isRequired
};

export default Player;
