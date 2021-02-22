import Canvas from "./canvas";
import Board from "./board";
import "./style.css";
import Game from "./game";

const game = new Game();

game.startGame();
// window.requestAnimationFrame(board.draw.bind(board));
// board.newPiece();
// board.newPiece();
// window.requestAnimationFrame(board.draw.bind(board));

let fired = false;
window.addEventListener("keydown", function (event) {
  event.preventDefault();
  if (fired) return;

  if (!game.isReady()) return;

  fired = true;
  event.key;
  event.preventDefault();
  switch (event.key) {
    case "ArrowLeft":
    case "a":
      game.moveLeft();
      break;
    case "ArrowRight":
    case "d":
      game.moveRight();
      break;

    case "ArrowUp":
    case "w":
      game.moveUp();
      break;
    case "ArrowDown":
    case "s":
      game.moveDown();
      break;

    default:
      fired = false;

      return;
  }
  fired = false;
});

// window.addEventListener("keyup", function (event) {
//   switch (event.key) {
//     case "ArrowDown":
//     case "s":
//       game.speedOff();
//       break;
//     default:
//       return;
//   }
// });
