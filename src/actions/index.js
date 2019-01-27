import { getInitialData } from '../data/api';
import { setAuthedUser } from '../actions/authedUser';
import { getUsers } from '../actions/users';
import { getQuestions } from '../actions/questions';
import { showLoading,hideLoading } from 'react-redux-loading';

const AUTHED_ID = null;

export function handleInitialData () {
  return (dispatch) => {
    dispatch(showLoading());
    return getInitialData()
      .then(({ users, questions }) => {
        dispatch(hideLoading());
        dispatch(getUsers(users));
        dispatch(getQuestions(questions));
        dispatch(setAuthedUser(AUTHED_ID));
      })
  }
}
