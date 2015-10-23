import React, { Component, PropTypes } from 'react';
import Spinner from './Spinner';

const SymbolValueInput = ({ symbol, onChange }) => (
  <div className={`result symbol icon-${symbol.symbol}`}>
    <Spinner targetValue={symbol.value} onChange={(n, o, s)=>onChange(n, o, s, symbol)} />
  </div>
);

export default class Results extends Component {
  static propTypes = {
    onSuccess: PropTypes.func
  }

  static contextTypes = {
    game: PropTypes.object
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.game !== this.context.game;
  }

  onSpinnerChange(newValue, oldValue, spinner, symbol) {
    const { onSuccess } = this.props;
    const { game } = this.context;
    let notSolved;

    if (newValue === spinner.props.targetValue) {
      symbol.found = true;
    } else {
      symbol.found = false;
    }

    notSolved = game.gameSymbols.some(item => item.found !== true);

    if (notSolved === false && onSuccess) {
      onSuccess();
    }
  }

  render() {
    const { gameSymbols } = this.context.game;

    return (
      <div className="results">
        {gameSymbols.map((symbol, index) => <SymbolValueInput
          symbol={symbol}
          key={index}
          onChange={::this.onSpinnerChange}
        />)}
      </div>
    );
  }
}
