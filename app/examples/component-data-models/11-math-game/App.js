import React, { Component, PropTypes } from 'react';
import Game from './Game';
import Board from './Board';
import Results from './Results';
import './game.less';

/**
 * Define the app
 */
export default class App extends Component {
  /**
   * Register context types that children can access
   * game is required and it has to be an instance of the Game object
   */
  static childContextTypes = {
    game: PropTypes.instanceOf(Game).isRequired
  }

  /**
   * Initially define state and start a game
   * @prop success {Boolean} true when game is over
   */
  state = {
    success: false,
    game: new Game()
  }

  /**
   * Child context value is extracted from this component's state
   */
  getChildContext() {
    return {
      game: this.state.game
    };
  }

  /**
   * Mark game over when all values are solved
   */
  onSuccess() {
    this.setState({success: true});
  }

  /**
   * Restart game involves creating a new instance of Game and setting
   * success to false - meaning the game is not over yet
   */
  restart() {
    this.setState({
      game: new Game(),
      success: false
    });
  }

  render() {
    // extract success from state
    const { success } = this.state;

    // show the game over overlay if success is true
    const successCls = success ? 'win' : 'gameon';

    return (
      <div className="game">
        <div className={successCls} onClick={::this.restart}>Game over!</div>
        <div className="board">
            <Board />
        </div>
        <div className="results">
          <Results onSuccess={::this.onSuccess} />
        </div>
      </div>
    );
  }
}
