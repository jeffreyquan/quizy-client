import React from 'react';
import JoinGame from './Player/JoinGame';
import QuizForm from './CreateQuiz/QuizForm';
import Quiz from './Quiz/Quiz';
import Lobby from './Lobby/Lobby';
import { Header } from './Global/Header';
import { HashRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <div className="app">
      <Header />
      <Router>
        <div>
          <Route exact path='/' component={ JoinGame }/>
          <Route exact path='/quizzes' component={ QuizForm }/>
          <Route path='/lobby' component={ Lobby }/>
          <Route path='/quizzes/:quizId' component={ Quiz }/>
        </div>
      </Router>
    </div>
  );
}

export default App;
