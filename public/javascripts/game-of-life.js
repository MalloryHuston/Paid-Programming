// https://stackoverflow.com/questions/1431094/how-do-i-replace-a-character-at-a-particular-index-in-javascript
String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
  }
  
  /**
   * Idea: start with a list of cells, 
   * as you collect a radius + neighbors and neighbors neighbors 
   * subtract them from the list of cells
   * Then when you've ran out of neighbors by neighbors that's a group
   * then you can grab the first item out of the list of cells that 
   * hasn't been removed yet.
   * This will get you groups, not sure if this helps anything though, 
   * or maybe it's a fast way to go about things iterating off of 
   * this idea for grabing your collection to run against.
   */
  
  class Cell {
    constructor(x, y) {
      Object.assign(this, {
        x,
        y
      })
    }
  
    neighbors() {
      // Fetch cache or calculate
      let neighbors = this._neighbors || grid.collection.filter((cell) => {
        return Math.abs(this.x - cell.x) < 2 &&
          Math.abs(this.y - cell.y) < 2 &&
          (cell.x != this.x && cell.y != this.y);
      });
  
      // Update cache
      this._neighbors = neighbors;
  
      return neighbors;
    }
  
    thrives() {
      /*
          Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
          Any live cell with two or three live neighbours lives on to the next generation.
          Any live cell with more than three live neighbours dies, as if by overpopulation.
          Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
      */
      switch (this.neighbors().length) {
        case 2:
          return true;
        case 3:
          return true;
        default:
          return false;
      }
    }
  
    newLife() {
      grid.collection.filter((cell) => {
  
      });
    }
  }
  
  class Grid {
    constructor() {
      this.collection = [];
    }
  
    add(cell) {
      this.collection.push(cell);
    }
  
    /**
     * Simple Idea: get rectangular min, max of region
     * Complex Idea: get neighbors of all nodes that aren't alive; radius + 1
     */
    bounds() {
      var minX, minY, maxX, maxY;
  
      let first = this.collection[0];
      minX = first.x;
      maxX = first.x;
      minY = first.y;
      maxY = first.y;
  
      this.collection.forEach((cell) => {
  
        //console.log(cell);
  
        if (cell.x <= minX) {
          minX = cell.x;
        }
        if (cell.x >= maxX) {
          maxX = cell.x;
        }
        if (cell.y <= minY) {
          minY = cell.y;
        }
        if (cell.y >= maxY) {
          maxY = cell.y;
        }
      });
      return {
        minX,
        minY,
        maxX,
        maxY
      };
    }
  
    border() {
  
    }
  
    tick() {
  
    }
  
    UI() {
      let bounds = this.bounds();
      let lines = [];
      let width = bounds.maxX - bounds.minX + 1;
  
      // Build empty grid
      for (let y = bounds.minY; y <= bounds.maxY; y++) {
        lines.push('0'.repeat(width));
      }
  
      // Update grid with cells
      this.collection.forEach((cell) => {
        let y = cell.y - bounds.minY;
        let line = lines[y];
        lines[y] = line.replaceAt(cell.x - bounds.minX, 'X');
      });
      
      return lines;
    }
  
    print() {
      this.UI().forEach((line) => {
        console.log(line);
      });
    }
  }
  
  //// TEST LAND™ /////
  
  var grid = new Grid();
  
  // No Neighbors
  let theFirst = new Cell(2, 2);
  grid.add(theFirst);
  console.log('The first has no neighbors', theFirst.neighbors().length == 0, theFirst.neighbors().length);
  console.log('The first is not active', !theFirst.thrives());
  
  // One Neighbor
  let firstNeighbor = new Cell(1, 1);
  grid.add(firstNeighbor);
  console.log('The first has one neighbor', theFirst.neighbors().length == 1, theFirst.neighbors().length);
  console.log('The First Neighbor has one neighbor', firstNeighbor.neighbors().length == 1, firstNeighbor.neighbors().length);
  console.log('The first neighbor is not active', !theFirst.thrives());
  
  // Two Neighbors
  let secondNeighbor = new Cell(2, 1);
  grid.add(secondNeighbor);
  console.log('Two Neighbors', theFirst.neighbors().length == 2, theFirst.neighbors().length);
  console.log('The second neighbor is active', !secondNeighbor.thrives());
  
  // Three Neighbors
  let thirdNeighbor = new Cell(3, 1);
  grid.add(thirdNeighbor);
  console.log('Three Neighbors', theFirst.neighbors().length == 3, theFirst.neighbors().length);
  
  console.log("BOUNDS", grid.bounds());
  
  
  
  grid.print();