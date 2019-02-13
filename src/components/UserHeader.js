import React from 'react';
import {connect} from 'react-redux';


class UserHeader extends React.Component {
  // componentDidMount(){
  //   //extracted logic to mapStateToProps to improve reusability
  //   //Also component doesn't need to reach into redux store each time it rerenders
  //   // const user = this.props.users.find(user => user.id === this.props.userId);

  //   this.props.fetchUser(this.props.userId);
  // };

  render(){
    const {user} = this.props;
    if(!user){
      return null;
    }
    return(
      <div className="header">{user.name}</div>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  //ownProps is what is being passed downt to component as a prop from PostList
  return {user: state.users.find(user => user.id === ownProps.userId)};
};

export default connect(mapStateToProps)(UserHeader);