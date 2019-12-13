import React from 'react';
import QuizForm from './CreateQuiz/QuizForm';
import { HashRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <Route exact path='/quizzes' component={ QuizForm } />
        
      </div>
    </Router>
  );
}

export default App;
