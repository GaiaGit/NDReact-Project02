import React from 'react';
import { Header,Segment,Image } from 'semantic-ui-react';

export default function QuestionResults({question, authedUser, user}) {

  const selectedOption = question.optionOne.votes.indexOf(authedUser) !== -1 ? "optionOne" : "optionTwo";
  const unselectedOption = question.optionOne.votes.indexOf(authedUser) === -1 ? "optionOne" : "optionTwo";
  const selectedVotes = question[selectedOption].votes.length;
  const unselectedVotes = question[unselectedOption].votes.length;
  const totalVotes = selectedVotes+unselectedVotes;
  const calculatePercent = (opt, total=totalVotes) => Math.floor((opt * 100) / total);

  return (
    <div className="main-content">
      <div className="question-container">
        <Header as="h4" attached="top">
          <Image src={user.avatarURL} className="mini-avatar" avatar /> Asked by {user.name}
        </Header>
        <Segment attached>
          <div className="results-container">
          <div className="vote-author">
            <Image src={user.avatarURL} circular alt="Question Author" />
          </div>
          <div className="poll-pane">
            <div className="results-text">
              Results:
            </div>
            <div className="vote-pane featured-vote">
              <div className="progress-pane">
                <div className="option-text">
                  Would you rather {question[selectedOption].text} ?
                </div>
                <div className='ui progress teal'>
                  <div className='bar' style={{width: `${calculatePercent(selectedVotes)}%`}}>
                    <div className='progress progress-text'>{calculatePercent(selectedVotes)}%</div>
                  </div>
                  <div className="label">{selectedVotes} votes out of {totalVotes}</div>
                </div>
              </div>
              <span className="notify-badge">Your Vote</span>
            </div>
            <div className="vote-pane">
              <div className="progress-pane">
                <div className="option-text">
                  Would you rather {question[unselectedOption].text} ?
                </div>
                <div className='ui progress teal'>
                  <div className='bar' style={{width: `${calculatePercent(unselectedVotes)}%`}}>
                    <div className='progress progress-text'>{calculatePercent(unselectedVotes)}%</div>
                  </div>
                  <div className="label">{unselectedVotes} votes out of {totalVotes}</div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </Segment>
      </div>
    </div>
  )
}
