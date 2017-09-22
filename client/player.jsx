import React from 'react';

class Player extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			picked: false,
		};
	}
	pickPlayer = () =>  {
		if(picked === false){
			this.setState({picked: true});
		}
		else{
			this.setState({picked: false});
		}
	}

	render() {
		/*var styleImg = 'dashed black';
		var styleP = 'black';
		if(picked === true){
			styleImg = 'solid lime';
			styleP = 'lime';
		}*/
		var widthPercent = (100/this.props.playerNum).toString() + "%";
		return (
			<div id="player" style={{width: widthPercent}}>
				<a onClick={() => {this.pickPlayer()}}>
					<img src="assets/portrait.png"/>
					<p>{this.props.playerName}</p>
				</a>
			</div>
		);
	}
}
export default Player;

