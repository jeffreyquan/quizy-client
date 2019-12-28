import axios from 'axios';

const QuizInfo = {
  getQuiz(id) {
    return axios.get(`https://quizy-server.herokuapp.com/quizzes/${ id }`)
  },

  getAllQuizzes() {
    return axios.get('https://quizy-server.herokuapp.com/quizzes')
  }
}

export default QuizInfo;
