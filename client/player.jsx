import React from 'react';

class Player extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			picked: false,
		};
	}
	pickPlayer = () =>  {
		this.setState({picked: !this.state.picked});
	}

	render() {
		var widthPercent = (100/this.props.playerNum).toString() + "%";
		return (
			<div id="player" style={{width: widthPercent}}>
				<a className={this.state.picked ? 'playerUnselected' : 'playerSelected'} onClick={()=>{this.pickPlayer()}}>
					<img src="assets/portrait.png"/>
					<p>{this.props.playerName}</p>
				</a>
			</div>
		);
	}
}
export default Player;

