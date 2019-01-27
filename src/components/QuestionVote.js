import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Header,Segment,Button,Form,Image,Divider } from 'semantic-ui-react';
import { handleSaveQuestionAnswer } from '../actions/questions';

class QuestionVote extends Component {

  state = {};

  selectOption = (ev, {value}) => this.setState({ value });

  saveAnswer = (ev) => {
    ev.preventDefault();
    const {dispatch,question,authedUser} = this.props;
    dispatch(handleSaveQuestionAnswer({
      authedUser: authedUser,
      qid: question,
      answer: this.state.value
    }));
  };

  render() {
    const {question, questions, users} = this.props;
    const {value} = this.state;

    return(
      <div className="vote-question-container wrapper">
        <div className="question-block">
          <Header as='h5' attached='top'>
            <Image src={users[questions[question].author].avatarURL} avatar className="mini-avatar" />
            {users[questions[question].author].name} asks:
          </Header>
          <Segment attached className="question-display">
            <div className="dashboard-avatar">
              <Image src={users[questions[question].author].avatarURL} circular />
            </div>
            <div className="dashboard-data">
              <Header as='h3' align="left">Would you rather...</Header>
              <Form.Group inline align="left">
                <Form.Radio value='optionOne' checked={value === 'optionOne'} onChange={this.selectOption} label={questions[question].optionOne.text} />
                <Divider horizontal>OR</Divider>
                <Form.Radio value='optionTwo' checked={value === 'optionTwo'} onChange={this.selectOption} label={questions[question].optionTwo.text} />
                <Button
                  color="teal"
                  as={Link}
                  to={'/questions/' + question}
                  onClick={this.saveAnswer}
                  disabled={ this.state.value == null }>
                  SUBMIT
                </Button>
              </Form.Group>
            </div>
          </Segment>
        </div>
      </div>
    )
  }
}

function mapStateToProps({authedUser, questions, users}, props){

  return {
    question: props.question,
    authedUser,
    questions,
    users
  }
}

export default connect(mapStateToProps)(QuestionVote);
