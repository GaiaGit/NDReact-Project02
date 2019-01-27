import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Tab,Divider,Segment,Header,Button,Image } from 'semantic-ui-react';

class Dashboard extends Component {

  render(){

    const {questions,answeredQuestions,unansweredQuestions,users} = this.props;

    const loadQuestions = (q,type) => (
       q.length > 0 ?
        q.map( id =>
          <div className="question-block" key={id}>
            <Header as='h5' attached='top'>
              <Image src={users[questions[id].author].avatarURL} avatar className="mini-avatar" />
              {users[questions[id].author].name} asks:
            </Header>
            <Segment attached className="question-display">
              <div className="dashboard-avatar">
                <Image src={users[questions[id].author].avatarURL} circular />
              </div>
              <div className="dashboard-options-block">
                {questions[id].optionOne.text}
                <Divider horizontal>OR</Divider>
                {questions[id].optionTwo.text}
                <Divider section />
                {
                  type === "unanswered"
                  ? <Button color="teal" as={Link} to={'/questions/' + id}>VOTE</Button>
                  : <Button color="teal" as={Link} to={'/questions/' + id}>VIEW POLL</Button>
                }
              </div>
            </Segment>
          </div>
        )
      : <div align="center">No results.</div>
    );

    const panes = [
      {menuItem: 'Unanswered', render: () => <Tab.Pane>{loadQuestions(unansweredQuestions,"unanswered")}</Tab.Pane>},
      {menuItem: 'Answered', render: () => <Tab.Pane>{loadQuestions(answeredQuestions,"answered")}</Tab.Pane>}
    ];

    return(
      <div className="dashboard-container">
        <Tab panes={panes} className="dashboard-tab-container" />
      </div>
    )
  }
}

function mapStateToProps({authedUser,questions,answeredQuestions,unansweredQuestions,users}){
  return {
    authedUser,
    questions,
    answeredQuestions: Object.keys(users[authedUser].answers).sort((a,b) => questions[b].timestamp - questions[a].timestamp),
    unansweredQuestions: Object.keys(questions).filter( question => Object.keys(users[authedUser].answers).indexOf(question) === -1 ).sort((a,b) => questions[b].timestamp - questions[a].timestamp),
    users
  }
}

export default connect(mapStateToProps)(Dashboard);
