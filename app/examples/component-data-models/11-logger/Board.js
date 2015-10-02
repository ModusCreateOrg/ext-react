import React, { Component, PropTypes } from 'react';
import Game from './Game';

const MicroCell = ({ symbol }) => (
  <div className={`symbol icon-${symbol}`}>
    {symbol}
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
        {board.map(row => <div className="row">
          {row.map(cell => <MicroCell symbol={cell.symbol} />)}
        </div>)}
      </div>
    );
  }
}
