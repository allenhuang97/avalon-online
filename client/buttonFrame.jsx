import React from 'react';

class ButtonFrame extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	submitQuestPick = () => {
		this.props.emit('clientSubmitQuestPick');
		this.props.setPickQuest(false);
	}

	render() {
		if(this.props.isPickQuest){
		return ( 
				<div id="buttonFrame">
					<h3>Choose Quest</h3>
					<button id="btnSubmitQuest" onClick={() => {this.submitQuestPick()}}>Choose Quest</button>
				</div>
			);
		}
		else{
			return (
				<div id="buttonFrame">
					<h3>Vote</h3>
					<button id="btnApprove">Approve</button>
					<button id="btnReject">Reject</button>
				</div>
				);
		}
	}
}
export default ButtonFrame;

