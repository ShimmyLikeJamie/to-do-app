const App = (() => {

    let storage = window.localStorage

    const DOM = (() => {

        let elements = {
            appContainer: document.getElementById('appContainer'),
            navBar:  document.getElementById('navBar'),
            newProjectButton: document.getElementById('newProjectButton'),
            deleteProjectButton: document.getElementById('deleteProjectButton'),
            taskContainer: document.getElementById('taskContainer'),
            newTaskButton: document.getElementById('newTaskButton'),
            showCompletedTasksButton: document.getElementById('showCompletedTasksButton')
        }
        return elements;
    })();

    let projects = []
    let activeProject = {}
    /*if (storage.getItem('userProjects') != null && storage.getItem('userProjects').length > 2) {
        let i = 0
        userProjects = JSON.parse(storage.getItem('userProjects'))
        while (i < userProjects.length) {
            DOM.navBar.appendChild(userProjects[`${i}`].button)
            console.log(userProjects[`${i}`].button)
        }       
    }
    else {*/activeProject = createProject()

    function removeAllChildElements(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild)
        }
    }

    function displayTasks() {
        let i = 0
        while (i < activeProject.tasks.length) {
            DOM.taskContainer.appendChild(activeProject.tasks[i].container)
            i += 1
        }
    }

    function displayNewTaskButton() {
        let newTask = document.createElement('div')
        newTask.setAttribute('class', 'task')
        newTask.appendChild(DOM.newTaskButton)
        DOM.taskContainer.appendChild(newTask)
    }

    function changeActiveProject(project) { 
        activeProject.button.style.backgroundColor = '#007b94'
        removeAllChildElements(DOM.taskContainer)
        activeProject = project
        activeProject.button.style.backgroundColor = '#00c8f0'
        
        displayTasks()
        displayNewTaskButton()
    }

    DOM.newTaskButton.onclick = () => { //Adds new task onto page
        parent = DOM.newTaskButton.parentElement //Parent is taskContainer
        let task = createTask()
        DOM.newTaskButton.remove()
        parent.appendChild(task.taskExpand)
        parent.appendChild(task.name)
        parent.appendChild(task.dueDate)
        parent.appendChild(task.priority)
        parent.appendChild(task.notes)
        parent.appendChild(task.checklist)
        task.checklist.appendChild(task.checklistButtons.add)
        task.checklist.appendChild(task.checklistButtons.remove)
        parent.appendChild(task.completeTaskButton)
        parent.appendChild(task.deleteTaskButton)

        let newTask = document.createElement('div')
        newTask.setAttribute('class', 'task')
        newTask.appendChild(DOM.newTaskButton)
        DOM.taskContainer.appendChild(newTask)
    }

    DOM.newProjectButton.onclick = () => { //Creates new project and makes it the active project
        changeActiveProject(createProject())
    }
    DOM.deleteProjectButton.onclick = () => { //Deletes active project
        activeProject.button.remove()
        removeAllChildElements(DOM.taskContainer)
        
        let i = 0
        while (i < projects.length) {
            if (projects[i] == activeProject) {
                projects.slice(i, 1)
                activeProject = {}
                break
            }
            i += 1
        }
    }

    DOM.showCompletedTasksButton.onclick = () => { //Shows completed tasks in active project
            removeAllChildElements(DOM.taskContainer)
            let i = 0
            while (i < activeProject.completedTasks.length) {
                let task = document.createElement('div')
                task.setAttribute('class', 'task')
                DOM.taskContainer.appendChild(task)

                let completedTask = activeProject.completedTasks[i]
                task.appendChild(completedTask.name)
                task.appendChild(completedTask.dueDate)
                task.appendChild(completedTask.notes)
                completedTask.notes.style.display = 'block'
                task.appendChild(completedTask.checklist)
                completedTask.checklist.style.display = 'inline-block'
                completedTask.checklistButtons.add.style.display = 'none'
                completedTask.checklistButtons.remove.style.display = 'none'
                i += 1
            }
    }

    function createProject() {

        let button = document.createElement('ul')
        button.classList.add('navItem', 'projectButton')
        button.textContent = 'New Project'
        button.setAttribute('contenteditable', 'true')
        button.style.backgroundColor = '#00c8f0'

        let tasks = []
        let completedTasks = []
        let completedTasksCount = 0

        let project = {
            name: button.textContent,
            button: button,
            tasks: tasks,
            completedTasks: completedTasks,
            completedTasksCount: completedTasksCount
        }
        
        button.onclick = () => { 
            changeActiveProject(project)
        }
        document.getElementById('navBar').appendChild(button)
        projects.push(project)
        return project
    }

    function createTask() {

        //Create elements and set attributes

        //Task Expand/Collapse button
        let taskExpand = document.createElement('div')
        taskExpand.classList.add('taskItem', 'taskExpand')
        taskExpand.textContent = '+ / -'

        //Name of task
        let name = document.createElement('div')
        name.setAttribute('contenteditable', 'true')
        name.classList.add('name', 'taskItem')
        name.setAttribute('id', 'name')
        name.textContent = 'Task Name'

        //Due date of task
        let dueDate = document.createElement('div')
        let dueDateText = document.createElement('input')
        dueDateText.setAttribute('id', 'dueDateText')
        dueDate.classList.add('dueDate', 'taskItem')
        dueDate.setAttribute('id', 'dueDate')
        dueDate.textContent = 'Due: '
        dueDateText.setAttribute('type', 'datetime-local')
        dueDate.appendChild(dueDateText)

        //Priority of task
        let priority = document.createElement('div')
        let priorityText = document.createElement('span')
        priority.classList.add('priority', 'taskItem')
        priority.setAttribute('id', 'priority')
        priority.textContent = 'Priority: '
        priorityText.textContent = 'Medium'
        priorityText.style.color = '#bdbd00'
        priority.appendChild(priorityText)
        
        //Notes of task
        let notes = document.createElement('div')
        let notesText = document.createElement('div')
        notes.classList.add('taskItem', 'notes')
        notes.setAttribute('id', 'notes')
        notes.textContent = 'Notes'
        notesText.setAttribute('contenteditable', 'true')
        notesText.setAttribute('class', 'notesText')
        notes.appendChild(notesText)

        //Checklist of task
        let checklist = document.createElement('ol')
        let addChecklistItem = document.createElement('div')
        let removeChecklistItem = document.createElement('div')
        addChecklistItem.setAttribute('class', 'addChecklistItem')
        addChecklistItem.setAttribute('id', 'addChecklistItem')
        addChecklistItem.textContent = '+'
        removeChecklistItem.textContent = '-'
        removeChecklistItem.setAttribute('class', 'removeChecklistItem')
        removeChecklistItem.setAttribute('id', 'removeChecklistItem')
        checklist.classList.add('checklist', 'taskItem')
        checklist.setAttribute('id', 'checklist')
        checklist.textContent = 'Checklist'
        checklist.appendChild(document.createElement('br'))

        //Delete button of task
        let deleteTaskButton = document.createElement('div')
        deleteTaskButton.setAttribute('class', 'taskItem')
        deleteTaskButton.setAttribute('id', 'deleteTaskButton')
        deleteTaskButton.textContent = 'Delete'
        deleteTaskButton.style.display = 'none'

        deleteTaskButton.onclick = () => {
            task.container.remove()

            let i = 0

            while (i < activeProject.tasks.length) {
                if (activeProject.tasks[i] === task) {
                    activeProject.tasks.splice(i, 1)
                    break
                }
                i += 1
            }
        }
        
        //Complete button of task
        let completeTaskButton = document.createElement('div')
        completeTaskButton.setAttribute('class', 'taskItem')
        completeTaskButton.setAttribute('id', 'completeTaskButton')
        completeTaskButton.textContent = 'Complete'
        completeTaskButton.style.display = 'none'

        completeTaskButton.onclick = () => {
            task.container.remove()

            let i = 0

            while (i < activeProject.tasks.length) {
                if (activeProject.tasks[i] === task) {
                    activeProject.completedTasks.push(activeProject.tasks[i])
                    activeProject.completedTasksCount += 1
                    activeProject.tasks.splice(i, 1)
                    break
                }
                i += 1
            }
        }

        addChecklistItem.onclick = () => {

            
            let checkbox = document.createElement('input')
            checkbox.setAttribute('type', 'checkbox')
            checkbox.setAttribute('class', 'checkbox')
            let checklistItem = document.createElement('li')
            checklistItem.setAttribute('class', 'checklistItem')
            checklistItem.id = 'checklistItem'
            checklistItem.setAttribute('contenteditable', 'true')
            checklistItem.textContent = ''

            checklistButtons.add.remove()
            checklistButtons.remove.remove()

            checklist.appendChild(checkbox)
            checklist.appendChild(checklistItem)

            checklist.appendChild(checklistButtons.add)
            checklist.appendChild(checklistButtons.remove)

        }

        removeChecklistItem.onclick = () => {
            let checklistItem = addChecklistItem.previousElementSibling
            let checkbox = checklistItem.previousElementSibling
            if (checkbox != null) {
                checklistItem.remove()
                checkbox.remove()        
            }
        }

        let checklistButtons = {
            add: addChecklistItem,
            remove: removeChecklistItem
        }
        checklist.appendChild(checklistButtons.add)
        checklist.appendChild(checklistButtons.remove)

        taskExpand.onclick = () => {
            if (notes.style.display == 'none') { //What to do if task is hidden
                notes.style.display = 'block'
                checklist.style.display = 'inline-block'
                deleteTaskButton.style.display = 'none'
                completeTaskButton.style.display = 'none'
            }
            else { //What to do if it's already expanded
                notes.style.display = 'none'
                checklist.style.display = 'none'
                deleteTaskButton.style.display = 'block'
                completeTaskButton.style.display = 'block'
            }
        }

        priority.onclick = () => {
            if (priorityText.textContent == 'Medium') {
                priorityText.textContent = 'High'
                priorityText.style.color = '#921616'
            }
            else if (priorityText.textContent == 'High') {
                priorityText.textContent = 'Low'
                priorityText.style.color = '#32cd13'
            }
            else {
                priorityText.textContent = 'Medium'
                priorityText.style.color = '#bdbd00'
            }
        }

        let task = {

            container: DOM.newTaskButton.parentElement,
            taskExpand: taskExpand,
            name: name,
            dueDate: dueDate,
            priority: priority,
            notes: notes,
            checklist: checklist,
            checklistButtons: checklistButtons,
            deleteTaskButton: deleteTaskButton,
            completeTaskButton: completeTaskButton
        }

        activeProject.tasks.push(task)
        return task
    }

    setInterval(function(){

        console.log('saving projects...')
        storage.setItem('userProjects', JSON.stringify(projects[0]))
        let parsed = (JSON.parse(storage.getItem('userProjects')))
        DOM.navBar.appendChild(parsed.button)
        console.log(parsed.button)
        console.log(parsed.tasks)
    }, 30000)

    return {createProject, createTask}
})();