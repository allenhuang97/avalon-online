import React from 'react';

var socket = io();

class Lobby extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	gameStart = () => {
		if(this.props.players.length >= 5) {
    	socket.emit('start');
    	this.props.setStateNum(2);
    	}
    	else{
    		alert("You Must Have 5 or More Players to Start a Game");
    	}
    }

	render() {
		return (
			<div id="lobby">
		    	<h2>Players In Lobby:</h2>
		    	<table>
	    			{this.props.players.map((player, i) => 
	    				<tr key={i}>
	    					<td key={i}>{player}</td>
	    				</tr>
	    			)}
		    	</table>
		      <div className="type-1">
	        		<a className="btn btn-3" onClick={this.gameStart}>
	          			<span className="txt">Start</span>
	          			<span className="round"><i className="fa fa-chevron-right"></i></span>
	        		</a>
	      		</div>
			</div>
		);
	}
}
export default Lobby;

