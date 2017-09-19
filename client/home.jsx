import React from 'react';

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			
		};
	}
	render() {
		return (
			<div id="pageState0_inner">
				<h1>Choose a Name:</h1>
				<input id="btnChooseName" type="text" ng-model="name"></input>
				<button>Enter</button>
			</div>
		);
	}
}
export default Home

