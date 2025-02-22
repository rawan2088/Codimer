document.getElementById("minimize").addEventListener("click", () => {
  window.electronAPI.minimizeWindow();
});

document.getElementById("maximize").addEventListener("click", () => {
  window.electronAPI.maximizeWindow();
});

document.getElementById("close").addEventListener("click", () => {
  window.electronAPI.closeWindow();
});

let mainTimer = document.getElementById("mainTimer");
let mainTimerBtn = document.getElementById("mainTimerBtn");
let timerState = { stop: false, currentTimer: null };

mainTimerBtn.addEventListener("click", () => {
  // console.log(CurrentValue);
  // let CurrentValue = mainTimer;

  let time = new Date().getTime();

  // console.log(timerState.currentTimer);

  window.electronAPI.mainTimer(time, timerState);
});

window.electronAPI.updateTimer((event, formatedTime, nonFormatedTime) => {
  // But here we need to use two parameters again since we are gonna use it
  mainTimer.textContent = formatedTime;
  timerState.currentTimer = nonFormatedTime;
});

window.electronAPI.updateState((event, state) => {
  timerState.stop = state;
});
