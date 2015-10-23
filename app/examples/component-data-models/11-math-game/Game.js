/**
 * Utility function used for shuffling arrays
 * Credit goes to CoolAJ86 http://stackoverflow.com/a/2450976/857756
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

/**
 * Main game logic
 */
export default class Game {
  constructor(rows=3, cols=3) {
    this.rows = rows;
    this.cols = cols;

    this.setUpBoard();
  }

  /**
   * Symbols in play. Each of these will have a matching icon in game.less
   * @type {String[]}
   */
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

  /**
   * This will become an array of array - array of rows, each containing an
   * array of cells
   * @type {Array[]}
   */
  board = []

  /**
   * Number of unknown variables (symbols)
   * @type {Number}
   */
  unknowns = 3

  /**
   * Maximum symbol value
   * @type {Number}
   */
  maxValue = 10

  /**
   * Contains the selected symbols.
   * E.g. if unkowns = 3, then this array will contain 3 symbols that are in use
   * in the game
   * @type {Object[]}
   */
  gameSymbols = []

  /**
   * Let's pick the symbols, assign values, shuffle, and form a board
   */
  setUpBoard() {
    const { rows, board, cols } = this;
    let flatRows = [];
    let i;

    // reset board
    board.length = 0;

    // fetching random game symbols
    this.gameSymbols = this.getRandomSymbols();

    // create shuffled cells
    // this is going to be one flat array with all the cells that are yet
    // to be placed in rows
    for (i = 0; i < rows; i++) {
      flatRows = [...shuffle(this.gameSymbols), ...flatRows]; // woah!
    }

    // shuffle the entire thing once more
    // we only shuffled a row-worth of symbols at once in the previous loop
    // now we'll mix them all up
    flatRows = shuffle(flatRows);

    // create rows and push to the board
    for (i = 0; i < rows; i++) {
      const row = flatRows.splice(0, cols);
      const sum = this.sumValues(row);
      row.push({symbol: sum}); // last cell in a row contains the sum
      board.push(row);
    }

    // The final row is for column sums
    const lastRow = [];
    for (i = 0; i < cols; i++) {
      const keys = Array.from({length: rows}, (v, k) => k);
      const column = Array.from(keys, (row) => board[row][i]);
      const sum = this.sumValues(column);
      lastRow.push({symbol: sum}); // last cell in a column contains column sums
    }
    board.push(lastRow);
  }

  /**
   * Calculate the sum of cell values
   * Notice the double ~~ operator that makes it easy to convert empty string to 0
   * @param  {Object[]} arrCells Array of cells
   * @return {Number} Sum of values
   */
  sumValues(arrCells) {
    return arrCells.reduce((sum, val) => ~~( sum.value || sum ) + val.value);
  }

  /**
   * Extract one random symbol from the supplied array
   * @param  {Sting[]} symbols Array of symbols
   * @return {String} Symbol
   */
  randomSymbol(symbols) {
    return symbols[Math.floor(Math.random() * symbols.length)];
  }

  /**
   * Get N random symbols where N = this.unknowns
   * @return {Object[]} Symbol objects
   */
  getRandomSymbols() {
    const { unknowns, symbols, randomSymbol, maxValue } = this;
    // Clone the symbols source so we can manipulate the array later
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
