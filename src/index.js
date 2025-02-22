// import { app, BrowserWindow, ipcMain } from "electron";
// import path from "node:path";
// import started from "electron-squirrel-startup";

//To solve the problem of 'you cannot use import'
// you can either use:
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const started = require("electron-squirrel-startup");
const { clear } = require("console");

//or you you can add this to your package.json:
// {
//   "type": "module"
// }

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      enableRemoteModule: false,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "index.html"));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
ipcMain.on("maximizeWindow", (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);

  if (win.isMaximized()) {
    win.unmaximize();
  } else {
    win.maximize();
  }
});

ipcMain.on("minimizeWindow", (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);

  win.minimize();
});

ipcMain.on("closeWindow", (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);

  win.close();
});

// ipcMain.on();
//This takes two arguments, the first is the channel name which the communication between the main process and the renderer will happen on
// The second is the event which will happen when it is invoked

ipcMain.on("mainTimer", (event, time, timerState) => {
  //time = date.now; TimerElement = the element's value; stop = a boolean;
  // let time = Date.now(); // Put it in the renderer

  let newState = false;

  if (timerState.stop == false) {
    console.log("yes");
    newState = true;

    // calculateNow(time, TimerElement);

    calculateNow = setInterval(() => {
      let nowTime = new Date().getTime();

      let showTime =
        timerState.currentTimer == null
          ? nowTime - time
          : timerState.currentTimer + nowTime - time;

      // TimerElement = `${showTime}`;

      let nonFormatedTime = showTime;

      let formatedTime = new Date(showTime).toISOString().substr(11, 8);

      // console.log(nonFormatedTime);
      // console.log(formatedTime);

      event.sender.send("updatedTime", formatedTime, nonFormatedTime); // Send the updated time to the renderer
    }, 1000);
    // console.log(`start`);
  } else {
    console.log("no");
    clearInterval(calculateNow);
    // console.log(`stop`);
    // timerState.stop = false;
    newState = false;
  }

  event.sender.send("updateState", newState);
});
