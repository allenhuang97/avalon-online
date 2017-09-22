import React from 'react';
import ReactDOM from 'react-dom';

import Home from './home.jsx';
import Lobby from './lobby.jsx';
import Game from './game.jsx';

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

    emit = (client, data) => {
        socket.emit(client,data);
    }

    render() {
        socket.on('update', (data) => {
            this.setState({players: Object.keys(data.users).map((t) => { return data.users[t].name })});
        });
        socket.on('get_character', (data) => {
            this.setState({character: data});
            this.setStateNum(2);
        });
         socket.on('game_update', function (data) {

        });
        if(this.state.num === 0) {
        	return (
        		<Home setStateNum={this.setStateNum} emit={this.emit}/>
        	);
		}
        else if(this.state.num === 1) {
            return (
               <Lobby setStateNum={this.setStateNum} emit={this.emit} players={this.state.players}/>
            );
        }
        else if(this.state.num === 2){
            return (
                <Game setStateNum={this.setStateNum} emit={this.emit} character={this.state.character} players={this.state.players}/>
            );
        }
	}
}
ReactDOM.render(<Container/>, document.getElementById('app'));