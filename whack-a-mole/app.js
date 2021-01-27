const square = document.querySelectorAll(".square");
const mole = document.querySelectorAll(".mole");
const timeLeft = document.querySelector("#time-left");
const score = document.querySelector("#score");

const SPEED = 900;

let result = 0;
let hitPos = "1";
let currentTime = timeLeft.textContent;

function randomSquare() {
  let i = 0;
  while (i < square.length) {
    square[i].classList.remove("mole");
    i++;
  }

  const randomIdx = Math.floor(Math.random() * 9);
  square[randomIdx].classList.add("mole");

  hitPos = square[randomIdx].id;
}

let i = 0;
while (i < square.length) {
  square[i].addEventListener("click", function (event) {
    if (event.currentTarget.id === hitPos) {
      result = result + 1;
      score.textContent = result;
    }
  });
  i++;
}

function countDown() {
  currentTime--;
  timeLeft.textContent = currentTime;

  if (currentTime === 0) {
    clearInterval(countDownTimerId);
    clearInterval(moveTimerId);
    alert(`게임 끝! 당신의 점수는~~ ${result}점!!~~`);
  }
}

let countDownTimerId = setInterval(countDown, 1000);
let moveTimerId = setInterval(randomSquare, SPEED);
