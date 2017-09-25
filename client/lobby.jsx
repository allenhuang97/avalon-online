import React from 'react';
import PropTypes from 'prop-types';

class Lobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  gameStart = () => {
    if (this.props.players.length >= 5) {
      this.props.emit('start');
    } else {
      // Replace with modal
      console.log('Not enough players, 5 is the minimum');
    }
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
      </div>
    );
  }
}

Lobby.propTypes = {
  emit: PropTypes.func.isRequired,
  players: PropTypes.array.isRequired
};

export default Lobby;
