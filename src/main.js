const {app, BrowserWindow, dialog, ipcMain} = require('electron')
const path = require('path')
const fs = require('fs')

let mainWindow = null

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile(path.join(__dirname, 'index.html')).catch(console.error)
        .then(() => {
            win.webContents.send('test-event', [1, 2, 3])
            win.webContents.openDevTools()
            win.maximize()
        })

    return win
}

/**
 *
 * @param err
 * @param win {BrowserWindow}
 */
function checkError(err) {
    if (err) {
        console.log(err)
        mainWindow.reload()
    }
}

async function getFiles() {
    return dialog.showOpenDialog({
        properties: ['openDirectory']
    }).then(({filePaths}) => {
        const projectPath = filePaths[0]
        const packageData = JSON.parse(fs.readFileSync(path.join(projectPath, 'package.json')).toString());
        return {
            projectPath: projectPath,
            packageData: packageData
        }
    })
}

app.whenReady().then(() => {
    ipcMain.handle('get-libs', getFiles)
    mainWindow = createWindow()
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})