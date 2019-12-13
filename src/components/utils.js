import axios from 'axios';

const QuizInfo = {
  getQuiz(id) {
    return axios.get(`http://localhost:3000/quizzes/${ id }`)
  }
}

export default QuizInfo;
