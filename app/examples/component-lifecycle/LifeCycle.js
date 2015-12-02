/**
 * Component Lifecycle
 *
 *
 * More reading: https://facebook.github.io/react/docs/component-specs.html#lifecycle-methods
 */
import React, { Component } from 'react';
import Badge from './Badge';
import Cell from './Cell';
import './lifecycle.less';

export default class Lifecycle extends Component {

  // Much like "initComponent"
  constructor() {
    super();

    this.colors = {
      newCell : '#00BFFF',
      oldCell : '#A6A6A6'
    };

    this.generation    = 0;
    this.maxGeneration = 400;
    this.intervalTime  = 100;

    // If you need to set an initial empty state, do that here.
    this.state = {
      cells: {}
    };
  }

  // Think of this method as a "beforeRender" but called once on both client and server
  componentWillMount() {
  }

  /**
   * This method is similar to "afterRender" and is called only once on the client (not on the server).
   * Child "componentDidMount" methods are called before the parent.
   * This is the best place to hook in other frameworks, make AJAX requests and set timers.
   */
  componentDidMount() {
    // R-pentomino
    let seed = {
      x40y35 : { xPos : 40, yPos : 35 },
      x41y35 : { xPos : 41, yPos : 35 },
      x41y36 : { xPos : 41, yPos : 36 },
      x42y36 : { xPos : 42, yPos : 36 },
      x41y37 : { xPos : 41, yPos : 37 }
    };

    this.setState({
      cells: Object.assign({}, seed)
    });

    this.intervalId = setInterval(this.updateCells.bind(this), this.intervalTime);
  }

  // You can think of this as something of a "setter" for the component. It gets called when new props are set.
  componentWillReceiveProps() {
  }

  /** 
   * Called before rendering, when props or state changes. Like an "apply" method, you can return false to
   * prevent updating. Unless you have a godd reason, this should just return true or simply not be used.
   * Note: this is not called for the initial render.
   */
  shouldComponentUpdate(nextProps, nextState) {
    if (Object.keys(nextState).length === 0 || this.generation >= this.maxGeneration) {
      this.endSimulation();
      return false;
    }

    return true;
  }

  // Also called before rendering but not for the initial render. This method is not preventable.
  componentWillUpdate() {
  }

  // Like "afterRender" but not called for the initial render.
  componentDidUpdate() {
    this.generation++;    
  }

  // Much like "onDestroy". Take care of any extra cleanup here (timers, objects, DOM elements, etc)
  componentWillUnmount() {
    this.endSimulation();
  }

  render() {
    var { cells } = this.state,
        cellKeys  = Object.keys(cells);

    return (
      <div className="board">
        <Badge subhead="gen"   value={this.generation} />
        <Badge subhead="cells" value={cellKeys.length} />
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