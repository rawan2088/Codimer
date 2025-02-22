document.getElementById("minimize").addEventListener("click", () => {
  window.electronAPI.minimizeWindow();
});

// document.getElementById("maximize").addEventListener("click", () => {
//   window.electronAPI.maximizeWindow();
// });

document.getElementById("close").addEventListener("click", () => {
  window.electronAPI.closeWindow();
});

let mainTimer = document.getElementById("mainTimer");
let mainTimerBtn = document.getElementById("mainTimerBtn");

let timerState = {
  stop: false,
  currentTimer: null,
};

let timers = {
  readingTime: 0,
  thinkingTime: 0,
  codingTime: 0,
  debuggingTime: 0,
};

// mainTimerBtn.addEventListener("click", () => {
//   // console.log(CurrentValue);
//   // let CurrentValue = mainTimer;

//   let time = new Date().getTime();

//   // console.log(timerState.currentTimer);

//   window.electronAPI.mainTimer(time, timerState);

//   // if (timerState.stop == true) {
//   //   setInterval(() => {
//   //     window.electronAPI.updateTimer((event, formatedTime, nonFormatedTime) => {
//   //       // But here we need to use two parameters again since we are gonna use it
//   //       mainTimer.textContent = formatedTime;
//   //       timerState.currentTimer = nonFormatedTime;
//   //     });
//   //   }, 1000);
//   // }
// });

document.querySelector("#timerContainer").addEventListener("click", () => {
  let time = new Date().getTime();

  // console.log(timerState.currentTimer);

  window.electronAPI.mainTimer(time, timerState);
});

window.electronAPI.updateState((event, state) => {
  timerState.stop = state;
});

window.electronAPI.updateTimer((event, formatedTime, nonFormatedTime) => {
  // But here we need to use two parameters again since we are gonna use it
  mainTimer.textContent = formatedTime;
  timerState.currentTimer = nonFormatedTime;
});

// document.body.onkeyup = function (e) {
//   if (e.code == "Enter") {
//     console.log(timerState.currentTimer);
//   }
// };

function next() {
  {
    console.log(timerState.currentTimer);

    if (timers.debuggingTime != 0) {
      window.electronAPI.reset();
    } else {
      for (const element in timers) {
        if (timers[element] == 0) {
          timers[element] = timerState.currentTimer;
          console.log(element);
          console.log(timers[element]);

          document.getElementById(`${element}`).innerText = new Date(
            timers[element]
          )
            .toISOString()
            .substr(11, 8);

          timerState.stop = false;

          timerState.currentTimer = null;

          let time = new Date().getTime();

          window.electronAPI.mainTimer(time, timerState);

          break;
        }
      }

      let caption = document.getElementById("mainCaption");

      switch (0) {
        case timers.readingTime:
          caption.innerText = "Reading";
          break;
        case timers.thinkingTime:
          caption.innerText = "Thinking";
          break;
        case timers.codingTime:
          caption.innerText = "Coding";
          break;
        case timers.debuggingTime:
          caption.innerText = "Debugging";
          break;
        default:
          caption.innerText = "Reading";
      }
    }

    // todo: if we pressed on the add button and it the timers are all filled, we go to the finished page.
  }
}

document.getElementById("saveCurrentTimerBtn").addEventListener("click", next);

document.body.onkeyup = function (e) {
  if (e.key == " " || e.code == "Space" || e.keyCode == 32) {
    let time = new Date().getTime();

    window.electronAPI.mainTimer(time, timerState);
    // setInterval(() => {
    //   window.electronAPI.updateTimer((event, formatedTime, nonFormatedTime) => {
    //     // But here we need to use two parameters again since we are gonna use it
    //     mainTimer.textContent = formatedTime;
    //     timerState.currentTimer = nonFormatedTime;
    //   });
    // }, 1000);
  } else if (e.key === "Enter") {
    next();
  }
};

document.getElementById("restartBtn").addEventListener("click", () => {
  window.electronAPI.reset();

  for (let element in timers) {
    timers[element] = 0;
  }

  timerState.stop = false;
  timerState.currentTimer = null;
  mainTimer.innerText = `00:00:00`;
});
