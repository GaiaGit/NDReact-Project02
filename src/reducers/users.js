import { GET_USERS, ADD_USER } from '../actions/users';
import { SAVE_QUESTION, SAVE_QUESTION_ANSWER } from '../actions/questions';

export default function users (state = {}, action) {
  switch(action.type) {

    case GET_USERS :
      return {
        ...state,
        ...action.users
      };

    case ADD_USER :
      return {
        ...state,
        [action.user.id]: action.user
      };

    case SAVE_QUESTION:
      const { question } = action;
      const { id, author } = question;
      return {
        ...state,
        [author]: {
          ...state[author],
          questions: state[author].questions.concat([id])
        }
      };

    case SAVE_QUESTION_ANSWER:
      const {authedUser,qid,answer} = action;
      return {
         ...state,
         [authedUser]: {
           ...state[authedUser],
           answers: {
             ...state[authedUser].answers,
             [qid]: answer
           }
         }
      };

    default :
      return state;
  }
}
