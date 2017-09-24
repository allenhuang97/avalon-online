import React from 'react';

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
				<Player key={i} playerName={player} playerNum={this.props.players.length} isPickQuest={this.props.isPickQuest}/>
			)}
			</div>
		);
	}
}
export default PlayerFrame;

