import React from 'react';
import PropTypes from 'prop-types';

import {
  SUBMIT_VOTE,
  SUBMIT_QUEST_SELECTION
} from 'constants/clientEvents.js';

import { emitAction } from 'sockets.js';

class ButtonFrame extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  submitQuestPick = () => {
    // If not the correct number of players are chosen, show modal
    emitAction(SUBMIT_QUEST_SELECTION, null);
  }

  submitVote = (vote) => {
    emitAction(SUBMIT_VOTE, { vote });
  }

  render() {
    let buttonFrame;

    if (this.props.pickingQuest) {
      buttonFrame = (
        <div id="buttonFrame">
          <h3>Choose Quest</h3>
          <button id="btnSubmitQuest" onClick={this.submitQuestPick}>Submit Selection</button>
        </div>
      );
    } else if (this.props.votingQuest) {
      buttonFrame = (
        <div id="buttonFrame">
          <h3>Vote</h3>
          <button id="btnApprove" onClick={this.submitVote(1)}>Approve</button>
          <button id="btnReject" onClick={this.submitVote(0)}>Reject</button>
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
  pickingQuest: PropTypes.bool.isRequired,
  votingQuest: PropTypes.bool.isRequired,
  voteComplete: PropTypes.bool.isRequired,
  playerVotes: PropTypes.object.isRequired
};

export default ButtonFrame;
