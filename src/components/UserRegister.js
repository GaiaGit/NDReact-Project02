import React,{ Component } from 'react';
import { Header,Segment,Input,Button,Container,Image,Label } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { handleAddUser } from '../actions/users';

class UserRegister extends Component {

  state = {
    username: '',
    avatar: '',
    alert: false,
    duplicated: false
  };
  // Gets selected avatar image
  selectAvatar = (ev,img) => this.setState({avatar:img});
  // Disables paste name to control the validation
  disablePaste = (ev) => { ev.preventDefault(); return false; }

  // Checks user name [No duplicated username | Valid name]
  getUsername = (ev) => {
    this.setState({username:ev.target.value});

    if(this.isValidUsername(ev.target.value)) {
      this.setState({alert:false});

      if(this.duplicatedUsername(ev.target.value)){
        this.setState({duplicated: true});
      } else {
        this.setState({duplicated: false});
      }
    } else {
      this.setState({alert:true});
    }
  }

  // Validates duplicated username
  duplicatedUsername = (name) => {
    const {users} = this.props;
    let username = name.toLowerCase().replace(/\s/g,'');
    return Object.keys(users).includes(username.toLowerCase().replace(/\s/g,''));
  }

  // Min 6 characters length & Not allowed a number as first character
  isValidUsername = (username) => {
    return isNaN(username.charAt(0)) && username.length > 5;
  }

  // Saves new user and redirects user selection page
  addNewUser = (ev)  => {
    ev.preventDefault();
    const {username, avatar} = this.state;
    const {dispatch} = this.props;
    dispatch(handleAddUser({username,avatar})).then(() => this.props.history.push('/'));
  }

  render() {
    const {username,avatar,alert,duplicated} = this.state;
    const avatars = 14;

    return(
      <div className="new-question-container">
        <div className="form-container">
          <Header as='h2' align="center" attached='top'>
            Create New User
          </Header>
          <Segment attached align="center">
            <label htmlFor="username">Name:</label>
            <Input name="username" onChange={this.getUsername} onPaste={this.disablePaste} />
            {
              alert === true
              ?  <Label basic color='red' pointing>
              Please, enter a valid username [ First character is not a number | Min 6 char ]
              </Label>
              : null
            }
            {
              duplicated === true
              ?  <Label basic color='red' pointing>
              Username already exists.
              </Label>
              : null
            }
            <label htmlFor="avatars">Choose your avatar:</label>
            <Image.Group size="tiny" name="avatars">
              {
                Array.from(Array(avatars), (e, i) => {
                    let img = i+1;
                    return <Image src={'../avatars/'+ img +'.svg'} key={i} onClick={(ev) => this.selectAvatar(ev,img)} className={avatar === img ? "selected-avatar" : null} />
                  }
                )
              }
            </Image.Group>
            <Container>
              <Button
                color="teal"
                className="submit-button"
                onClick={this.addNewUser}
                disabled={!username || !avatar || alert === true ? true : false}>
                REGISTER
              </Button>
            </Container>
          </Segment>
        </div>
      </div>
    )
  }
}

function mapStateToProps({users}) {
  return {
    users
  }
}

export default connect(mapStateToProps)(UserRegister);
