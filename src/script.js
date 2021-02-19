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
  if (fired) return;
  fired = true;
  event.key;
  event.preventDefault();
  switch (event.key) {
    case "ArrowLeft":
    case "a":
      console.log("moving left");
      game.moveLeft();
      break;
    case "ArrowRight":
    case "d":
      console.log("moving right");
      game.moveRight();
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
