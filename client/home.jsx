import React from 'react';
import PropTypes from 'prop-types';

import { LOBBY_VIEW } from './constants/views.js';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playerName: ''
    };
  }

  userJoin = () => {
    this.props.emitAction('clientUserJoin', { name: this.state.playerName });
    this.props.setView(LOBBY_VIEW);
  }

  updateInput = (e) => {
    this.setState({ playerName: e.target.value });
  }

  render() {
    return (
      <div className="home">
        <h1>Choose a Name:</h1>
        <input id="btnChooseName" type="text" onChange={this.updateInput} />
        <div className="type-1">
          <a className="btn btn-3" onClick={this.userJoin}>
            <span className="txt">Enter</span>
            <span className="round"><i className="fa fa-chevron-right" /></span>
          </a>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  emitAction: PropTypes.func.isRequired,
  setView: PropTypes.func.isRequired
};

export default Home;
