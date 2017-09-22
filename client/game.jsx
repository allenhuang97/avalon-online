import React from 'react';

import Board from './board.jsx';
import ButtonFrame from './buttonFrame.jsx';
import Character from './character.jsx';
import PlayerFrame from './playerFrame.jsx';

class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isPickQuest: true,
			isVoteQuest: true
		};
	}

	setPickQuest = (val) => {
		this.setState({isPickQuest: val});
	}

	setVoteQuest = (val) => {
		this.setState({isVoteQuest: val});
	}

	render() {
		return (
			<div id="game">
				<Board emit = {this.props.emit}/>
				<ButtonFrame emit = {this.props.emit} isPickQuest={this.state.isPickQuest} isPickVote={this.state.isPickVote} setPickQuest={this.setPickQuest} setVoteQuest={this.setVoteQuest} />
				<Character character={this.props.character}/>
				<PlayerFrame emit = {this.props.emit} players={this.props.players} isPickQuest={this.state.isPickQuest}/>
			</div>
		);
	}
}
export default Game;

