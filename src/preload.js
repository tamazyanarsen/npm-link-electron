const {contextBridge, ipcRenderer} = require('electron')

const channels = {
    getLibs: 'get-libs',
    testEvent: 'test-event'
}

contextBridge.exposeInMainWorld('electronAPI', {
    openFile: () => ipcRenderer.invoke(channels.getLibs),
    onTestEvent: callback => ipcRenderer.on(channels.testEvent, callback)
})