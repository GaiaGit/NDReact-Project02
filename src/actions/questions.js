import { showLoading,hideLoading } from 'react-redux-loading';
import { saveQuestion as apiSaveQuestion, saveQuestionAnswer as apiSaveQuestionAnswer } from '../data/api';

export const GET_QUESTIONS = 'GET_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';
export const SAVE_QUESTION = 'SAVE_QUESTION';
export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER';

export function getQuestions (questions) {
  return {
    type: GET_QUESTIONS,
    questions,
  }
}

export function saveQuestion(question) {
  return {
    type: SAVE_QUESTION,
    question
  }
}

export function saveQuestionAnswer({authedUser,qid,answer}) {
  return {
    type: SAVE_QUESTION_ANSWER,
    authedUser,
    qid,
    answer
  }
}

export function handleSaveQuestion(question) {
  return (dispatch) => {
    dispatch(showLoading());
    return apiSaveQuestion(question)
      .then((question) => dispatch(saveQuestion(question)))
      .then(() => dispatch(hideLoading()))
  }
}

export function handleSaveQuestionAnswer(question) {
  return (dispatch) => {
    dispatch(saveQuestionAnswer(question));
    apiSaveQuestionAnswer(question).catch((e) => {
      console.warn('Error in handleSaveQuestionAnswer: ', e)
      dispatch(saveQuestionAnswer(question))
      alert('There was an error saving an Answer. Try again.')
    })
  }
}
