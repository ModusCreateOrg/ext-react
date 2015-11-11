/**
 * Component Lifecycle
 *
 *
 * More reading: https://facebook.github.io/react/docs/component-specs.html#lifecycle-methods
 */
import React, { Component } from 'react';
import Cell from './Cell';
import './lifecycle.less';

export default class Lifecycle extends Component {

  constructor() {
    super();

    this.colors = {
      newCell : '#00BFFF',
      oldCell : '#A6A6A6'
    };

    this.generation    = 0;
    this.maxGeneration = 200;
    this.intervalTime  = 300;

    // Set an initial empty state here
    this.state = {
      cells: {}
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
    // R-pentomino
    let seed = {
      x20y25 : { xPos : 20, yPos : 25 },
      x21y25 : { xPos : 21, yPos : 25 },
      x21y26 : { xPos : 21, yPos : 26 },
      x22y26 : { xPos : 22 ,yPos : 26 },
      x21y27 : { xPos : 21 ,yPos : 27 }
    };

    this.setState({
      cells: Object.assign({}, seed)
    });

    this.intervalId = setInterval(this.updateCells.bind(this), this.intervalTime);
  }

  componentWillReceiveProps() {
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (Object.keys(nextState).length === 0 || this.generation >= this.maxGeneration) {
      this.endSimulation();
      return false;
    }

    return true;
  }

  componentWillUpdate() {
  }

  componentDidUpdate() {
    this.generation++;    
  }

  componentWillUnmount() {
    this.endSimulation();
  }

  render() {
    var { cells } = this.state,
        cellKeys  = Object.keys(cells);

    return (
      <div className="board">
        <div className="generation">{this.generation}</div>
        {cellKeys.map(key => <Cell key={key} cell={ cells[key] } /> )}
      </div>
    );
  }

  updateCells() {
    var cells   = Object.assign({}, this.state.cells),
        nextGen = {},
        cellKeys;

    // reset cell colors
    cellKeys = Object.keys(cells);
    cellKeys.forEach(cellKey => cells[cellKey].color = this.colors.oldCell);

    // fill cells object with dead neighbors
    this.addDeadNeighborCells(cells);

    cellKeys = Object.keys(cells);
    cellKeys.forEach(function(cellKey) {
      let cell = cells[cellKey];

      if (this.shouldCellLive(cell)) {
        delete cell.dead;
        nextGen[cellKey] = cell;
      }
    }, this);

    // update state    
    this.setState({
      cells: nextGen
    });
  }

  addDeadNeighborCells(cells) {
    var cellKeys = Object.keys(cells);

    cellKeys.forEach(function(cellKey) {
      let cell = cells[cellKey];

      this.maybeAddDeadNeighbor(cells, cell, -1, -1);
      this.maybeAddDeadNeighbor(cells, cell,  0, -1);
      this.maybeAddDeadNeighbor(cells, cell,  1, -1);
      this.maybeAddDeadNeighbor(cells, cell, -1,  0);
      this.maybeAddDeadNeighbor(cells, cell,  1,  0);
      this.maybeAddDeadNeighbor(cells, cell, -1,  1);
      this.maybeAddDeadNeighbor(cells, cell,  0,  1);
      this.maybeAddDeadNeighbor(cells, cell, -1,  1);
    }, this);
  }

  maybeAddDeadNeighbor(cells, cell, xPos, yPos) {
      var neighborKey;

      xPos = cell.xPos + xPos;
      yPos = cell.yPos + yPos;
      neighborKey = `x${xPos}y${yPos}`;

      if (!cells[neighborKey]) {
        cells[neighborKey] = {
          xPos  : xPos,
          yPos  : yPos,
          dead  : true,
          color : this.colors.newCell
        }
      }
  }

  shouldCellLive(cell) {
      let neighbors = this.getCellNeighborCount(cell);

      if (cell.dead && neighbors === 3) {
        return true;
      }

      if (!cell.dead && neighbors >=2 && neighbors <= 3) {
        return true;
      }

      return false;
  } 

  getCellNeighborCount(cell) {
    var count = 0;

    count += (this.getCellByPos(cell.xPos - 1, cell.yPos - 1)? 1 : 0);
    count += (this.getCellByPos(cell.xPos + 0, cell.yPos - 1)? 1 : 0);
    count += (this.getCellByPos(cell.xPos + 1, cell.yPos - 1)? 1 : 0);
    count += (this.getCellByPos(cell.xPos - 1, cell.yPos + 0)? 1 : 0);
    count += (this.getCellByPos(cell.xPos + 1, cell.yPos + 0)? 1 : 0);
    count += (this.getCellByPos(cell.xPos - 1, cell.yPos + 1)? 1 : 0);
    count += (this.getCellByPos(cell.xPos + 0, cell.yPos + 1)? 1 : 0);
    count += (this.getCellByPos(cell.xPos + 1, cell.yPos + 1)? 1 : 0);

    return count;
  }

  getCellByPos(xPos, yPos) {
    return this.state.cells[`x${xPos}y${yPos}`];
  }

  endSimulation() {
    clearInterval(this.intervalId);
  }

}