import React from 'react';

class Lobby extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	gameStart = () => {
		if(this.props.players.length >= 5) {
	    	this.props.emit('start');
    	}
    	else{
    		alert("You must have at least 5 people to start a game.");
    	}
    }

	render() {
		return (
			<div id="lobby">
		    	<h2>Players In Lobby:</h2>
		    	<table>
		    		<tbody>
		    			{this.props.players.map((player, i) => 
		    				<tr key={i}>
		    					<td key={i}>{player}</td>
		    				</tr>
		    			)}
	    			</tbody>
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

