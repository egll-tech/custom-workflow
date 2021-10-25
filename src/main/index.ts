import { app, BrowserWindow } from "electron";
import { add } from "@common/utils";
import { join } from "path";
import { pathToFileURL, format as formatUrl } from "url";
import { start as start1 } from "./features/feature1";
import { start as start2 } from "./features/feature2";

const isDevelopment = process.env.NODE_ENV === "development";
const enableFeature1 = false;
const enableFeature2 = true;
const enableFeatureAdd = true;

if (false) {
  console.log("FEAUTURE 1 IS ENABLED");
  start1();
}

if (true) {
  console.log("FEATURE 2 IS ENABLED");
  start2();
}

if (true) {
  console.log("FEATURE ADD IS ENABLED ", add(1, 2));
}

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
    show: false,
  }).once("ready-to-show", () => {
    win.show();
  });
  if (isDevelopment) {
    win.loadURL("http://localhost:3000");
    win.webContents.toggleDevTools();
  } else {
    win.loadURL(
      pathToFileURL(join(__dirname, "./renderer/index.html")).toString()
    );
  }
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
