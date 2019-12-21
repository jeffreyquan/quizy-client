import React from 'react';
import Quiz from './Quiz/Quiz';
import Lobby from './Host/Lobby/Lobby';
import Start from './Host/Start/Start';
import Gameblock from './Host/Gameblock/Gameblock';
import JoinGame from './Player/JoinGame/JoinGame';
import QuizForm from './Quiz/NewQuiz/QuizForm/QuizForm';
import Playblock from './Player/Playblock/Playblock';
import Instructions from './Player/Instructions/Instructions';
import GetReady from './Player/GetReady/GetReady';
import { Header } from './Global/Header';
import { HashRouter, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="app">
      <Header />
      <HashRouter>
        <Switch>
          <Route exact path='/' component={ JoinGame }/>
          <Route exact path='/instructions' component={ Instructions }/>
          <Route exact path='/getready' component={ GetReady }/>
          <Route exact path='/lobby' component={ Lobby }/>
          <Route exact path='/start' component={ Start }/>
          <Route exact path='/gameblock' component={ Gameblock }/>
          <Route exact path='/playblock' component={ Playblock }/>
          <Route exact path='/quizzes/new' component={ QuizForm }/>
          <Route path='/quizzes/:quizId' component={ Quiz }/>
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
