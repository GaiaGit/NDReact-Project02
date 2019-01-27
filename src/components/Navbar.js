import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu,Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import UserMenu from './UserMenu.js';

class Navbar extends Component {

  state = {activeItem: 'home'}

  goTo = (ev,{name}) => this.setState({activeItem:name});

  render() {
    const {authedUser} = this.props;
    const {activeItem} = this.state

    return(
      <Menu stackable inverted>
        <Menu.Item className="menu-brand" name="TESTING SANDBOX">
          Would You Rather?
        </Menu.Item>
        <Menu.Item name="home" active={activeItem==="home"} as={Link} to='/' onClick={ this.goTo } >
          Home
        </Menu.Item>
        <Menu.Item name="add" active={activeItem==="add"} as={Link} to='/add' onClick={ this.goTo } >
          New Question
        </Menu.Item>
        <Menu.Item name="leaderboard" active={activeItem==="leaderboard"} as={Link} to='/leaderboard' onClick={ this.goTo } >
          Leader Board
        </Menu.Item>
        {
          authedUser === null
          ? <Menu.Menu position='right' className="register-submenu">
              <Button inverted content="SIGN UP" as={Link} to={'/register'} icon='user plus' labelPosition='left' className="user-icon" />
            </Menu.Menu>
          : <UserMenu />
        }
        </Menu>
    )
  }
}

function mapStateToProps({authedUser}){
  return { authedUser }
}

export default connect(mapStateToProps)(Navbar);
