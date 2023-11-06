import Ball from "./Ball.js";
import { buildBricks } from "./Bricks.js";
import Paddle from "./Paddle.js";

const ball = new Ball(document.querySelector("#ball"));
const playerPaddle = new Paddle(document.querySelector("#paddle"));

const bricks = buildBricks(5, 5);

let lastTime;
function update(time) {
  if (lastTime) {
    const delta = time - lastTime;
    ball.update(delta, playerPaddle.rect(), bricks);
    const hue = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--hue")
    );

    document.documentElement.style.setProperty("--hue", hue + delta * 0.01);

    if (isLose()) {
      resetGame();
      alert("LOOSE!");
    }

    if (
      !bricks.some(
        (brick) =>
          getComputedStyle(brick).getPropertyValue("visibility") != "hidden"
      )
    ) {
      resetGame();
      alert("WIN!");
    }
  }

  lastTime = time;
  window.requestAnimationFrame(update);
}

function isLose() {
  const rect = ball.rect();
  return rect.bottom >= window.innerHeight;
}

function resetGame() {
  ball.reset();
  bricks.forEach((brick) => brick.style.removeProperty("visibility"));
}

document.addEventListener("mousemove", (e) => {
  playerPaddle.position = (e.x / window.innerWidth) * 100;
});

window.requestAnimationFrame(update);
