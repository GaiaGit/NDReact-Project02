import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { Segment,Image,Label } from 'semantic-ui-react';

class UserRank extends Component {

  badgeDisplay = (index) => {
    switch(index) {
      case 0:
        return 'badge1';
      case 1:
        return 'badge2';
      case 2:
        return 'badge3';
      default:
        return 'badgedef';
    }
  }

  render(){
    const {users,userRanking} = this.props;

    return(
      <div className="wrapper">
        {
          userRanking.slice(0,3).map( (id, index) =>
            <div className="rank-block" key={index}>
              <Segment className="rank-pane">
                <Label as='a' corner='right' icon='winner' className={this.badgeDisplay(index)} />
                <div className="rank-avatar">
                  <Image src={users[id].avatarURL} circular />
                </div>
                <div className="rank-data">
                  <h2>
                    <Image src={users[id].avatarURL} avatar className="rank-avatar-mini" />
                    {users[id].name}
                  </h2>
                  <div>
                    <div>Answered Questions: {Object.keys(users[id].answers).length}</div>
                    <hr />
                    <div>Created Questions: {users[id].questions.length}</div>
                  </div>
                </div>
                <div className="rank-score">
                  <p>SCORE</p>
                  <div className="total-score">
                    {Object.keys(users[id].answers).length + users[id].questions.length}
                  </div>
                </div>
              </Segment>
            </div>
          )
        }
      </div>
    )
  }
}

function mapStateToProps({users,userRanking}) {
  return {
    users,
    userRanking: Object.keys(users).sort( (a,b) => {
      let aPoints = users[a].questions.length + Object.keys(users[a].answers).length;
      let bPoints = users[b].questions.length + Object.keys(users[b].answers).length;
      return aPoints - bPoints;
    }).reverse()
  }
}

export default connect(mapStateToProps)(UserRank);
