import {
  _getUsers,
  _addUser,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer
} from './_DATA.js';

export function getInitialData () {
  return Promise.all([
    _getUsers(),
    _getQuestions(),
  ]).then(([users, questions]) => ({
    users,
    questions,
  }))
}

export function addUser(user) {
  return _addUser(user);
}

export function saveQuestion(info) {
  return _saveQuestion(info);
}

export function saveQuestionAnswer({authedUser,qid,answer}) {
  return _saveQuestionAnswer(authedUser,qid,answer);
}
