import React from 'react';
import ReactDOM from 'react-dom';

import Home from './home.jsx';
import Lobby from './lobby.jsx';

var socket = io();

class Container extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            num: 0,
            players: [],
            character: {}
        }
    }
    
    setStateNum = (newStateNum) => {
    	this.setState({num: newStateNum});
    }

    render() {
        socket.on('update', (data) => {
            this.setState({players: Object.keys(data.users).map((t) => { return data.users[t].name })});
            console.log("players: ", this.state.players);
        });
        socket.on('get_character', (data) => {
            this.setState({character: data});
        });
        if(this.state.num === 0) {
        	return (
        		<Home setStateNum={this.setStateNum}/>
        	);
		}
        else if(this.state.num === 1) {
            return (
               <Lobby setStateNum={this.setStateNum} players={this.state.players}/>
            );
        }
        else if(this.state.num === 2){
            return (
                <div></div>
            );
        }
	}
}
ReactDOM.render(<Container/>, document.getElementById('app'));