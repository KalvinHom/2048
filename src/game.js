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

  startGame() {
    this.lastRenderTime = Date.now();
    this.board.newPiece();
    this.board.newPiece();
    window.requestAnimationFrame(this.render.bind(this));
  }

  moveLeft() {
    if (this.board.moveLeft()) this.board.newPiece();
    this.board.draw();
    window.requestAnimationFrame(this.render.bind(this));
  }

  moveRight() {
    console.log("moveRight!!");
    if (this.board.moveRight()) this.board.newPiece();
    this.board.draw();
    window.requestAnimationFrame(this.render.bind(this));
  }

  tick() {
    const elapsed = Date.now() - this.lastRenderTime;

    if (elapsed > 1000) {
      this.render();
      this.lastRenderTime = Date.now();
    }
    window.requestAnimationFrame(this.tick.bind(this));
  }

  render() {
    this.board.draw();
  }
}

export default Game;
