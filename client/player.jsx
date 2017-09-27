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
    if (this.props.isPickQuest) {
      this.setState({ picked: !this.state.picked });
    }
  }

  render() {
    const widthPercent = `${(100 / this.props.playerNum).toString()}%`;
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
  isPickQuest: PropTypes.bool.isRequired,
  playerNum: PropTypes.number.isRequired,
  playerName: PropTypes.string.isRequired
};

export default Player;
