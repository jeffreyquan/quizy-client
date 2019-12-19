import React from 'react';
import JoinGame from './Player/JoinGame';
import QuizForm from './CreateQuiz/QuizForm';
import Quiz from './Quiz/Quiz';
import Lobby from './Host/Lobby';
import Start from './Host/Start';
import Gameblock from './Host/Gameblock';
import Playblock from './Player/Playblock';
import Instructions from './Player/Instructions';
import GetReady from './Player/GetReady';
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
