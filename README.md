# Quizy

## Table of Contents
* [Introduction](#introduction)
* [How to get started](#how-to-get-started)
* [Motivation](#motivation)
* [Technologies](#technologies)
* [Key Features](#key-features)
* [Future Developments](#future-developments)
* [Screenshots](#screenshots)

<a name="introduction"></a>
## Introduction

This project is a multiplayer quiz app inspired by [Kahoot!](https://kahoot.com/). Kahoot! is a game-based learning platform that is interactive and makes learning fun. It was used during the Software Engineering Immersive course I had undertaken.

The gameplay is simple:
* A quiz, created by a user, is hosted by a teacher or another person, which generates a game PIN. The game is shown on a common screen.
* Players connect to the game using the PIN.
* The common screen is used to display the questions that the players answer.
* Points are awarded for correct answers. Also, the more timely a player answers correctly, the more points the player receives.
* Scoreboards are updated and shown after every question.
* When the game ends (i.e. there are no questions left), a Top 3 podium finish is shown and each player receives their own rank.

<a name="how-to-get-started"></a>
## How to get started

#### Using my site
1. Visit https://jeffreyquan.github.io/quizy-client/ and follow the links to host one of the existing quizzes or create your own.
2. Click on "Host Game", which will generate a game that'll show a game PIN for other players to use their own devices to join the game. Hosting a game works best on a projector but will also work with any desktop or laptop screen.
3. Test it out with this simple math quiz. Host using this [link](https://jeffreyquan.github.io/quizy-client/#/quizzes/5df46a5211425013c645572e) and join using this [link](https://jeffreyquan.github.io/quizy-client/).

#### To test locally
Feel free to clone this repository.
The link to the server repository is: https://github.com/jeffreyquan/quizy-server.

After cloning:

**In the client root directory in the terminal:**
1. Run `npm install` and
2. Run `PORT=3333 npm run start`

This will run using our server which was deployed to Heroku. To run the back-end server locally, change to Heroku links to http://localhost:3000/ and run the following:

**In the server root directory in the terminal:**
1. Run `npm install` and
2. Run `npm run start:dev`

<a name="motivation"></a>
## Motivation

I wanted to build something interactive and fun, that many users can be involved with at the same time in the same location. Furthermore, I loved the idea of a learning-based game that made it easier for students to learn.

<a name="technologies"></a>
## Technologies

This project is created with:

* [React v16.12.0](https://reactjs.org/)
* [Express v4.17.1](https://expressjs.com/) - Node.js web application framework
* [Mongoose v5.7.14](https://mongoosejs.com/)
* [MongoDB](https://www.mongodb.com/)
* [socket.io](https://socket.io/)
* [SCSS v4.13.0](https://sass-lang.com/)
* [Material UI](https://material-ui.com/) - a React framework for styling

## Packages (React)

* [axios](https://github.com/axios/axios) - used for requests to the Express API
* gh-pages - used to deploy the React front-end
* [Google fonts](https://github.com/google/fonts)
* [query-string](https://github.com/sindresorhus/query-string)

## Packages (Node)

* [body-parser](https://github.com/expressjs/body-parser)
* [cors](https://github.com/expressjs/cors)
* [express](https://github.com/expressjs/express)
* [mongoose](https://github.com/Automattic/mongoose)
* [socket.io](https://github.com/socketio/socket.io)
* [nodemon](https://github.com/remy/nodemon)

<a name="key-features"></a>
## Key Feaures
* **Simple creation of quiz** - simple quiz creation form that takes 4 multiple choice answers for each question. You can create a simple quiz to host within minutes.
* **Publicly available quizzes to host** - quizzes that other people have created can be hosted
* **Multiplayer quiz games** - friendly competition between players

<a name="future-developments"></a>
## Future Developments
These are following features I would like to add:
* **Validation** - at the moment, quizzes can be created without a name and category. This can lead to bugs. I will be adding validation across the whole app on the front-end and back-end.
* **Edit questions** - edit questions that have already been added during the creation of quizzes.
* **End quiz** - end quiz button that allows the host to end a quiz early (for example, when a class is about to end and the quiz needs to finish).
* **Custom time for each question** - default time set for each question is 20 seconds. I would like to allow the creation of a custom time, most likely increments of 10 seconds.
* **True or false questions** - default answer options are 4 multiple choice answers. I would like to allow true or false questions.
* **Images to supplement questions** - allowing users to add images to supplement questions when creating a quiz. This will be shown to players during a game.

There's so much more to add! Check out [Kahoot!](https://kahoot.com/) to test out their amazing platform.

<a name="screenshots"></a>
## Screenshots

### Create a quiz
![Create A Quiz - Details](/screenshots/create-quiz-details.png)
![Create A Quiz - Questions](/screenshots/create-quiz-questions.png)
![Create A Quiz - Confirmation](/screenshots/create-quiz-confirmation.png)

### All quizzes
![Quizzes - Index](/screenshots/quizzes-index.png)

### Quiz preview
![Quiz - Preview](/screenshots/quiz-preview.png)

### Game Play

#### Joining a game
| Host - Empty Lobby | Player - Join Game with PIN |
|:---:|:---:|
| ![Lobby - Empty](/screenshots/host-lobby-empty.png) | ![Player - Join Game](/screenshots/player-join-game.png) |

#### After players have entered
| Host - Filled Lobby | Player joined successfully |
|:---:|:---:|
| ![Lobby - Players Joined](/screenshots/host-lobby-players-joined.png) | ![Player - Instructions](/screenshots/player-instructions.png) |

#### Start of game
| Host previewing quiz | Player getting ready for first question |
|:---:|:---:|
| ![Quiz Preview](/screenshots/host-quiz-preview.png) | ![Player - Get Ready](/screenshots/player-get-ready.png) |

#### Question preview
| Host previewing question | Player preview showing question number |
|:---:|:---:|
| ![Host - Question Preview](/screenshots/host-question-preview.png) | ![Player - Question Preview](/screenshots/player-preview.png) |

#### Question and Answers
| Host showing the question and answer options | Player with answer buttons |
|:---:|:---:|
| ![Host - Question Block](/screenshots/host-question-block.png) | ![Player - Answers](/screenshots/player-answers.png) |

#### Results
| Host shows how many have selected each answer and the correct answer | Player is given correct or incorrect result, as well as rank and streak (if correct) |
|:---:|:---:|
| ![Host - Results](/screenshots/host-results.png) | ![Player - Result - Correct](/screenshots/player-result-correct.png) |

#### Scoreboard
##### Host shows scoreboard which gives the Top 5 ranked players and their scores
![Host - Scoreboard](/screenshots/host-scoreboard.png)

#### End of game
| Podium finish | Player's final rank |
|:---:|:---:|
| ![Host - Podiums](/screenshots/host-podiums.png) | ![Player - Final Rank](/screenshots/player-final-rank.png) |
