import React, {Component} from 'react';
import {Header,Segment,Input,Button,Container,Image,Label} from 'semantic-ui-react';

class UserRegister extends Component {

  state = {
    username: '',
    name: '',
    avatar: '',
    alert: false
  };

  getName = (ev,name) => this.setState({name:ev.target.value});
  selectAvatar = (ev,img) => this.setState({avatar:img});
  disablePaste = (ev) => { ev.preventDefault(); return false; }

  getUsername = (ev) => {
    this.setState({username:ev.target.value});
    if(this.isValidUsername(ev.target.value)) {
      this.setState({alert:false})
    } else {
      this.setState({alert:true});
    }
  }

  isValidUsername = (username) => {
    return !/\s/g.test(username) && username.length > 5;
  }

  addNewUser = (ev)  => {
    console.log('REGISTER');
  }

  render() {
    const {username,name,avatar,alert} = this.state;
    const avatars = 14;

    return(
      <div className="new-question-container">
        <div className="form-container">
          <Header as='h2' align="center" attached='top'>
            Create New User
          </Header>
          <Segment attached align="center">
            <label htmlFor="username">Username:</label>
            <Input name="username" onChange={this.getUsername} onPaste={this.disablePaste} />
            {
              alert === true
              ?  <Label basic color='red' pointing>
                    Please, enter a valid username [ No spaces | Minimum 6 characters ]
                  </Label>
              : null
            }
            <label htmlFor="name">Name:</label>
            <Input name="name" onChange={this.getName} />
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
                disabled={!username || !name || !avatar || alert === true ? true : false}>
                REGISTER
              </Button>
            </Container>
          </Segment>
        </div>
      </div>
    )
  }
}

export default UserRegister;
