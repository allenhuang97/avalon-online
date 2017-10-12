import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import { emitAction } from 'sockets.js';
import { START_GAME } from 'constants/clientEvents.js';

class Lobby extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showPlayerRequirementModal: false
    };
  }

  gameStart = () => {
    if (this.props.players.length >= 5) {
      emitAction(START_GAME, null);
    } else {
      this.toggleModal();
    }
  }

  toggleModal = () => {
    this.setState({ showPlayerRequirementModal: !this.state.showPlayerRequirementModal });
  }

  render() {
    return (
      <section className="lobby">
        <h2>Players In Lobby:</h2>
        <ul className="lobby-player-list">
            {this.props.players.map((player, i) =>
              (
              <li className="lobby-player">{player}</li>
              )
            )}
        </ul>
        <button className="btn-primary" onClick={this.gameStart}>Enter</button>
        <Modal
          isOpen={this.state.showPlayerRequirementModal}
          contentLabel="Not enough players"
          className={{
            base: 'modal',
            afterOpen: 'modal-open'
          }}
        >
          <h5>Not enough players, 5 is the minimum</h5>
          <button type="button" onClick={this.toggleModal}>Ok</button>
        </Modal>
      </section>
    );
  }
}

Lobby.propTypes = {
  players: PropTypes.array.isRequired
};

export default Lobby;
