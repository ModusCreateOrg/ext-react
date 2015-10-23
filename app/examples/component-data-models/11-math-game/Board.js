import React, { Component, PropTypes } from 'react';
import Cell from './Cell';

/**
 * Renders rows with cells that make up a game board
 * The reference to the game instance comes from the context
 */
export default class Board extends Component {
  static contextTypes = {
    game: PropTypes.object
  }

  render() {
    const { game } = this.context;
    const { board } = game;

    return (
      <div className="board">
        {board.map((row, rowIdx) => <div key={`row${rowIdx}`} className="row">
          {row.map((cell, cellIdx) => <Cell key={`cell${cellIdx}`} symbol={cell.symbol} />)}
        </div>)}
      </div>
    );
  }
}
