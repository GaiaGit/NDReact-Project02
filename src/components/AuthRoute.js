import React,{Component} from 'react';
import { connect } from 'react-redux';
import { Redirect,Route } from 'react-router-dom';

class AuthRoute extends Component {

  render() {

    return (
      <div>
        {
          this.props.isLoading === true
          ? <Redirect to={{ pathname: '/login', state: { from: this.props.location } }} />
          : <Route {...this.props} />
        }
      </div>
    )
  }
}

function mapStateToProps({authedUser}) {
  return {
    isLoading: authedUser === null,
  }
}

export default connect(mapStateToProps)(AuthRoute);
