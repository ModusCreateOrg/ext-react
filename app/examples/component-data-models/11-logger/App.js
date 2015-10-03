import React, { Component } from 'react';
import Board from './Board';
import Game from './Game';
import Results from './Results';
import './game.less';

export default class App extends Component {
  state = {
    success: false,
    game: new Game()
  }

  onSuccess() {
    this.setState({success: true});
  }

  restart() {
    this.setState({
      game: new Game(),
      success: false
    });
  }

  render() {
    const { game, success } = this.state;
    const successCls = success ? 'win' : 'gameon';

    return (
      <div className="game">
        <div className={successCls} onClick={::this.restart}>Game over!</div>
        <div className="board">
            <Board game={game} />
        </div>
        <div className="results">
          <Results game={game} onSuccess={::this.onSuccess} />
        </div>
      </div>
    );
  }
}
