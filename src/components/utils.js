import axios from 'axios';

const QuizInfo = {
  getQuiz(id) {
    return axios.get(`https://quizy-server.herokuapp.com/quizzes/${ id }`)
  },

  getAllQuizzes() {
    return axios.get('http://localhost:3000/quizzes')
  }
}

export default QuizInfo;
