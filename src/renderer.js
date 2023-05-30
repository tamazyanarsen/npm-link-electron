function start() {
    const elc = window.electronAPI
    let projectTarget = null
    let projectMap = {}
    elc.onTestEvent(console.log)

    const body = document.body

    console.log(body.querySelector('.open-target'))

    function chooseDir(event, isTarget = false) {
        const targetProjectElement = event.target.parentElement
        elc.openFile().then(({projectPath, packageData}) => {
            console.log('=>(renderer.js:12) projectPath', projectPath)
            console.log('=>(renderer.js:13) packageData', packageData)
            if (isTarget) {
                projectTarget = {
                    projectPath,
                    packageData
                }
            } else {
                projectMap[projectPath] = packageData
            }
            targetProjectElement.querySelector('.project-path').innerText = projectPath
            targetProjectElement.querySelector('.project-name').innerText = packageData.name
        })
    }

    body.querySelector('.open-target').addEventListener('click', chooseDir)

    body.querySelector('.add-dependency-button').addEventListener('click', addProject)

    /**
     *
     * @param event {PointerEvent}
     */
    function addProject(event) {
        console.log(event)
        const projectWrapper = document.createElement('div')
        projectWrapper.className = 'project'
        projectWrapper.innerHTML = `
            <button class="open">open dependency project</button>
            <div>target project path: <span class="project-path"></span></div>
            <div>target project name: <span class="project-name"></span></div>
        `
        body.querySelector('.dependency-project-list').appendChild(projectWrapper)
    }
}

try {
    start()
} catch (e) {
    debugger;
    console.log(e)
    location.reload()
}