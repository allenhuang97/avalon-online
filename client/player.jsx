import React from 'react';

class Player extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			picked: false,
		};
	}
	pickPlayer = () =>  {
		if(this.props.isPickQuest === true){
			this.setState({picked: !this.state.picked});
		}
	}

	render() {
		var widthPercent = (100/this.props.playerNum).toString() + "%";
		return (
			<div id="player" className={this.state.picked ? 'playerUnselected' : 'playerSelected'} style={{width: widthPercent}}>
				<img onClick={()=>{this.pickPlayer()}} src="assets/portrait.png"/>
				<p onClick={()=>{this.pickPlayer()}}>{this.props.playerName}</p>
			</div>
		);
	}
}
export default Player;

