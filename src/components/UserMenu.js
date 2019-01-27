import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu,Dropdown,Image } from 'semantic-ui-react';
import { setAuthedUser } from '../actions/authedUser';

class UserMenu extends Component {

  logout = (e) => {
    const {dispatch} = this.props;
    dispatch(setAuthedUser(null))
  };

  render() {
    const {authedUser,users} = this.props;

    const userMenu = [
      { key: 1, text: 'Logout', value: 1, icon: 'sign out', as: Link, to: '/login', onClick: this.logout },
    ];

    const selectedUser = (
      <span>
        <Image avatar src={users[authedUser].avatarURL}  /> { users[authedUser].name }
      </span>
    );

    return(
      <Menu.Menu position='right'>
        <Dropdown simple item trigger={selectedUser} options={userMenu} icon={null} />
      </Menu.Menu>
    )
  }
}

function mapStateToProps({authedUser, users}) {
  return {
    authedUser,
    users
  }
}

export default connect(mapStateToProps)(UserMenu);
