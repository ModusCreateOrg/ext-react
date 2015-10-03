/**
 * Shuffle array
 * @param  {Array} array Array to shuffle
 * @return {Array}       New shuffled array
 */
function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export default class Game {
  constructor(rows=3, cols=3) {
    this.rows = rows;
    this.cols = cols;

    this.setUpBoard();
  }

  symbols = [
    'X',
    'Y',
    'Z',
    'A',
    'B',
    'C',
    'Foo',
    'Bar',
    'Baz'
  ]

  board = []

  unknowns = 3

  maxValue = 10

  gameSymbols = []

  setUpBoard() {
    const { rows, board, cols } = this;
    const selectedSymbols = this.getRandomSymbols();
    let flatRows = [];
    let i;

    // reset board
    board.length = 0;

    this.gameSymbols = selectedSymbols;

    // create shuffled rows
    for (i = 0; i < rows; i++) {
      flatRows = [...shuffle(selectedSymbols), ...flatRows];
    }

    // shuffle the entire thing once more
    flatRows = shuffle(flatRows);

    // push rows to the board
    for (i = 0; i < rows; i++) {
      const row = flatRows.splice(0, cols);
      const sum = this.sumValues(row);
      row.push({symbol: sum});
      board.push(row);
    }

    // final result row
    const lastRow = [];
    for (i = 0; i < cols; i++) {
      const keys = Array.from({length: rows}, (v, k) => k);
      const column = Array.from(keys, (row) => board[row][i]);
      const sum = this.sumValues(column);
      lastRow.push({symbol: sum});
    }
    board.push(lastRow);
  }

  sumValues(arrCells) {
    return arrCells.reduce((sum, val) => ~~( sum.value || sum ) + val.value);
  }

  randomSymbol(symbols) {
    return symbols[Math.floor(Math.random() * symbols.length)];
  }

  getRandomSymbols() {
    const { unknowns, symbols, randomSymbol, maxValue } = this;
    const localSymbols = Array.from(symbols);
    const selection = [];

    for (let i = 0; i < unknowns; i++) {
      // get one random symbol
      const picked = randomSymbol(localSymbols);

      // save it and add random value to it
      selection.push({
        symbol: picked,
        value: Math.round(Math.random() * maxValue)
      });

      // remove that symbol so that it doesn't repeat
      localSymbols.splice(localSymbols.indexOf(picked), 1);
    }

    return selection;
  }
}
