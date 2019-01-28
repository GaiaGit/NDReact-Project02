import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';
import { Dropdown,Card,Image } from 'semantic-ui-react';
import wyrimg from '../assets/login.svg';
import { Redirect } from 'react-router-dom'

class Login extends Component {

  state = {
    authorized: false
  }

  selectUser = (ev,id) => {
    const {dispatch} = this.props;
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    ev.preventDefault();
    dispatch(setAuthedUser(id));
    this.setState(() => ({ authorized: true }))
  }

  render() {
    const { users, usersIds } = this.props;
    const { from } = this.props.location.state || {from: {pathname: '/'}}
    const { authorized } = this.state

    if (authorized) {
      return <Redirect to={from}/>
    }

    return(
      <div className="login-container">
        <Card>
          <Card.Content>
            <Card.Meta>
              <span className='date'>Welcome to</span>
            </Card.Meta>
            <Card.Header>WOULD YOU RATHER?</Card.Header>
          </Card.Content>
          <Card.Content className="loginImg">
            <Image src={wyrimg} />
          </Card.Content>
          <Card.Content extra>
            <Dropdown text='LOG IN' icon='user circle' floating labeled button className='icon'>
              <Dropdown.Menu>
                <Dropdown.Header content='Select your user' />
                {
                  usersIds.map( id =>
                    <Dropdown.Item key={id} text={users[id].name} image={users[id].avatarURL} onClick={(e) => this.selectUser(e,id)} />
                  )
                }
              </Dropdown.Menu>
            </Dropdown>
          </Card.Content>
        </Card>
      </div>
    )
  }
}

function mapStateToProps({authedUser,users}) {
  return {
    authedUser: null,
    users,
    usersIds: Object.keys(users)
  }
}

export default connect(mapStateToProps)(Login);
