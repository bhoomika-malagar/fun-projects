let timerDisplay = document.getElementById("timer");
let workBtn = document.getElementById("workBtn");
let breakBtn = document.getElementById("breakBtn");
let startBtn = document.getElementById("start");
let pauseBtn = document.getElementById("pause");
let resetBtn = document.getElementById("reset");
let cat = document.getElementById("cat");
let meow = document.getElementById("meow");

let time = 1500; // 25 minutes
let interval = null;
let isWork = true;

function updateDisplay() {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  timerDisplay.textContent =
    `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
  if (interval) return;

  interval = setInterval(() => {
    if (time > 0) {
      time--;
      updateDisplay();
    } else {
      clearInterval(interval);
      interval = null;
      meow.play();
      alert("Time's up! 🐾");
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(interval);
  interval = null;
}

function resetTimer() {
  pauseTimer();
  time = isWork ? 1500 : 300;
  updateDisplay();
}

workBtn.onclick = () => {
  isWork = true;
  time = 1500;
  cat.src = "cat.gif";
  workBtn.classList.add("active");
  breakBtn.classList.remove("active");
  resetTimer();
};

breakBtn.onclick = () => {
  isWork = false;
  time = 300;
  cat.src = "cat.gif";
  breakBtn.classList.add("active");
  workBtn.classList.remove("active");
  resetTimer();
};

startBtn.onclick = startTimer;
pauseBtn.onclick = pauseTimer;
resetBtn.onclick = resetTimer;