const hoursElement = document.getElementById("hours-input");
const minutesElement = document.getElementById("minutes-input");
const secondsElement = document.getElementById("seconds-input");
const displayElement = document.getElementById("display-time");
const toogleBtn = document.getElementById("toogle-btn");
const interval = [];
const alarm = new Audio("assets/audio/alarm.mp3");
let hours = '';
let minutes = '';
let seconds = '';
let milliseconds = '';
let mslength = 0;
let startTime = 0;
let difference = 0;
let timeGoal = 0;
let goal = 0;
let elapsed = 0;
let paused = false;
let running = false;

minutesElement.focus();
minutesElement.setSelectionRange(0,minutesElement.value.length);

[hoursElement, minutesElement, secondsElement].forEach(
  (element) => {
    element.addEventListener("input", (event) => {
      if (!event.data || isNaN(event.data) || event.data.indexOf(' ') >= 0) {
        event.target.value = event.target.value.slice(0, event.target.value.length - 1);
      }
    });
    
    element.addEventListener("focus", (event) => {
      if (event.target.value === '0') {
        event.target.value = '';
      }
    });
    
    element.addEventListener("focusout", (event) => {
      if (event.target.value === '') {
        event.target.value = '0';
      }
    });
  }
);

const toogleRun = () => {
  running = true;
  if (interval[0]) {
    paused = true;
    clearInterval(interval.pop());
    toogleBtn.value = "Continuar (C)";
  } else {
    paused = false;
    goal = ((
      ((Number(hoursElement.value) * 60) +
        Number(minutesElement.value)) * 60
    ) + Number(secondsElement.value)) * 1000;

    startTime = startTime ? startTime + (new Date().getTime() - startTime) : new Date().getTime();
    timeGoal = startTime + goal - (goal - (difference ? difference.getTime() : goal));
    toogleBtn.value = "Pausar (P)";

    interval.push(setInterval(() => {
      difference = new Date(timeGoal - new Date().getTime());
      console.log(timeGoal, " ", new Date().getTime(), " ", timeGoal - new Date().getTime());
      hours = String(Math.floor(difference / 360000));
      minutes = String(difference.getMinutes());
      seconds = String(difference.getSeconds());
      milliseconds = String(difference.getMilliseconds());
      mslength = milliseconds.length;

      if (difference >= 0) {
        displayElement.innerText = `${hours.length > 1 ? hours : '0'.concat(hours)
          }:${minutes.length > 1 ? minutes : '0'.concat(minutes)
          }:${seconds.length > 1 ? seconds : '0'.concat(seconds)
          }.${mslength > 2 ? milliseconds : mslength > 1 ? '0'.concat(milliseconds) : "00".concat(milliseconds)
          }`
      } else {
        if (running){
          resetAll();
          alarm.play();
          confirm("O tempo acabou! Deseja parar o alarme?") ? alarm.pause() : 0;
          clearInterval(interval.pop());
        }
      }
    }, 0));
  }
};

const resetAll = () => {
  clearInterval(interval.pop());
  hours = '';
  minutes = '';
  seconds = '';
  milliseconds = '';
  mslength = 0;
  startTime = 0;
  difference = 0;
  timeGoal = 0;
  goal = 0;
  elapsed = 0;
  hoursElement.value = '0';
  minutesElement.value = '2';
  secondsElement.value = '0';
  toogleBtn.value = "Iniciar (I)";
  displayElement.innerText = "00:00:00.000";
};

document.addEventListener("keypress", (event) => {
  if (!running && !paused) {
    event.key.toUpperCase() === 'I' ? toogleRun() : 0;
  } else if (running && !paused) {
    event.key.toUpperCase() === 'P' ? toogleRun() : 0;
    event.key.toUpperCase() === 'R' ? resetAll() : 0;
  } else {
    event.key.toUpperCase() === 'C' ? toogleRun() : 0;
    event.key.toUpperCase() === 'R' ? resetAll() : 0;
  }
});
