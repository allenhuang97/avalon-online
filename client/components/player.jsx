import React from 'react';
import PropTypes from 'prop-types';

class Player extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      picked: false
    };
  }

  pickPlayer = () => {
    if (this.props.pickingQuest) {
      this.setState({ picked: !this.state.picked });
      this.props.updateSelectedPlayers(this.props.index);
    }
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
  playerName: PropTypes.string.isRequired,
  updateSelectedPlayers: PropTypes.func.isRequired
};

export default Player;