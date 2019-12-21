(this["webpackJsonpquizy-client"]=this["webpackJsonpquizy-client"]||[]).push([[0],{105:function(e,t,n){e.exports=n.p+"static/media/theme.bcd504e3.mp3"},120:function(e,t,n){e.exports=n(194)},125:function(e,t,n){},146:function(e,t,n){},174:function(e,t){},185:function(e,t,n){},186:function(e,t,n){},187:function(e,t,n){},188:function(e,t,n){},190:function(e,t,n){},191:function(e,t,n){},192:function(e,t,n){},193:function(e,t,n){},194:function(e,t,n){"use strict";n.r(t);var a,r=n(0),i=n.n(r),s=n(13),l=n.n(s),c=(n(125),n(8)),o=n(6),u=n(9),m=n(10),E=n(11),h=n(30),p=n(51),d=n.n(p),v={getQuiz:function(e){return d.a.get("https://quizy-server.herokuapp.com/quizzes/".concat(e))}},f=n(220),g=n(224),b=function(e){function t(){var e;return Object(c.a)(this,t),(e=Object(u.a)(this,Object(m.a)(t).call(this))).state={name:"",category:"",questions:[]},e}return Object(E.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this;console.log(this.props.match.params);var t=this.props.match.params.quizId;console.log(t),v.getQuiz(t).then((function(t){var n=t.data,a=n._id,r=n.name,i=n.category,s=n.questions;console.log(r,i,s),e.setState({id:a,name:r,category:i,questions:s})}))}},{key:"render",value:function(){return i.a.createElement(i.a.Fragment,null,i.a.createElement(f.a,{maxWidth:"md"},i.a.createElement("h1",null,"Quiz preview"),i.a.createElement("h2",null,"Quiz: ",this.state.name),i.a.createElement("h2",null,"Category: ",this.state.category),i.a.createElement(y,{questions:this.state.questions}),i.a.createElement(h.b,{to:"/lobby?quizId=".concat(this.state.id)},i.a.createElement(g.a,{variant:"contained",color:"primary"},"Host Game"))))}}]),t}(r.Component),y=function(e){if(0===e.questions.length)return i.a.createElement("div",null,"Questions are loading.");var t=e.questions.map((function(e,t){return i.a.createElement("div",{key:t},i.a.createElement("div",{style:{fontWeight:"bold"}},"Question ",t+1),i.a.createElement("p",null,e.question))}));return i.a.createElement("div",null,t)},O=(n(146),n(225)),S=n(104),N=n.n(S),C=function(e){function t(){var e;return Object(c.a)(this,t),console.log("<Header />"),(e=Object(u.a)(this,Object(m.a)(t).call(this))).state={endpoint:"https://quizy-server.herokuapp.com/"},a=N()(e.state.endpoint),e}return Object(E.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return null}}]),t}(r.Component),I=n(5),k=n(105),_=n.n(k),w=n(107),j=n.n(w),A=n(106),T=n.n(A),x=function(e){function t(){var e;return Object(c.a)(this,t),(e=Object(u.a)(this,Object(m.a)(t).call(this))).handleMusic=function(t){t.preventDefault(),e.setState({muted:!e.state.muted})},e.startGame=function(){console.log("Starting game."),a.emit(I.HOST_STARTED_GAME,e.state.pin)},e.state={quizId:null,pin:null,players:null,playersCount:null,disabled:!0,muted:!1},e}return Object(E.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=n(40).parse(this.props.location.search).quizId;console.log(t),this.setState({quizId:t}),a.emit(I.HOST_JOINED,t),a.on(I.SHOW_PIN,(function(t){e.setState({pin:t.pin})})),a.on(I.UPDATE_PLAYERS_IN_LOBBY,(function(t){console.log(t),0===t.playersCount?e.setState({players:null,playersCount:null}):e.setState({players:t.players,playersCount:t.playersCount,disabled:!1})}))}},{key:"componentWillUnmount",value:function(){a.off(I.SHOW_PIN),a.off(I.UPDATE_PLAYERS_IN_LOBBY)}},{key:"render",value:function(){var e,t;return e=1===this.state.playersCount?i.a.createElement("span",null,"player"):i.a.createElement("span",null,"players"),t=this.state.muted?i.a.createElement("a",{onClick:this.handleMusic},i.a.createElement(j.a,{style:{color:"rgba(255, 255, 255, 1)"}})):i.a.createElement("a",{onClick:this.handleMusic},i.a.createElement(T.a,{style:{color:"rgba(255, 255, 255, 1)"}})),console.log(this.state),i.a.createElement("div",{className:"main"},i.a.createElement("div",{className:"music"},t),i.a.createElement("div",null,i.a.createElement("audio",{ref:"audio_tag",src:_.a,autoPlay:!0,muted:this.state.muted})),i.a.createElement(O.a,{container:!0,direction:"column"},i.a.createElement(O.a,{item:!0,xs:12,style:{minHeight:"20vh"}},i.a.createElement("div",{className:"title"},i.a.createElement("h1",{className:"join"},"Join with Game PIN: "),i.a.createElement("h1",{className:"pin"},this.state.pin))),i.a.createElement(O.a,{item:!0,container:!0,xs:12,direction:"row",justify:"space-between",alignItems:"center",style:{minHeight:"10vh",marginTop:"30px"}},i.a.createElement(O.a,{item:!0,xs:4,style:{paddingLeft:"50px"}},i.a.createElement("div",{className:"players-count"},this.state.playersCount||0," ",e)),i.a.createElement(O.a,{item:!0,xs:4,style:{textAlign:"center"}},i.a.createElement("h1",{className:"logo"},"QUIZY")),i.a.createElement(O.a,{item:!0,xs:4,style:{textAlign:"right",paddingRight:"50px"}},i.a.createElement(h.b,{to:"/start?quizId=".concat(this.state.quizId,"&pin=").concat(this.state.pin)},i.a.createElement(g.a,{variant:"contained",color:"primary",className:"start-btn",onClick:this.startGame,disabled:this.state.disabled,style:{fontSize:"1.6rem"}},"Start")))),i.a.createElement(O.a,{item:!0,xs:12},i.a.createElement(q,{players:this.state.players,playersCount:this.state.playersCount})),i.a.createElement(O.a,null)))}}]),t}(r.Component),q=function(e){if(null===e.players||null===e.playersCount)return null;var t=e.players.map((function(e,t){return i.a.createElement("div",{key:e._id},e.nickname)}));return i.a.createElement("div",{className:"names"},t)},R=(n(185),function(e){function t(){var e;return Object(c.a)(this,t),(e=Object(u.a)(this,Object(m.a)(t).call(this))).state={pin:0,quizId:"",quizName:null,numberOfQuestions:0},e}return Object(E.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=n(40).parse(this.props.location.search),r=t.quizId,i=parseInt(t.pin);console.log(i),this.setState({pin:i,quizId:r}),a.emit(I.FETCH_INTRO,i),a.on(I.GAME_INTRO,(function(t){console.log(t);var n=t.quizName,a=t.numberOfQuestions;e.setState({quizName:n,numberOfQuestions:a}),setTimeout((function(){e.props.history.push("/gameblock?quizId=".concat(e.state.quizId,"&pin=").concat(e.state.pin))}),5e3)}))}},{key:"render",value:function(){return i.a.createElement(O.a,{container:!0,justify:"center",alignItems:"center",style:{minHeight:"100vh"}},i.a.createElement(O.a,{item:!0,container:!0,justify:"center",alignItems:"center",xs:12,style:{minHeight:"15vh"},className:"title"},i.a.createElement("h1",null,this.state.quizName)),i.a.createElement(O.a,{item:!0,container:!0,direction:"column",xs:12,alignItems:"center",justify:"center",style:{minHeight:"75vh"},className:"middle"},i.a.createElement("div",{className:"questions"},this.state.numberOfQuestions," Questions"),i.a.createElement("div",null,"Are you ready?")),i.a.createElement(O.a,{item:!0,container:!0,alignItems:"center",xs:12,style:{minHeight:"10vh"},className:"footer"},i.a.createElement("div",null,"Game PIN: ",i.a.createElement("span",{style:{fontWeight:"800"}},this.state.pin))))}}]),t}(r.Component)),Q=(n(186),function(e){function t(){return Object(c.a)(this,t),Object(u.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(E.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.id=setTimeout((function(){return e.props.nextStep()}),5e3)}},{key:"componentWillUnmount",value:function(){clearTimeout(this.id)}},{key:"render",value:function(){var e=this.props,t=e.questionNumber,n=e.question,a=e.totalNumberOfQuestions;return i.a.createElement(O.a,{container:!0,xs:12,alignItems:"center",justify:"center",style:{minHeight:"100vh"},className:"question-block"},i.a.createElement("div",{className:"question-tracker"},t," of ",a),i.a.createElement(O.a,{item:!0,container:!0,xs:10,alignItems:"center",justify:"center",className:"main-question"},n))}}]),t}(r.Component)),H=(n(187),n(57)),D=n.n(H),U=n(58),z=n.n(U),P=n(59),W=n.n(P),F=n(60),M=n.n(F),L=function(e){function t(){var e;return Object(c.a)(this,t),(e=Object(u.a)(this,Object(m.a)(t).call(this))).timer=function(){if(e.setState({time:e.state.time-1}),e.state.time<=0){clearInterval(e.state.intervalId);var t=e.props.pin;a.emit(I.QUESTION_END,t),e.props.nextStep()}},e.state={time:20,playersAnswered:0,intervalId:""},e}return Object(E.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=setInterval(this.timer,1e3);this.setState({intervalId:t}),a.on(I.UPDATE_PLAYERS_ANSWERED,(function(t){e.setState({playersAnswered:t})})),a.on(I.FETCH_TIME,(function(t){var n={pin:e.props.pin,playerId:t,time:e.state.time};a.emit(I.TIME,n)}))}},{key:"componentWillUnmount",value:function(){clearInterval(this.state.intervalId)}},{key:"render",value:function(){var e;e=1===this.state.playersAnswered?i.a.createElement("span",null,"answer"):i.a.createElement("span",null,"answers");var t=this.props,n=t.pin,a=t.question,r=t.answers;return i.a.createElement(O.a,{container:!0,justify:"center",alignItems:"center",style:{minHeight:"100vh"}},i.a.createElement(O.a,{item:!0,container:!0,justify:"center",alignItems:"center",xs:12,style:{minHeight:"20vh"},className:"top-question"},i.a.createElement("h1",null,a)),i.a.createElement(O.a,{item:!0,container:!0,justify:"space-between",alignItems:"center",xs:12,style:{minHeight:"40vh"},className:"controls"},i.a.createElement("div",{className:"time"},this.state.time),i.a.createElement("div",{className:"answer-count"},this.state.playersAnswered,e)),i.a.createElement(O.a,{item:!0,container:!0,xs:12,alignItems:"center",justify:"center",style:{minHeight:"30vh"},className:"host-answers"},i.a.createElement(O.a,{item:!0,container:!0,alignItems:"center",xs:6,style:{backgroundColor:"rgba(244, 67, 54, 1)",minHeight:"15vh",border:"1px solid white",padding:"5px"}},i.a.createElement(D.a,{style:{color:"white",fontSize:40}}),r.a),i.a.createElement(O.a,{item:!0,container:!0,alignItems:"center",xs:6,style:{backgroundColor:"rgba(63, 81, 181, 1)",minHeight:"15vh",border:"1px solid white",padding:"5px"}},i.a.createElement(z.a,{style:{color:"white",fontSize:40}}),r.b),i.a.createElement(O.a,{item:!0,container:!0,alignItems:"center",xs:6,style:{backgroundColor:"rgba(255, 152, 0, 1)",minHeight:"15vh",border:"1px solid white",padding:"5px"}},i.a.createElement(W.a,{style:{color:"white",fontSize:40}}),r.c),i.a.createElement(O.a,{item:!0,container:!0,alignItems:"center",xs:6,style:{backgroundColor:"rgba(76, 175, 80, 1)",minHeight:"15vh",border:"1px solid white",padding:"5px"}},i.a.createElement(M.a,{style:{color:"white",fontSize:40}}),r.d)),i.a.createElement(O.a,{item:!0,container:!0,alignItems:"center",xs:12,style:{minHeight:"10vh"},className:"footer"},i.a.createElement("div",null,"Game PIN: ",i.a.createElement("span",{style:{fontWeight:"800"}},n))))}}]),t}(r.Component),G=function(e){function t(){var e;return Object(c.a)(this,t),(e=Object(u.a)(this,Object(m.a)(t).call(this))).handleClick=function(){e.props.onNext(),e.props.fetchScoreboard();var t={pin:e.props.pin,questionNumber:e.props.questionNumber+1};a.emit(I.FETCH_NEXT_QUESTION,t),console.log("Host fetching next question.......")},e.state={},e}return Object(E.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this.props,t=e.answers,n=e.answeredA,a=e.answeredB,r=e.answeredC,s=e.answeredD,l=e.correct;return null===l?i.a.createElement("div",null,"Results loading"):i.a.createElement("div",null,i.a.createElement("div",null,"Correct: ",l),i.a.createElement("div",null,n," answered A"),i.a.createElement("div",null,a," answered B"),i.a.createElement("div",null,r," answered C"),i.a.createElement("div",null,s," answered D"),i.a.createElement("div",null,t.a),i.a.createElement("div",null,t.b),i.a.createElement("div",null,t.c),i.a.createElement("div",null,t.d),i.a.createElement(g.a,{variant:"contained",color:"primary",onClick:this.handleClick},"Next"))}}]),t}(r.Component),B=function(e){function t(){var e;return Object(c.a)(this,t),(e=Object(u.a)(this,Object(m.a)(t).call(this))).finishGame=function(){e.props.endGame()},e.handleClick=function(){e.props.nextQuestion()},e.state={},e}return Object(E.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return 0===this.props.rankedPlayers.length?i.a.createElement("div",null,"Loading scoreboard"):(console.log("Game status is: ",this.props.gameStatus),e=this.props.gameStatus?i.a.createElement(g.a,{variant:"contained",color:"primary",onClick:this.handleClick},"Next"):i.a.createElement(g.a,{variant:"contained",color:"primary",onClick:this.finishGame},"End"),i.a.createElement("div",null,i.a.createElement("h1",null,"Scorboard"),i.a.createElement(Y,{playerRanks:this.props.rankedPlayers}),e));var e}}]),t}(r.Component),Y=function(e){var t=e.playerRanks.map((function(e,t){return i.a.createElement("div",{key:t},e.rank," - ",e.nickname," - ",e.score)}));return i.a.createElement("div",null,t)};var V=function(e){var t=e.rankings.map((function(e,t){return i.a.createElement("div",{key:t},e.rank," - ",e.nickname," - ",e.score," pts.")}));return i.a.createElement("div",null,t)},X=function(e){return i.a.createElement("div",null,i.a.createElement(V,{rankings:e.finalRankings,totalNumberOfQuestions:e.totalNumberOfQuestions}))},J=function(e){function t(){var e;return Object(c.a)(this,t),(e=Object(u.a)(this,Object(m.a)(t).call(this))).nextStep=function(){var t=e.state.step;e.setState({step:t+1})},e.nextQuestion=function(){e.setState({step:1,rankedPlayers:[],answeredA:0,answeredB:0,answeredC:0,answeredD:0,correct:null});var t=e.state.pin;a.emit(I.NEXT,t)},e.endGame=function(){e.setState({step:5});var t=e.state.pin;a.emit(I.FINISH_GAME,t)},e.fetchScoreboard=function(){var t=e.state,n=t.quizId,r=t.pin;a.emit(I.FETCH_SCOREBOARD,{quizId:n,pin:r}),console.log("Host requesting for scoreboard.")},e.state={step:1,quizId:"",pin:null,questionNumber:1,totalNumberOfQuestions:null,questionStatus:!0,question:null,answers:[],answeredA:0,answeredB:0,answeredC:0,answeredD:0,correct:null,gameStatus:!0,rankedPlayers:[]},e}return Object(E.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=n(40).parse(this.props.location.search),r=t.quizId,i=t.pin;console.log("Question for room with pin",i),this.setState({pin:i,quizId:r}),a.emit(I.FETCH_QUESTION,i),a.on(I.RECEIVE_QUESTION,(function(t){var n=t.questionNumber,a=t.question,r=t.totalNumberOfQuestions;console.log("Receiving question: ",t),e.setState({questioNumber:n,question:a.question,answers:a.answers,correct:a.correct,totalNumberOfQuestions:r})})),a.on(I.QUESTION_RESULT,(function(t){var n=t.answeredA,a=t.answeredB,r=t.answeredC,i=t.answeredD,s=t.correctAnswer,l=e.state;l.step,l.quizId,l.pin,l.questionNumber;console.log(t),e.setState({answeredA:n,answeredB:a,answeredC:r,answeredD:i,correct:s,step:3})})),a.on(I.RECEIVE_SCOREBOARD,(function(t){console.log("Receiving ranked players for scoreboard: ",t),e.setState({rankedPlayers:t})})),a.on(I.NEXT_QUESTION,(function(t){var n=t.questionNumber,a=t.question;t.numberOfPlayers;console.log("Receiving next question: ",t),e.setState({questionNumber:n,question:a.question,answers:a.answers,correct:a.correct})})),a.on(I.GAME_OVER,(function(t){e.setState({gameStatus:!1,rankedPlayers:t})}))}},{key:"render",value:function(){var e=this.state.step,t=this.state,n=t.pin,a=t.questionNumber,r=t.totalNumberOfQuestions,s=t.question,l=t.answers,c=t.answeredA,o=t.answeredB,u=t.answeredC,m=t.answeredD,E=t.correct,h=t.playersAnswered,p=t.rankedPlayers,d=t.gameStatus;switch(console.log("Step: ",e),e){case 1:return i.a.createElement(Q,{nextStep:this.nextStep,handleChange:this.handleChange,questionNumber:a,question:s,totalNumberOfQuestions:r});case 2:return i.a.createElement(L,{nextStep:this.nextStep,pin:n,question:s,answers:l,playersAnswered:h});case 3:return i.a.createElement(G,{answers:l,answeredA:c,answeredB:o,answeredC:u,answeredD:m,correct:E,pin:n,questionNumber:a,onNext:this.nextStep,fetchScoreboard:this.fetchScoreboard});case 4:return i.a.createElement(B,{pin:n,rankedPlayers:p,nextQuestion:this.nextQuestion,endGame:this.endGame,gameStatus:d});case 5:return i.a.createElement(X,{totalNumberOfQuestions:r,finalRankings:p})}}}]),t}(r.Component),K=n(12),Z=(n(188),n(110)),$=n(229),ee=n(108),te=n.n(ee),ne=n(231),ae=Object(Z.a)({palette:{primary:{main:te.a[900]}}}),re=function(e){function t(){var e;return Object(c.a)(this,t),(e=Object(u.a)(this,Object(m.a)(t).call(this))).handleChange=function(t){t.preventDefault();var n=t.target,a=n.name,r=n.value;e.setState(Object(K.a)({},a,r))},e.handleClick=function(t){e.setState({disabled:!0})},e.handleSubmit=function(t){t.preventDefault();var n=e.state,r=n.nickname,i=n.pin;a.emit(I.PLAYER_JOINED,{nickname:r,pin:i}),a.on(I.GAME_NOT_FOUND,(function(){console.log("Game not found..."),e.setState({message:"Game not found."}),setTimeout((function(){return e.setState({message:null})}),2e3)})),a.on(I.PLAYER_JOINED_SUCCESSFULLY,(function(t){e.props.history.push("/instructions?nickname=".concat(e.state.nickname,"&pin=").concat(e.state.pin))}))},e.state={nickname:null,pin:null,message:null,disabled:!1},e}return Object(E.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e;return e=null===this.state.message?i.a.createElement("div",null):i.a.createElement("div",null,"We didn't recognise the game pin. Please check and try again."),i.a.createElement("div",{className:"home"},i.a.createElement(O.a,{container:!0,direction:"column",alignItems:"center",justify:"center",style:{minHeight:"100vh"}},i.a.createElement(O.a,{item:!0,lg:2,md:3,xs:5},i.a.createElement("h1",{className:"main-title"},"QUIZY")),i.a.createElement(O.a,{item:!0,lg:2,md:3,xs:5},i.a.createElement("form",{onSubmit:this.handleSubmit},i.a.createElement(ne.a,{inputProps:{style:{textAlign:"center",fontSize:"1.6rem",fontWeight:"bold",color:"black"}},placeholder:"NICKNAME",name:"nickname",value:this.state.nickname||"",onChange:this.handleChange,margin:"dense",variant:"outlined",required:!0,fullWidth:!0}),i.a.createElement(ne.a,{inputProps:{style:{textAlign:"center",fontSize:"1.6rem",fontWeight:"bold",color:"black"}},placeholder:"GAME PIN",name:"pin",value:this.state.pin||"",onChange:this.handleChange,margin:"dense",variant:"outlined",required:!0,fullWidth:!0}),i.a.createElement($.a,{theme:ae},i.a.createElement(g.a,{style:{fontSize:"1.6rem",textAlign:"center",fontWeight:"bold",margin:"7px 0px"},variant:"contained",color:"primary",type:"submit",disabled:this.state.disabled,fullWidth:!0},"Enter")))),i.a.createElement(O.a,{item:!0,lg:2,md:3,xs:5},e),i.a.createElement(O.a,{item:!0,lg:2,md:3,xs:5},i.a.createElement("p",{style:{color:"white"}},"Create your own quiz ",i.a.createElement(h.b,{to:"/quizzes/new",style:{color:"white",textDecoration:"none",fontWeight:"bold"}},"here"),"."))))}}]),t}(r.Component),ie=n(26),se=n(72),le=n.n(se),ce=function(e){function t(){var e,n;Object(c.a)(this,t);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(n=Object(u.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).continue=function(e){e.preventDefault(),n.props.nextStep()},n}return Object(E.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this.props,t=e.values,n=e.handleChange;return i.a.createElement(i.a.Fragment,null,i.a.createElement(O.a,{container:!0,direction:"column",alignItems:"center",justify:"center"},i.a.createElement(O.a,{item:!0,md:4,sm:12},i.a.createElement(O.a,{container:!0,spacing:2,direction:"column",alignItems:"center",justify:"center",style:{minHeight:"25vh"}},i.a.createElement(O.a,{item:!0,xs:12,style:{textAlign:"center"}},i.a.createElement("h1",null,"Enter quiz details:")),i.a.createElement(O.a,{item:!0,xs:12},i.a.createElement(ne.a,{label:"Name",name:"name",onChange:n,value:t.name,margin:"dense",variant:"filled",fullWidth:!0,required:!0})),i.a.createElement(O.a,{item:!0,xs:12},i.a.createElement(ne.a,{label:"Category",name:"category",onChange:n,value:t.category,margin:"dense",variant:"filled",fullWidth:!0,required:!0})),i.a.createElement(O.a,{item:!0,xs:12},i.a.createElement(g.a,{variant:"contained",color:"primary",onClick:this.continue},"Continue"))))))}}]),t}(r.Component),oe=n(109),ue=n(228),me=n(230),Ee=n(234),he=n(233),pe=function(e){function t(){var e,n;Object(c.a)(this,t);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(n=Object(u.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).continue=function(e){e.preventDefault(),n.props.nextStep()},n.back=function(e){e.preventDefault(),n.props.prevStep()},n}return Object(E.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this.props,t=e.values,n=e.saveQuestion;return i.a.createElement(i.a.Fragment,null,i.a.createElement(O.a,{container:!0,spacing:2,direction:"column",alignItems:"center",justify:"center",style:{minHeight:"25vh"}},i.a.createElement(O.a,{item:!0,md:4,sm:12},i.a.createElement("h1",null,"Add Questions:")),i.a.createElement(O.a,{item:!0,md:4,sm:12},i.a.createElement(ve,{saveQuestion:n})),i.a.createElement(O.a,{item:!0,md:4,sm:12},i.a.createElement(O.a,{container:!0,spacing:2},i.a.createElement(O.a,{item:!0,md:6,xs:12},i.a.createElement(g.a,{variant:"contained",color:"secondary",onClick:this.back,fullWidth:!0},"Back")),i.a.createElement(O.a,{item:!0,md:6,xs:12},i.a.createElement(g.a,{variant:"contained",color:"primary",onClick:this.continue,fullWidth:!0},"Continue")))),i.a.createElement(O.a,{item:!0,md:4,sm:12},i.a.createElement(O.a,{container:!0,alignItems:"flex-start",justify:"center"},i.a.createElement(de,{questions:t.questions})))))}}]),t}(r.Component),de=function(e){if(0===e.questions.length)return i.a.createElement("div",null,"No questions have been added.");var t=e.questions.map((function(e,t){return i.a.createElement("div",{key:t},i.a.createElement("div",{style:{fontWeight:"bold"}},"Question ",t+1),i.a.createElement("p",null,e.question," Answer: ",e.answers[e.correct]))}));return i.a.createElement("div",null,i.a.createElement("h1",null,"Current Questions:"),t)},ve=function(e){function t(){var e;return Object(c.a)(this,t),(e=Object(u.a)(this,Object(m.a)(t).call(this))).handleChange=function(t){var n=t.target,a=n.name,r=n.value;e.setState(Object(K.a)({},a,r))},e.handleAnswerChange=function(t){var n=t.target,a=n.name,r=n.value;e.setState((function(e){return{answers:Object(oe.a)({},e.answers,Object(K.a)({},a,r))}}))},e.handleSubmit=function(t){t.preventDefault(),e.props.saveQuestion(e.state),e.setState({question:"",answers:{a:"",b:"",c:"",d:""},correct:""})},e.state={question:"",answers:{a:"",b:"",c:"",d:""},correct:""},e}return Object(E.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return i.a.createElement("form",{variant:"outlined",onSubmit:this.handleSubmit},i.a.createElement(O.a,{container:!0,direction:"row",spacing:1},i.a.createElement(O.a,{item:!0,xs:12},i.a.createElement(ne.a,{label:"Question",name:"question",value:this.state.question,onChange:this.handleChange,margin:"dense",variant:"filled",fullWidth:!0})),i.a.createElement(O.a,{item:!0,md:6,xs:12},i.a.createElement(ne.a,{label:"Answer A:",name:"a",value:this.state.answers.a,onChange:this.handleAnswerChange,margin:"dense",variant:"filled",fullWidth:!0,required:!0})),i.a.createElement(O.a,{item:!0,md:6,xs:12},i.a.createElement(ne.a,{label:"Answer B:",name:"b",value:this.state.answers.b,onChange:this.handleAnswerChange,margin:"dense",variant:"filled",fullWidth:!0,required:!0})),i.a.createElement(O.a,{item:!0,md:6,xs:12},i.a.createElement(ne.a,{label:"Answer C:",name:"c",value:this.state.answers.c,onChange:this.handleAnswerChange,margin:"dense",variant:"filled",fullWidth:!0,required:!0})),i.a.createElement(O.a,{item:!0,md:6,xs:12},i.a.createElement(ne.a,{label:"Answer D:",name:"d",value:this.state.answers.d,onChange:this.handleAnswerChange,margin:"dense",variant:"filled",fullWidth:!0,required:!0})),i.a.createElement(O.a,{item:!0,xs:12},i.a.createElement(ue.a,{margin:"dense",variant:"filled",style:{width:"100%"}},i.a.createElement(he.a,null,"Correct Answer:"),i.a.createElement(me.a,{name:"correct",value:this.state.correct,onChange:this.handleChange},i.a.createElement(Ee.a,{value:"a"},"A"),i.a.createElement(Ee.a,{value:"b"},"B"),i.a.createElement(Ee.a,{value:"c"},"C"),i.a.createElement(Ee.a,{value:"d"},"D")))),i.a.createElement(O.a,{item:!0,xs:12},i.a.createElement(g.a,{variant:"contained",color:"primary",type:"submit",fullWidth:!0},"Add Question"))))}}]),t}(r.Component),fe=function(e){function t(){var e,n;Object(c.a)(this,t);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(n=Object(u.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).continue=function(e){e.preventDefault(),n.props.saveQuiz()},n.back=function(e){e.preventDefault(),n.props.prevStep()},n}return Object(E.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this.props.values,t=e.name,n=e.category,a=e.questions;return i.a.createElement(i.a.Fragment,null,i.a.createElement(O.a,{container:!0,direction:"column",spacing:2,alignItems:"center",justify:"center"},i.a.createElement(O.a,{item:!0,md:4,sm:12},i.a.createElement("h1",null,"Confirm details:")),i.a.createElement(O.a,{item:!0,md:4,sm:12},i.a.createElement(O.a,{container:!0,alignItems:"flex-start"},i.a.createElement(O.a,{item:!0,xs:12},i.a.createElement(ge,{name:t,category:n}),i.a.createElement(be,{questions:a})))),i.a.createElement(O.a,{item:!0,md:4,sm:12},i.a.createElement(O.a,{container:!0,spacing:2},i.a.createElement(O.a,{item:!0,md:6,xs:12},i.a.createElement(g.a,{variant:"contained",color:"secondary",onClick:this.back,fullWidth:!0},"Back")),i.a.createElement(O.a,{item:!0,md:6,xs:12},i.a.createElement(g.a,{variant:"contained",color:"primary",onClick:this.continue,fullWidth:!0},"Confirm"))))))}}]),t}(r.Component),ge=function(e){return i.a.createElement("div",null,i.a.createElement("p",null,i.a.createElement("span",{style:{fontWeight:"bold"}},"Name: "),e.name),i.a.createElement("p",null,i.a.createElement("span",{style:{fontWeight:"bold"}},"Category: "),e.category))},be=function(e){var t=e.questions.map((function(e,t){return i.a.createElement("div",{key:t},i.a.createElement("div",{style:{fontWeight:"bold"}},"Question ",t+1),i.a.createElement("p",null,e.question," Answer: ",e.answers[e.correct]))}));return i.a.createElement("div",null,t)},ye=function(e){return"http://localhost:3000/".concat(e,"/")},Oe=function(e){function t(){var e;return Object(c.a)(this,t),(e=Object(u.a)(this,Object(m.a)(t).call(this))).nextStep=function(){var t=e.state.step;e.setState({step:t+1})},e.prevStep=function(){var t=e.state.step;e.setState({step:t-1})},e.saveQuiz=function(){var t,n,a,r,i,s,l;return le.a.async((function(c){for(;;)switch(c.prev=c.next){case 0:return t=e.state,n=t.name,a=t.category,r=t.questions,i={name:n,category:a,questions:r},console.log(i),c.next=5,le.a.awrap(d.a.post(ye("quizzes"),i));case 5:s=c.sent,l=s.data._id,console.log(l),e.props.history.push("/quizzes/".concat(l));case 9:case"end":return c.stop()}}))},e.handleChange=function(t){var n=t.target,a=n.name,r=n.value;e.setState(Object(K.a)({},a,r))},e.saveQuestion=function(t){e.setState({questions:[].concat(Object(ie.a)(e.state.questions),[t])})},e.state={step:1,name:"",category:"",questions:[]},e}return Object(E.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this.state.step,t=this.state,n={name:t.name,category:t.category,questions:t.questions};switch(e){case 1:return i.a.createElement(ce,{nextStep:this.nextStep,handleChange:this.handleChange,values:n});case 2:return i.a.createElement(pe,{nextStep:this.nextStep,prevStep:this.prevStep,saveQuestion:this.saveQuestion,values:n});case 3:return i.a.createElement(fe,{nextStep:this.nextStep,prevStep:this.prevStep,saveQuiz:this.saveQuiz,values:n});default:return i.a.createElement(ce,{nextStep:this.nextStep,handleChange:this.handleChange,values:n})}}}]),t}(r.Component),Se=(n(190),function(e){function t(){return Object(c.a)(this,t),Object(u.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(E.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this;setTimeout((function(){return e.props.nextStep()}),5e3)}},{key:"render",value:function(){var e=this.props,t=e.pin,n=e.nickname,a=e.questionNumber,r=e.totalNumberOfQuestions;return console.log("Hitting preview page"),i.a.createElement(O.a,{container:!0,justify:"center",alignItems:"center",style:{minHeight:"100vh"}},i.a.createElement(O.a,{item:!0,container:!0,justify:"space-between",alignItems:"center",xs:12,style:{minHeight:"15vh"},className:"top-info"},i.a.createElement("div",null,i.a.createElement("span",null,"PIN: ",t),i.a.createElement("span",null,a," of ",r)),i.a.createElement("div",null,n)),i.a.createElement(O.a,{item:!0,container:!0,xs:12,alignItems:"center",justify:"center",style:{minHeight:"85vh"},className:"question-number"},"Question ",a))}}]),t}(r.Component)),Ne=(n(191),function(e){function t(){var e;return Object(c.a)(this,t),(e=Object(u.a)(this,Object(m.a)(t).call(this))).handleClick=function(t){console.log("Player has submitted answer:",t.currentTarget.value),e.props.submitAnswer(t.currentTarget.value),e.setState({buttonsOn:!1})},e.state={answer:"",buttonsOn:!0},e}return Object(E.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){if(!this.state.buttonsOn)return i.a.createElement("div",null,"Answer submitted. Waiting for other players.");var e=this.props,t=e.pin,n=e.nickname,a=e.questionNumber,r=e.totalNumberOfQuestions;return i.a.createElement(O.a,{container:!0,justify:"center",alignItems:"center",style:{minHeight:"100vh"}},i.a.createElement(O.a,{item:!0,container:!0,justify:"space-between",alignItems:"center",xs:12,style:{minHeight:"15vh"},className:"answers-top-info"},i.a.createElement("div",null,i.a.createElement("span",null,"PIN: ",t),i.a.createElement("span",null,a," of ",r)),i.a.createElement("div",null,n)),i.a.createElement(O.a,{item:!0,container:!0,spacing:1,xs:12,alignItems:"center",justify:"center",style:{minHeight:"85vh"},className:"answer-block"},i.a.createElement(O.a,{item:!0,xs:6},i.a.createElement(g.a,{variant:"contained",style:{backgroundColor:"rgba(244, 67, 54, 1)",minHeight:"42vh"},value:"a",onClick:this.handleClick,fullWidth:!0},i.a.createElement(D.a,{style:{color:"white",fontSize:50}}))),i.a.createElement(O.a,{item:!0,xs:6},i.a.createElement(g.a,{variant:"contained",style:{backgroundColor:"rgba(63, 81, 181, 1)",minHeight:"42vh"},value:"b",onClick:this.handleClick,fullWidth:!0},i.a.createElement(z.a,{style:{color:"white",fontSize:50}}))),i.a.createElement(O.a,{item:!0,xs:6},i.a.createElement(g.a,{variant:"contained",style:{backgroundColor:"rgba(255, 152, 0, 1)",minHeight:"42vh"},value:"c",onClick:this.handleClick,fullWidth:!0},i.a.createElement(W.a,{style:{color:"white",fontSize:50}}))),i.a.createElement(O.a,{item:!0,xs:6},i.a.createElement(g.a,{variant:"contained",style:{backgroundColor:"rgba(76, 175, 80, 1)",minHeight:"42vh"},value:"d",onClick:this.handleClick,fullWidth:!0},i.a.createElement(M.a,{style:{color:"white",fontSize:50}})))))}}]),t}(r.Component)),Ce=function(e){function t(){return Object(c.a)(this,t),Object(u.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(E.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e;e=this.props.lastCorrect?i.a.createElement("div",null,"Correct"):i.a.createElement("div",null,"Incorrect");var t,n=this.props.streak;t=n>0?i.a.createElement("div",null,"Your streak is ".concat(n)):i.a.createElement(i.a.Fragment,null);var a,r=this.props.rank;return a=1===r?i.a.createElement("div",null,"You are in 1st place"):2===r?i.a.createElement("div",null,"You are in 2nd place"):3===r?i.a.createElement("div",null,"You are in 3rd place"):i.a.createElement("div",null,"You are in ".concat(r,"th place")),i.a.createElement("div",null,i.a.createElement("div",null,e),i.a.createElement("div",null,t),i.a.createElement("div",null,a))}}]),t}(r.Component);var Ie=function(e){var t;return t=1===e.rank?i.a.createElement("div",null,"1st place"):2===e.rank?i.a.createElement("div",null,"2nd place"):3===e.rank?i.a.createElement("div",null,"3rd place"):i.a.createElement("div",null,"".concat(e.rank,"th place")),i.a.createElement("div",null,t)},ke=function(e){return i.a.createElement("div",null,i.a.createElement(Ie,{rank:e.rank}),i.a.createElement("div",null,"Score: ",e.score))},_e=function(e){function t(){var e;return Object(c.a)(this,t),(e=Object(u.a)(this,Object(m.a)(t).call(this))).nextStep=function(){var t=e.state.step;e.setState({step:t+1})},e.submitAnswer=function(t){console.log("Answer submitted:",t),e.setState({answer:t});var n={answer:t,pin:e.state.pin};a.emit(I.ANSWER_SUBMITTED,n)},e.state={step:1,nickname:null,pin:null,answer:null,score:0,streak:0,rank:0,lastCorrect:!1,totalCorrect:0,questionNumber:1,totalNumberOfQuestions:null,answers:[]},e}return Object(E.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=n(40).parse(this.props.location.search),r=t.nickname,i=t.pin;console.log("Player joined room with pin:",i),this.setState({nickname:r,pin:i}),a.emit(I.FETCH_NUMBER_OF_QUESTIONS,i),a.on(I.RECEIVE_NUMBER_OF_QUESTIONS,(function(t){e.setState({totalNumberOfQuestions:parseInt(t)})})),a.on(I.RECEIVE_ANSWER_OPTIONS,(function(t){e.setState({questionNumber:t.questionNumber,answers:t.answers})})),a.on(I.ANSWER_RESULT,(function(t){e.setState({lastCorrect:!0})})),a.on(I.QUESTION_RESULT,(function(t){var n=e.state,r={nickname:n.nickname,pin:n.pin};a.emit(I.FETCH_SCORE,r)})),a.on(I.PLAYER_RESULTS,(function(t){var n=e.state.step,a=t.score,r=t.rank,i=t.streak,s=t.lastCorrect;e.setState({score:a,streak:i,rank:r,lastCorrect:s,step:n+1})})),a.on(I.RECEIVE_NEXT_ANSWER_OPTIONS,(function(t){e.state.step;var n=t.questionNumber,a=t.totalNumberOfQuestions,r=t.answers;e.setState({questionNumber:n,totalNumberOfQuestions:a,answers:r})})),a.on(I.GO_TO_NEXT,(function(){e.setState({step:1})})),a.on(I.GAME_OVER,(function(){var t=e.state.pin;a.emit(I.PLAYER_RANK,t)})),a.on(I.FINAL_RANK,(function(t){var n=t.score,a=t.totalCorrect,r=t.rank;e.setState({score:n,totalCorrect:a,rank:r})})),a.on(I.FINAL,(function(){e.state.step;e.setState({step:4})}))}},{key:"render",value:function(){var e=this.state.step,t=this.state,n=t.pin,a=t.nickname,r=(t.answer,t.score),s=t.streak,l=t.lastCorrect,c=t.questionNumber,o=t.totalNumberOfQuestions,u=t.answers,m=t.rank;switch(console.log("Current step:",e),e){case 1:return i.a.createElement(Se,{nextStep:this.nextStep,pin:n,nickname:a,questionNumber:c,totalNumberOfQuestions:o});case 2:return i.a.createElement(Ne,{submitAnswer:this.submitAnswer,pin:n,nickname:a,questionNumber:c,totalNumberOfQuestions:o,answers:u});case 3:return i.a.createElement(Ce,{lastCorrect:l,streak:s,rank:m,score:r});case 4:return i.a.createElement(ke,{rank:m,score:r})}}}]),t}(r.Component),we=(n(192),function(e){function t(){var e;return Object(c.a)(this,t),(e=Object(u.a)(this,Object(m.a)(t).call(this))).state={nickname:null,pin:null},e}return Object(E.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=n(40).parse(this.props.location.search),r=t.nickname,i=t.pin;console.log("Instruction page for player in room:",i),this.setState({nickname:r,pin:i}),a.on(I.GAME_HAS_STARTED,(function(){e.props.history.push("/getready?nickname=".concat(e.state.nickname,"&pin=").concat(e.state.pin))}))}},{key:"render",value:function(){return i.a.createElement(O.a,{container:!0,justify:"center",alignItems:"center",style:{minHeight:"100vh"}},i.a.createElement(O.a,{item:!0,container:!0,justify:"space-between",alignItems:"center",xs:12,style:{minHeight:"15vh"},className:"info"},i.a.createElement("div",null,"PIN: ",this.state.pin),i.a.createElement("div",null,this.state.nickname)),i.a.createElement(O.a,{item:!0,container:!0,xs:12,spacing:4,direction:"column",justify:"center",alignItems:"center",style:{minHeight:"85vh"},className:"main-info"},i.a.createElement(O.a,{item:!0,xs:12,className:"in"},"You're in"),i.a.createElement(O.a,{item:!0,xs:12,className:"name"},"See your nickname on screen?")))}}]),t}(r.Component)),je=(n(193),function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(u.a)(this,Object(m.a)(t).call(this,e))).state={nickname:null,pin:null},n}return Object(E.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=n(40).parse(this.props.location.search),a=t.nickname,r=t.pin;console.log("Get ready page for player in room:",r),this.setState({nickname:a,pin:r}),setTimeout((function(){e.props.history.push("/playblock?nickname=".concat(e.state.nickname,"&pin=").concat(e.state.pin))}),5e3)}},{key:"render",value:function(){return i.a.createElement(O.a,{container:!0,justify:"center",alignItems:"center",style:{minHeight:"100vh"}},i.a.createElement(O.a,{item:!0,container:!0,justify:"space-between",alignItems:"center",xs:12,style:{minHeight:"15vh"},className:"info"},i.a.createElement("div",null,"PIN: ",this.state.pin),i.a.createElement("div",null,this.state.nickname)),i.a.createElement(O.a,{item:!0,container:!0,xs:12,alignItems:"center",justify:"center",style:{minHeight:"85vh"},className:"ready-block"},"Get ready"))}}]),t}(r.Component)),Ae=n(33);var Te=function(){return i.a.createElement("div",{className:"app"},i.a.createElement(C,null),i.a.createElement(h.a,null,i.a.createElement(Ae.c,null,i.a.createElement(Ae.a,{exact:!0,path:"/",component:re}),i.a.createElement(Ae.a,{exact:!0,path:"/instructions",component:we}),i.a.createElement(Ae.a,{exact:!0,path:"/getready",component:je}),i.a.createElement(Ae.a,{exact:!0,path:"/lobby",component:x}),i.a.createElement(Ae.a,{exact:!0,path:"/start",component:R}),i.a.createElement(Ae.a,{exact:!0,path:"/gameblock",component:J}),i.a.createElement(Ae.a,{exact:!0,path:"/playblock",component:_e}),i.a.createElement(Ae.a,{exact:!0,path:"/quizzes/new",component:Oe}),i.a.createElement(Ae.a,{path:"/quizzes/:quizId",component:b}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(i.a.createElement(Te,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},5:function(e,t){e.exports={GAME_INTRO:"GAME_INTRO",FETCH_NUMBER_OF_QUESTIONS:"FETCH_NUMBER_OF_QUESTIONS",RECEIVE_NUMBER_OF_QUESTIONS:"RECEIVE_NUMBER_OF_QUESTIONS",FETCH_INTRO:"FETCH_INTRO",HOST_JOINED:"HOST_JOINED",HOST_STARTED_GAME:"HOST_STARTED_GAME",SHOW_PIN:"SHOW_PIN",UPDATE_PLAYERS_IN_LOBBY:"UPDATE_PLAYERS_IN_LOBBY",PLAYER_JOINED:"PLAYER_JOINED",PLAYER_JOINED_SUCCESSFULLY:"PLAYER_JOINED_SUCCESSFULLY",WAITING_FOR_START:"WAITING_FOR_START",GAME_NOT_FOUND:"GAME_NOT_FOUND",GAME_HAS_STARTED:"GAME_HAS_STARTED",READY:"READY",FETCH_QUESTION:"FETCH_QUESTION",RECEIVE_QUESTION:"RECEIVE_QUESTION",RECEIVE_ANSWER_OPTIONS:"RECEIVE_ANSWER_OPTIONS",ANSWER_SUBMITTED:"ANSWER_SUBMITTED",UPDATE_PLAYERS_ANSWERED:"UPDATE_PLAYERS_ANSWERED",ANSWER_RESULT:"ANSWER_RESULT",QUESTION_RESULT:"QUESTION_RESULT",QUESTION_END:"QUESTION_END",FETCH_TIME:"FETCH_TIME",TIME:"TIME",FETCH_SCOREBOARD:"FETCH_SCOREBOARD",RECEIVE_SCOREBOARD:"RECEIVE_SCOREBOARD",FETCH_SCORE:"FETCH_SCORE",PLAYER_RESULTS:"PLAYER_RESULTS",FETCH_NEXT_QUESTION:"FETCH_NEXT_QUESTION",NEXT_QUESTION:"NEXT_QUESTION",NEXT:"NEXT",GO_TO_NEXT:"GO_TO_NEXT",RECEIVE_NEXT_ANSWER_OPTIONS:"RECEIVE_NEXT_ANSWER_OPTIONS",GAME_OVER:"GAME_OVER",FINISH_GAME:"FINISH_GAME",PLAYER_RANK:"PLAYER_RANK",FINAL_RANK:"FINAL_RANK",FINAL:"FINAL"}}},[[120,1,2]]]);
//# sourceMappingURL=main.da230f77.chunk.js.map