import React from 'react';

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: ""
		};
	}

	userJoin = () => {
    	this.props.emit('clientUserJoin', { name: this.state.name });
    	this.props.setStateNum(1);
    }

	render() {
		return (
			<div id="home">
				<h1>Choose a Name:</h1>
				<input id="btnChooseName" type="text" onChange={(e) => {this.setState({ name: e.target.value})}}/>
				<div className="type-1">
	        		<a className="btn btn-3" onClick={this.userJoin}>
	          			<span className="txt">Enter</span>
	          			<span className="round"><i className="fa fa-chevron-right"></i></span>
	        		</a>
	      		</div>
			</div>
		);
	}
}
export default Home;

