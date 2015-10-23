import React, { Component, PropTypes } from 'react';

const Cell = ({ symbol }) => (
  <div className={`symbol icon-${symbol}`}>
    <span className="text">{symbol}</span>
  </div>
);

export default class Board extends Component {
  static contextTypes = {
    game: PropTypes.object
  }

  render() {
    const { game } = this.context;
    const { board } = game;

    return (
      <div className="board">
        {board.map((row, r) => <div key={`row${r}`} className="row">
          {row.map((cell, c) => <Cell key={`cell${c}`} symbol={cell.symbol} />)}
        </div>)}
      </div>
    );
  }
}
