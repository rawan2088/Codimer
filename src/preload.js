// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, ipcRenderer } = require("electron");
// ContextBridge ensures that the render process and the APIs can communicate safly without the renderer being able to directly access the APIs, which ensures security
// the ipcRenderer is a module that allows the renderer to send messages to the main process and recieve responses

//exposeInMainWorld exposes sepcific APIs to the renderer process, and it takes two arguments
// The first argument will be the object's name that will be added to the window inorder to access the function
// We use the window since we are dealing with the renderer, which is directly tied with things happening in the window
// The second argument is the methods that you want to expose to the object on the renderer process
contextBridge.exposeInMainWorld("electronAPI", {
  minimizeWindow: () => ipcRenderer.send("minimizeWindow"), // Here, we name the function, and we send a message to the main function through the chanell name we choose for it to happen
  maximizeWindow: () => ipcRenderer.send("maximizeWindow"),
  closeWindow: () => ipcRenderer.send("closeWindow"),
  mainTimer: (time, state) => ipcRenderer.send("mainTimer", time, state),
  updateTimer: (callback) => ipcRenderer.on("updatedTime", callback), // here, the callback parameter is recieving the formatted time and the event as two implcitly
  updateState: (callback) => ipcRenderer.on("updateState", callback),
});
