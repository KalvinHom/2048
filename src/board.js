const WIDTH = 4;
const HEIGHT = 2;
const CELL_SIZE = 100;

class Board {
  constructor() {
    this.board = Array(HEIGHT)
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
  }

  moveLeft() {
    let validMove = false;
    for (let y = 0; y < HEIGHT; y++) {
      for (let x = 0; x < WIDTH; x++) {
        console.log(`${x}, ${y}`);
        console.log(this.board[y][x]);
        if (this.board[y][x] == 0) {
          const nextVal = this.getNextValue(x + 1, y, 1);
          console.log("nextVal: " + nextVal);
          if (nextVal == 0) break;
          validMove = true;
          this.board[y][x] = nextVal;
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
        const nextVal = this.getNextValue(x - 1, y, -1);
        console.log(`${x}, ${y}`);
        if (this.board[y][x] == 0) {
          console.log("nextVal: " + nextVal);
          if (nextVal == 0) break;
          validMove = true;
          this.board[y][x] = nextVal;
        } else if (this.board[y][x] == nextVal) {
          this.board[y][x] *= 2;
          this.board[y][x - 1] = 0;
        }
      }
    }
    return validMove;
  }

  moveUp() {
    let validMove = false;
    for (let x = 0; x < WIDTH; x++) {
      for (let y = 0; y < HEIGHT; y++) {
        if (this.board[y][x] == 0) {
          const nextVal = this.getNextYValue(x, y + 1, 1);
          console.log("nextVal: " + nextVal);
          if (nextVal == 0) break;
          validMove = true;
          this.board[y][x] = nextVal;
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
        console.log(`${x}, ${y}`);
        if (this.board[y][x] == 0) {
          const nextVal = this.getNextYValue(x, y - 1, -1);
          console.log("nextVal: " + nextVal);
          if (nextVal == 0) break;
          validMove = true;
          this.board[y][x] = nextVal;
        }
      }
    }
    return validMove;
  }

  getNextValue(x, y, dir) {
    while (x >= 0 && x < WIDTH) {
      if (this.board[y][x] != 0) {
        const val = this.board[y][x];
        this.board[y][x] = 0;
        return val;
      }
      x += dir;
    }
    return 0;
  }

  getNextYValue(x, y, dir) {
    while (y >= 0 && y < HEIGHT) {
      if (this.board[y][x] != 0) {
        const val = this.board[y][x];
        this.board[y][x] = 0;
        return val;
      }
      y += dir;
    }
    return 0;
  }
  draw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let y = 0; y < HEIGHT; y++) {
      for (let x = 0; x < WIDTH; x++) {
        this.context.font = "40px serif";

        this.context.fillText(
          this.board[y][x],
          50 + x * CELL_SIZE,
          50 + y * CELL_SIZE
        );
      }
    }
  }
}

export default Board;
