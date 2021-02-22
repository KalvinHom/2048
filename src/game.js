import Board from "./board";
import Canvas from "./canvas";

const ALIVE = 0;
const GAMEOVER = 1;

class Game {
  constructor() {
    this.setDefaults();
  }

  setDefaults() {
    this.board = new Board();
    this.canvas = new Canvas();
  }

  isReady() {
    return this.board.ready;
  }
  startGame() {
    this.lastRenderTime = Date.now();
    this.board.newPiece();
    this.board.newPiece();
    // this.board.draw();
    this.board.drawBoard();
  }

  moveLeft() {
    this.board.beginTurn();
    if (this.board.moveLeft()) this.board.newPiece();
    this.board.draw();
  }

  moveRight() {
    this.board.beginTurn();
    if (this.board.moveRight()) this.board.newPiece();
    this.board.draw();
  }

  moveUp() {
    this.board.beginTurn();
    if (this.board.moveUp()) this.board.newPiece();
    this.board.draw();
  }

  moveDown() {
    this.board.beginTurn();
    if (this.board.moveDown()) this.board.newPiece();
    this.board.draw();
  }
}

export default Game;
