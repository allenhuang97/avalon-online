import React from 'react';
import PropTypes from 'prop-types';

class ButtonFrame extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  submitQuestPick = () => {
    this.props.emitAction('clientSubmitQuestPick');
    this.props.setPickVoteQuest(false, true);
  }

  voteChoice = (choice) => {
    this.props.emitAction('clientVote', { choice });
    this.props.setPickVoteQuest(false, false);
  }

  render() {
    let buttonFrame;

    if (this.props.isPickQuest) {
      buttonFrame = (
        <div id="buttonFrame">
          <h3>Choose Quest</h3>
          <button id="btnSubmitQuest" onClick={this.submitQuestPick}>Choose Quest</button>
        </div>
      );
    } else if (this.props.isVoteQuest) {
      buttonFrame = (
        <div id="buttonFrame">
          <h3>Vote</h3>
          <button id="btnApprove" onClick={this.voteChoice(1)}>Approve</button>
          <button id="btnReject" onClick={this.voteChoice(0)}>Reject</button>
        </div>
      );
    } else if (this.props.voteComplete) {
      const numRejections = this.props.playerVotes.reject;
      const numAccepts = this.props.playerVotes.accept;

      let voteOutcomeValue = '';

      if (numRejections < numAccepts) {
        voteOutcomeValue = `The Quest Has Been Approved ${numAccepts} to ${numRejections}`;
      } else {
        voteOutcomeValue = `The Quest Has Been Rejected ${numRejections} to ${numAccepts}`;
      }

      buttonFrame = (
        <div id="buttonFrame">
          <h1>{voteOutcomeValue}</h1>
        </div>
      );
    }

    return buttonFrame;
  }
}

ButtonFrame.propTypes = {
  emitAction: PropTypes.func.isRequired,
  setPickVoteQuest: PropTypes.func.isRequired,
  isPickQuest: PropTypes.bool.isRequired,
  isVoteQuest: PropTypes.bool.isRequired,
  voteComplete: PropTypes.bool.isRequired,
  playerVotes: PropTypes.object.isRequired
};

export default ButtonFrame;
