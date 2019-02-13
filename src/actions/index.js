import _ from 'lodash';
import jsonPlaceholder from '../apis/jsonPlaceholder';

//ACTION CREATORS

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  // console.log('about to fetch psots');
  await dispatch(fetchPosts());

  // const userIds = _.uniq(_.map(getState().posts, 'userId'));
  // userIds.forEach(id => dispatch(fetchUser(id)));

  //CLEARER WAY TO WRITE THE ^^ ABOVE CODE
  _.chain(getState().posts)
    .map('userId')
      .uniq()
      .forEach(id => dispatch(fetchUser(id)))
      .value();
      
  // console.log(userIds);
  // console.log(getState().posts);
};

export const fetchPosts = () => async dispatch => {
    const response = await jsonPlaceholder.get('/posts');
    dispatch({type: 'FETCH_POSTS', payload: response.data});
  };


//memoizing the api call
//underscore means fxn is private and shouldn't be modified
export const fetchUser = id => async dispatch => {
  const response = await jsonPlaceholder.get(`/users/${id}`);
  dispatch({type: 'FETCH_USER', payload: response.data});
};

//MEMOIZED
// const _fetchUser = _.memoize(async (id, dispatch) => {
//   const response = await jsonPlaceholder.get(`/users/${id}`);
//   dispatch({type: 'FETCH_USER', payload: response.data});
// });

  //ALSO FINE: Can return a fxn or an action obj
  // return {
  //   type: 'FETCH_POSTS',
  //   payload: response
  // };



  // SAME THING

  // export const fetchPosts = async () => {
  //   await return (dispatch) => {
  //     const promise = jsonPlaceholder.get('/posts');
  //     return {
  //       type: 'FETCH_POSTS',
  //       payload: promise
  //     }
  //   }
  // };


  //SAME THING

  // export const fetchPosts = () => {
  //   return async function(dispatch){
  //     const response = await jsonPlaceholder.get('/posts');
  //     dispatch({type: 'FETCH_POSTS', payload: response});
  //   }
  // };