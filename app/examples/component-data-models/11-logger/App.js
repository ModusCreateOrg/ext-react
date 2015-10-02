import React, { Component } from 'react';
import Board from './Board';
import Game from './Game';
import './game.less';

export default class App extends Component {
  render() {
    return (
      <div className="game">
        <div className="board">
            <Board game={new Game()}/>
        </div>
        <div className="results"></div>
      </div>
    );
  }
}
