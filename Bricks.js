export function buildBricks(rows, columns) {
  const bricks = document.querySelector(".bricks");
  for (let row = 0; row < rows; row++) {
    bricks.appendChild(buildBrickRow(columns));
  }
  return [...document.querySelectorAll(".brick")];
}

function buildBrickRow(columns) {
  const rowElem = document.createElement("div");
  rowElem.className = "brick-row";
  for (let column = 0; column < columns; column++) {
    const brickElem = document.createElement("div");
    brickElem.className = "brick";
    rowElem.appendChild(brickElem);
  }
  return rowElem;
}
