import React, { Component,Fragment } from 'react';
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions';
import LoadingBar from 'react-redux-loading';
import AuthRoute from './AuthRoute';
import Navbar from './Navbar';
import Login from './Login';
import Dashboard from './Dashboard';
import QuestionAdd from './QuestionAdd';
import QuestionPage from './QuestionPage';
import UserRegister from './UserRegister';
import UserRank from './UserRank';
import NotFound from './NotFound';

import '../assets/css/App.css';

class App extends Component {

  componentDidMount () {
    const { dispatch, isLoading } = this.props;
    if (isLoading === true) {
      dispatch(handleInitialData());
    }
  }

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>
            <Navbar />
            <Switch>
              <Route path="/login" component={Login} exact />
              <Route path="/register" component={UserRegister} exact />
              <AuthRoute path="/" component={Dashboard} exact />
              <AuthRoute path="/questions/:question_id" component={QuestionPage} exact />
              <AuthRoute path="/add" component={QuestionAdd} exact />
              <AuthRoute path="/leaderboard" component={UserRank} exact />
              <Route component={NotFound}/>
            </Switch>
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    isLoading: authedUser === null
  }
}

export default connect(mapStateToProps)(App);
