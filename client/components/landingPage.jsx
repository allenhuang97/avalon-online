import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import { LOBBY } from 'constants/views.js';
import { emitAction } from 'sockets.js';
import { USER_JOIN } from 'constants/clientEvents.js';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playerName: '',
      showMaxPlayerModal: false,
      showEmptyNameModal: false
    };
  }

  userJoin = () => {
    if (this.state.playerName !== '') {
      if (this.props.numPlayersInLobby >= 10) {
        this.toggleMaxPlayerModal();
      } else {
        emitAction(USER_JOIN, { name: this.state.playerName });
        this.props.setView(LOBBY);
      }
    } else {
      this.toggleEmptyNameModal();
    }
  }

  updateInput = (e) => {
    this.setState({ playerName: e.target.value });
  }

  toggleEmptyNameModal = () => {
    this.setState({ showEmptyNameModal: !this.state.showEmptyNameModal });
  }

  toggleMaxPlayerModal = () => {
    this.setState({ showMaxPlayerModal: !this.state.showMaxPlayerModal });
  }

  render() {
    return (
      <div className="landing">
        <div className="landing-form">
          <h1>Welcome to Avalon online</h1>
          <p className="landing-form-label">Enter a name to join the room</p>
          <input
            className="input-name"
            type="text"
            placeholder="nickname"
            onChange={this.updateInput}
          />
          <button className="btn-primary" onClick={this.userJoin}>Enter</button>
        </div>
        <Modal
          isOpen={this.state.showMaxPlayerModal}
          contentLabel="Too many people"
          className={{
            base: 'modal',
            afterOpen: 'modal-open'
          }}
        >
          <h5>This room is already full. Please wait for someone to leave.</h5>
          <button type="button" onClick={this.toggleMaxPlayerModal}>Ok</button>
        </Modal>
        <Modal
          isOpen={this.state.showEmptyNameModal}
          contentLabel="Empty name"
          className={{
            base: 'modal',
            afterOpen: 'modal-open'
          }}
        >
          <h5>You must enter a name.</h5>
          <button type="button" onClick={this.toggleEmptyNameModal}>Ok</button>
        </Modal>
      </div>
    );
  }
}

LandingPage.propTypes = {
  setView: PropTypes.func.isRequired,
  numPlayersInLobby: PropTypes.number.isRequired
};

export default LandingPage;
