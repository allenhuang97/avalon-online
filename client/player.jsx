import React from 'react';

class Player extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		var widthPercent = (100/this.props.playerNum).toString() + "%";
		console.log(this.props.playerName);
		return (
			<div id="player" style={{width: widthPercent}}>
				<img src="assets/portrait.png"/>
				<p>{this.props.playerName}</p>
			</div>
		);
	}
}
export default Player;

