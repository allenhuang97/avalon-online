import React from 'react';
import ReactDOM from 'react-dom';

import Home from './home.jsx';

class Container extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            num: 0
        }
    }
    
    setStateNum = (newStateNum) => {
    	this.setState({num: newStateNum});
    }

    render() {
        if(this.state.num === 0) {
        	return (
        		<Home setStateNum={this.setStateNum}/>
        	);
		}
        else if(this.state.num === 1) {
            return (
                <div></div>
            );
        }
	}
}
ReactDOM.render(<Container/>, document.getElementById('app'));