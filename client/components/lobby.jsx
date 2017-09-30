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
      <div id="lobby">
        <h2>Players In Lobby:</h2>
        <table>
          <tbody>
            {this.props.players.map((player, i) =>
              (
                <tr key={i}>
                  <td>{player}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
        <div className="type-1">
          <a className="btn btn-3" onClick={this.gameStart}>
            <span className="txt">Start</span>
            <span className="round"><i className="fa fa-chevron-right" /></span>
          </a>
        </div>
        <Modal
          isOpen={this.state.showPlayerRequirementModal}
          contentLabel="Not enough players"
        >
          <h5>Not enough players, 5 is the minimum</h5>
          <button type="button" onClick={this.toggleModal}>Ok</button>
        </Modal>
      </div>
    );
  }
}

Lobby.propTypes = {
  players: PropTypes.array.isRequired
};

export default Lobby;
