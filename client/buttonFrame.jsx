import React from 'react';

class ButtonFrame extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	submitQuestPick = () => {
		this.props.emit('clientSubmitQuestPick');
		this.props.setPickVoteQuest(false, true);
	}

	voteChoice = (choice) => {
        this.props.emit('clientVote', {choice: choice});
        this.props.setPickVoteQuest(false, false);
    }

	render() {
		if(this.props.isPickQuest) {
		return ( 
			<div id="buttonFrame">
				<h3>Choose Quest</h3>
				<button id="btnSubmitQuest" onClick={() => {this.submitQuestPick()}}>Choose Quest</button>
			</div>
			);
		}
		else if(this.props.isVoteQuest) { 
			return (
				<div id="buttonFrame">
					<h3>Vote</h3>
					<button id="btnApprove" onClick={() => {this.voteChoice(1)}}>Approve</button>
					<button id="btnReject" onClick={() => {this.voteChoice(0)}}>Reject</button>
				</div>
				);
		}
		else if(this.props.voteComplete) {
			var voteOutcomeValue = "";
			if(this.props.voteCount[0] < this.props.voteCount[1]){
				voteOutcomeValue = "The Quest Has Been Approved " + this.props.voteCount[1] + " to " + this.props.voteCount[0];
			}
			else{
				voteOutcomeValue = "The Quest Has Been Rejected " + this.props.voteCount[0] + " to " + this.props.voteCount[1];
			}
			console.log(voteOutcomeValue);
			return (
				<div id="buttonFrame">
					<h1>{voteOutcomeValue}</h1>
				</div>
				);
		}
		else{
			return(
				<div id="buttonFrame"></div>
				);
		}
	}
}
export default ButtonFrame;

