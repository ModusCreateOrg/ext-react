import React, { Component, PropTypes } from 'react';
import Game from './Game';

const MicroCell = ({ symbol }) => (
  <div className={`symbol icon-${symbol}`}>
    <span className="text">{symbol}</span>
  </div>
);

export default class Board extends Component {
  static propTypes = {
    game: PropTypes.instanceOf(Game)
  }

  static childContextTypes = {
    game: PropTypes.instanceOf(Game)
  }

  getChildContext() {
    return {
      game: this.props.game
    };
  }

  render() {
    const { game } = this.props;
    const { board } = game;

    return (
      <div className="board">
        {board.map((row, index) => <div className="row" key={index}>
          {row.map((cell, cellIdx) => <MicroCell symbol={cell.symbol} key={cellIdx} />)}
        </div>)}
      </div>
    );
  }
}
