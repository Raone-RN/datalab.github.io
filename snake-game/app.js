const squares = document.querySelectorAll(".grid div");
const scoreDisplay = document.querySelector("span");
const startBtn = document.querySelector(".js-start");

const width = 10;
let currentIndex = 0;
let appleIndex = 0;
let currentSnake = [2, 1, 0];
let direction = 1;
let score = 0;
let speed = 0.9;
let IntervalTime = 0;
let intervalId = 0;

function startGame() {
  let i = 0;
  while (i < currentSnake.length) {
    let index = currentSnake[i];
    squares[index].classList.remove("snake");
    i++;
  }

  squares[appleIndex].classList.remove("apple");
  clearInterval(intervalId);
  score = 0;
  randomApple();
  direction = 1;
  scoreDisplay.textContent = score;
  IntervalTime = 600;
  currentSnake = [2, 1, 0];
  currentIndex = 0;

  i = 0;
  while (i < currentSnake.length) {
    let index = currentSnake[i];
    squares[index].classList.add("snake");
    i++;
  }

  intervalId = setInterval(moveOutcomes, IntervalTime);
}

function moveOutcomes() {
  if (
    (currentSnake[0] + width >= width * width && direction === width) ||
    (currentSnake[0] % width === width - 1 && direction === 1) ||
    (currentSnake[0] % width === 0 && direction === -1) ||
    (currentSnake[0] - width < 0 && direction === -width) ||
    squares[currentSnake[0] + direction].classList.contains("snake")
  ) {
    clearInterval(intervalId);
    alert("죽었숩니다 꽦 XㅡX");
    return;
  }
  const tail = currentSnake.pop();
  squares[tail].classList.remove("snake");
  currentSnake.unshift(currentSnake[0] + direction);

  if (squares[currentSnake[0]].classList.contains("apple")) {
    squares[currentSnake[0]].classList.remove("apple");
    squares[tail].classList.add("snake");
    currentSnake.push(tail);
    randomApple();
    score++;
    scoreDisplay.textContent = score;
    clearInterval(intervalId);
    IntervalTime = IntervalTime * speed;
    intervalId = setInterval(moveOutcomes, IntervalTime);
  }
  squares[currentSnake[0]].classList.add("snake");
}

function randomApple() {
  do {
    appleIndex = Math.floor(Math.random() * squares.length);
  } while (squares[appleIndex].classList.contains("snake"));
  squares[appleIndex].classList.add("apple");
}

function control(event) {
  squares[currentIndex].classList.remove("snake");

  if (event.keyCode === 39) {
    direction = 1;
  } else if (event.keyCode === 38) {
    direction = -width;
  } else if (event.keyCode === 37) {
    direction = -1;
  } else if (event.keyCode === 40) {
    direction = +width;
  }
}

document.addEventListener("keyup", control);
startBtn.addEventListener("click", startGame);
