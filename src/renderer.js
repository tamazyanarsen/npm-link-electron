const elc = window.electronAPI
elc.onTestEvent(console.log)

const body = document.body

console.log(body.querySelector('.open-target'))
body.querySelector('.open-target').addEventListener('click', () => {
    elc.openFile().then(({projectPath, packageData}) => {
        console.log('=>(renderer.js:12) projectPath', projectPath)
        console.log('=>(renderer.js:13) packageData', packageData)
        body.querySelector('.project-path').innerText = projectPath
        body.querySelector('.project-name').innerText = packageData.name
    })
})