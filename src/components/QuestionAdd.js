import React,{ Component } from 'react';
import { Header,Segment,Input,Divider,Button,Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { handleSaveQuestion } from '../actions/questions';

class QuestionAdd extends Component {

  state = {
    optionOneText: '',
    optionTwoText: ''
  };

  handleOption = (ev) => {
    let text = ev.target;
    this.setState({[text.name]: text.value});
  }

  addNewQuestion = (ev) => {
    ev.preventDefault();
    const {dispatch,authedUser} = this.props;
    const {optionOneText,optionTwoText} = this.state;
    dispatch(handleSaveQuestion({
      optionOneText: optionOneText,
      optionTwoText: optionTwoText,
      author: authedUser})
    ).then(() => this.props.history.push('/'));
  }

  render(){
    const {optionOneText, optionTwoText} = this.state;

    return(
      <div className="new-question-container">
        <div className="form-container">
          <Header as='h2' align="center" attached='top'>
            Create New Question
          </Header>
          <Segment attached align="center">
            <Input name="optionOneText" placeholder='Enter Option One Text Here' onChange={this.handleOption} />
            <Divider horizontal>OR</Divider>
            <Input name="optionTwoText" placeholder='Enter Option Two Text Here' onChange={this.handleOption} />
            <Container>
              <Button
                color="teal"
                className="submit-button"
                onClick={this.addNewQuestion}
                disabled={optionOneText === '' || optionTwoText === ''}>
                Submit
              </Button>
            </Container>
          </Segment>
        </div>
      </div>
    )
  }
}

function mapStateToProps({authedUser}) {
  return { authedUser };
}

export default connect(mapStateToProps)(QuestionAdd);
