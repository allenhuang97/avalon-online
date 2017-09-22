import React from 'react';

import Character from './character.jsx';
import PlayerFrame from './playerFrame.jsx';

class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div id="game">
				<Character character={this.props.character}/>
				<PlayerFrame players={this.props.players}/>
			</div>
		);
	}
}
export default Game;

