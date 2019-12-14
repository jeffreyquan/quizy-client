import React from 'react';
import QuizForm from './CreateQuiz/QuizForm';
import Quiz from './Quiz/Quiz'
import { HashRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <Route exact path='/quizzes' component={ QuizForm } />
        <Route path='/quizzes/:quizId' component={ Quiz } />
      </div>
    </Router>
  );
}

export default App;
