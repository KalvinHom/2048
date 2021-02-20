const WIDTH = 4;
const HEIGHT = 4;
const CELL_SIZE = 100;

const NEW_TILE = -1;
class Board {
  constructor() {
    this.board = Array(HEIGHT)
      .fill()
      .map(() => Array(WIDTH).fill(0));

    this.actions = Array(HEIGHT)
      .fill()
      .map(() => Array(WIDTH).fill(0));

    this.canvas = document.querySelector("canvas.board");
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.context = this.canvas.getContext("2d");
  }

  newPiece() {
    let x, y;
    do {
      x = Math.floor(Math.random() * WIDTH);
      y = Math.floor(Math.random() * HEIGHT);
    } while (this.board[y][x] != 0);

    const rand = Math.floor(Math.random() * 10);
    this.board[y][x] = rand == 0 ? 4 : 2;
    this.actions[y][x] = NEW_TILE;
    console.log(this.actions[y][x]);
    console.log(this.actions);
  }

  //TODO: combine left/right/up/down when not lazy
  moveLeft() {
    let validMove = false;
    for (let y = 0; y < HEIGHT; y++) {
      for (let x = 0; x < WIDTH; x++) {
        console.log(`evaluating ${x}, ${y}`);
        console.log(`current value is ${this.board[y][x]}`);
        const nextVal = this.getNextValue(x + 1, y, 1);
        console.log(`closet value is at ${nextVal}: ${this.board[y][nextVal]}`);
        if (nextVal == -1) break;

        if (this.board[y][x] == 0) {
          console.log("nextVal: " + nextVal);
          validMove = true;
          this.board[y][x] = this.board[y][nextVal];
          this.board[y][nextVal] = 0;
          x--;
        } else if (this.board[y][x] == this.board[y][nextVal]) {
          validMove = true;

          this.board[y][x] *= 2;
          this.board[y][nextVal] = 0;
        }
      }
    }
    return validMove;
  }

  moveRight() {
    let validMove = false;
    console.log("moveRight");
    for (let y = 0; y < HEIGHT; y++) {
      for (let x = WIDTH - 1; x >= 0; x--) {
        console.log(`evaluating ${x}, ${y}`);
        console.log(`current value is ${this.board[y][x]}`);
        const nextVal = this.getNextValue(x - 1, y, -1);
        console.log(`closet value is at ${nextVal}: ${this.board[y][nextVal]}`);

        console.log(`${x}, ${y}`);
        if (nextVal == -1) break;

        if (this.board[y][x] == 0) {
          console.log("nextVal: " + nextVal);
          validMove = true;
          this.board[y][x] = this.board[y][nextVal];
          this.board[y][nextVal] = 0;
          x++;
        } else if (this.board[y][x] == this.board[y][nextVal]) {
          validMove = true;

          this.board[y][x] *= 2;
          this.board[y][nextVal] = 0;
        }
      }
    }
    return validMove;
  }

  moveUp() {
    let validMove = false;
    for (let x = 0; x < WIDTH; x++) {
      for (let y = 0; y < HEIGHT; y++) {
        const nextVal = this.getNextYValue(x, y + 1, 1);
        console.log("nextVal: " + nextVal);
        if (nextVal == -1) break;

        if (this.board[y][x] == 0) {
          validMove = true;
          this.board[y][x] = this.board[nextVal][x];
          this.board[nextVal][x] = 0;
          y--;
        } else if (this.board[y][x] == this.board[nextVal][x]) {
          validMove = true;

          this.board[y][x] *= 2;
          this.board[nextVal][x] = 0;
        }
      }
    }
    return validMove;
  }

  moveDown() {
    let validMove = false;
    console.log("moveRight");
    for (let x = 0; x < WIDTH; x++) {
      for (let y = HEIGHT - 1; y >= 0; y--) {
        const nextVal = this.getNextYValue(x, y - 1, -1);
        console.log("nextVal: " + nextVal);
        if (nextVal == -1) break;

        console.log(`${x}, ${y}`);
        if (this.board[y][x] == 0) {
          validMove = true;
          this.board[y][x] = this.board[nextVal][x];
          this.board[nextVal][x] = 0;
          this.actions[y][x] = [0, y - nextVal];
          y++;
        } else if (this.board[y][x] == this.board[nextVal][x]) {
          validMove = true;

          this.board[y][x] *= 2;
          this.board[nextVal][x] = 0;
        }
      }
    }
    return validMove;
  }

  getNextValue(x, y, dir) {
    while (x >= 0 && x < WIDTH) {
      if (this.board[y][x] != 0) {
        // const val = this.board[y][x];
        // this.board[y][x] = 0;
        return x;
      }
      x += dir;
    }
    return -1;
  }

  getNextYValue(x, y, dir) {
    while (y >= 0 && y < HEIGHT) {
      if (this.board[y][x] != 0) {
        // const val = this.board[y][x];
        // this.board[y][x] = 0;
        return y;
      }
      y += dir;
    }
    return -1;
  }

  style(y, x) {
    if (this.actions[y][x] == NEW_TILE) return "new-tile";

    return "normal";
  }
  draw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    console.log(this.actions);
    for (let y = 0; y < HEIGHT; y++) {
      for (let x = 0; x < WIDTH; x++) {
        var content =
          this.board[y][x] == 0
            ? ""
            : `<div class="${this.style(y, x)}">${this.board[y][x]}</div>`;
        document
          .getElementsByClassName("grid-row")
          [y].getElementsByClassName("grid-cell")[x].innerHTML = content;

        document
          .getElementsByClassName("grid-row")
          [y].getElementsByClassName("grid-cell")[x].style.transform =
          "translate(25px, 0px)";
        this.context.font = "40px serif";

        document
          .getElementsByClassName("grid-row")
          [y].getElementsByClassName("grid-cell")[x];
        this.context.fillText(
          this.board[y][x],
          50 + x * CELL_SIZE,
          50 + y * CELL_SIZE
        );
      }
      this.actions[y].fill(0);
      console.log(this.actions[y]);
    }
  }
}

export default Board;
