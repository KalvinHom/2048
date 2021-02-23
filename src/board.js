const WIDTH = 4;
const HEIGHT = 4;
const CELL_SIZE = 100;

const NEW_TILE = -1;
const MOVE = 1;
const MERGE = 2;
class Board {
  constructor() {
    this.board = Array(HEIGHT)
      .fill()
      .map(() => Array(WIDTH).fill(0));

    this.actions = Array(HEIGHT)
      .fill()
      .map(() =>
        Array(WIDTH)
          .fill()
          .map((x) => ({ action: 0 }))
      );

    this.numTranslate = 0;
    this.ready = true;
    this.score = 0;
  }
  beginTurn() {
    this.ready = false;
  }

  newPiece() {
    let x, y;
    do {
      x = Math.floor(Math.random() * WIDTH);
      y = Math.floor(Math.random() * HEIGHT);
    } while (this.board[y][x] != 0);

    const rand = Math.floor(Math.random() * 10);
    this.board[y][x] = rand == 0 ? 4 : 2;
    this.actions[y][x].action = NEW_TILE;
    console.log(`new piece at ${x}, ${y}`);
  }

  //TODO: combine left/right/up/down when not being lazy with copy paste
  moveLeft() {
    let validMove = false;
    for (let y = 0; y < HEIGHT; y++) {
      for (let x = 0; x < WIDTH; x++) {
        const nextVal = this.getNextValue(x + 1, y, 1);

        if (nextVal == -1) break;

        if (this.board[y][x] == 0) {
          validMove = true;
          this.board[y][x] = this.board[y][nextVal];
          this.board[y][nextVal] = 0;
          this.actions[y][nextVal].action = MOVE;
          this.actions[y][nextVal].translate = [x - nextVal, 0];
          x--;
        } else if (this.board[y][x] == this.board[y][nextVal]) {
          validMove = true;

          this.board[y][x] *= 2;
          this.board[y][nextVal] = 0;
          this.actions[y][nextVal].action = MERGE;
          this.actions[y][nextVal].translate = [x - nextVal, 0];
          this.score += this.board[y][x];
        }
      }
    }
    return validMove;
  }

  moveRight() {
    let validMove = false;

    for (let y = 0; y < HEIGHT; y++) {
      for (let x = WIDTH - 1; x >= 0; x--) {
        const nextVal = this.getNextValue(x - 1, y, -1);

        if (nextVal == -1) break;

        if (this.board[y][x] == 0) {
          validMove = true;
          this.board[y][x] = this.board[y][nextVal];
          this.board[y][nextVal] = 0;
          this.actions[y][nextVal].action = MOVE;
          this.actions[y][nextVal].translate = [x - nextVal, 0];

          x++;
        } else if (this.board[y][x] == this.board[y][nextVal]) {
          validMove = true;

          this.board[y][x] *= 2;
          this.board[y][nextVal] = 0;
          this.actions[y][nextVal].action = MERGE;
          this.actions[y][nextVal].translate = [x - nextVal, 0];
          this.score += this.board[y][x];
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

        if (nextVal == -1) break;

        if (this.board[y][x] == 0) {
          validMove = true;
          this.board[y][x] = this.board[nextVal][x];
          this.board[nextVal][x] = 0;
          this.actions[nextVal][x].action = MOVE;
          this.actions[nextVal][x].translate = [0, y - nextVal];
          y--;
        } else if (this.board[y][x] == this.board[nextVal][x]) {
          validMove = true;

          this.board[y][x] *= 2;
          this.board[nextVal][x] = 0;
          this.actions[nextVal][x].action = MERGE;
          this.actions[nextVal][x].translate = [0, y - nextVal];
          this.score += this.board[y][x];
        }
      }
    }
    return validMove;
  }

  moveDown() {
    let validMove = false;

    for (let x = 0; x < WIDTH; x++) {
      for (let y = HEIGHT - 1; y >= 0; y--) {
        const nextVal = this.getNextYValue(x, y - 1, -1);

        if (nextVal == -1) break;

        if (this.board[y][x] == 0) {
          validMove = true;
          this.board[y][x] = this.board[nextVal][x];
          this.board[nextVal][x] = 0;
          this.actions[nextVal][x].action = MOVE;
          this.actions[nextVal][x].translate = [0, y - nextVal];
          y++;
        } else if (this.board[y][x] == this.board[nextVal][x]) {
          validMove = true;

          this.board[y][x] *= 2;
          this.board[nextVal][x] = 0;
          this.actions[nextVal][x].action = MERGE;
          this.actions[nextVal][x].translate = [0, y - nextVal];
          this.score += this.board[y][x];
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
    if (this.actions[y][x].action == NEW_TILE) return "new-tile";

    return "normal";
  }
  draw() {
    console.log("beginning board draw");
    console.log(this.actions);
    var actionOccurred = false;
    for (let y = 0; y < HEIGHT; y++) {
      for (let x = 0; x < WIDTH; x++) {
        var content =
          this.board[y][x] == 0
            ? ""
            : `<div class="tile ${this.style(y, x)}">${this.board[y][x]}</div>`;

        if (
          this.actions[y][x].action != 0 &&
          this.actions[y][x].action != NEW_TILE
        ) {
          actionOccurred = true;
          document
            .getElementsByClassName("grid-row")
            [y].getElementsByClassName("grid-cell")
            [x].getElementsByClassName(
              "tile"
            )[0].style.transform = `translate(${
            this.actions[y][x].translate[0] * 106.25 +
            15 * this.actions[y][x].translate[0]
          }px, ${
            this.actions[y][x].translate[1] * 106.25 +
            15 * this.actions[y][x].translate[1]
          }px)`;
          this.numTranslate++;
          this.transitioning = true;
          console.log(`added numTranslate:${this.numTranslate}`);
          var base = this;
          $(".tile").each(function () {
            this.addEventListener("transitionend", function handler(e) {
              console.log(e.currentTarget);
              e.currentTarget.removeEventListener(e.type, handler);
              base.completeTransitions();
            });
          });
        }
      }
    }
    if (!actionOccurred) {
      this.drawBoard();
      this.ready = true;
    }
  }

  drawBoard() {
    for (let y = 0; y < HEIGHT; y++) {
      for (let x = 0; x < WIDTH; x++) {
        var color =
          this.board[y][x] == 0 ? "" : 255 - Math.log2(this.board[y][x]) * 10;
        var content =
          this.board[y][x] == 0
            ? ""
            : `<div class="tile ${this.style(
                y,
                x
              )}" style="background: rgb(255, ${color}, ${color})
            ">${this.board[y][x]}</div>`;

        document
          .getElementsByClassName("grid-row")
          [y].getElementsByClassName("grid-cell")[x].innerHTML = content;
        this.actions[y][x].action = 0;
        document.getElementById("score-counter").innerHTML = this.score;
      }
    }
  }

  completeTransitions() {
    if (this.transitioning) {
      console.log(`complete transition`);
      this.drawBoard();
      this.ready = true;
      this.transitioning = false;
    }
  }
}

export default Board;
