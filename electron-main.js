const { app, BrowserWindow } = require('electron');
const isDev = !app.isPackaged;

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (isDev) {
    // Load dev server
    const port = process.env.NG_PORT;
    win.loadURL(`http://localhost:${port}`);
    win.webContents.openDevTools();
  } else {
    // Load production / build
    win.setMenu(null);
    win.loadFile('dist/electron-angular/browser/index.html');
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
