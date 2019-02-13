import React from 'react';
import {connect} from 'react-redux';
import {fetchPostsAndUsers} from '../actions';
import UserHeader from './UserHeader';

class PostList extends React.Component{
  componentDidMount() {
    this.props.fetchPostsAndUsers();
  };

  renderList() {
    return this.props.posts.map(post => {
      return (
        <div className="item" key={post.id}>
          <i className="large middle aligned icon user" />
          <div className="description">
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </div>
          <UserHeader userId={post.userId} />
        </div>
      );
    })
  }
  
  render(){
    // console.log(this.props.posts);
    return(
      <div className="ui relaxed divided list">{this.renderList()}</div>
    );
  }
};

const mapStateToProps = (state) => {
  return {posts: state.posts};
};

export default connect(mapStateToProps, {fetchPostsAndUsers})(PostList);

// WHAT IS GOING ON HERE:
//fetchPosts action creator is called inside componentDidMount lifecycle method of PostList component
// API call is returned & action creator is dispatched to reducer
//state/action is returned from reducer and is passed into mapstatetprops as a prop
