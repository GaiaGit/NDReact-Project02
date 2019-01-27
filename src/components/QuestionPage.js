import React,{ Component } from 'react';
import { connect } from 'react-redux';

import QuestionResults from './QuestionResults';
import QuestionVote from './QuestionVote';

class QuestionPage extends Component {
  render() {
    const {authedUser, question, showResults, questions, users} = this.props;
    return (
      <div>
        {
          showResults === false
          ? <QuestionVote question={question} />
          : <QuestionResults question={questions[question]} authedUser={authedUser} user={users[authedUser]} />
        }
      </div>
    )
  }
}

function mapStateToProps({authedUser, questions, users}, props) {

  const { question_id } = props.match.params;

  return {
    authedUser,
    users,
    questions,
    question: question_id,
    showResults: Object.keys(users[authedUser].answers).indexOf(question_id) !== -1
  };
}

export default connect(mapStateToProps)(QuestionPage);
