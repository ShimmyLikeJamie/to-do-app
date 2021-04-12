const App = (() => {

    const DOM = (() => {

        let elements = {
            appContainer: document.getElementById('appContainer'),
            navBar:  document.getElementById('navBar'),
            newProjectButton: document.getElementById('newProjectButton'),
            deleteProjectButton: document.getElementById('deleteProjectButton'),
            taskContainer: document.getElementById('taskContainer'),
            newTaskButton: document.getElementById('newTaskButton'),
        }
        return elements;
    })();

    let projects = []
    let activeProject = createProject()

    function removeAllChildElements(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild)
        }
    }

    function changeActiveProject(project) { 
        activeProject.button.style.backgroundColor = '#007b94'
        removeAllChildElements(DOM.taskContainer)
        activeProject = project
        activeProject.button.style.backgroundColor = '#00c8f0'
        
        let i = 0
        while (i < activeProject.tasks.length) {
            DOM.taskContainer.appendChild(activeProject.tasks[i].container)
            i += 1
        }
        let newTask = document.createElement('div')
        newTask.setAttribute('class', 'task')
        newTask.appendChild(DOM.newTaskButton)
        DOM.taskContainer.appendChild(newTask)

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
        parent.appendChild(task.deleteTaskButton)

        let newTask = document.createElement('div')
        newTask.setAttribute('class', 'task')
        newTask.appendChild(DOM.newTaskButton)
        DOM.taskContainer.appendChild(newTask)
    }

    DOM.newProjectButton.onclick = () => { //Creates new project and makes it the active project
        changeActiveProject(createProject())
    }

    function createProject() {

        let button = document.createElement('ul')
        button.setAttribute('class', 'navItem')
        button.textContent = 'New Project'
        button.setAttribute('contenteditable', 'true')
        button.style.backgroundColor = '#00c8f0'

        let tasks = []

        let project = {
            name: button.textContent,
            button: button,
            tasks: tasks
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
        priorityText.textContent = 'Normal'
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
        

        addChecklistItem.onclick = () => {

            
            let checkbox = document.createElement('input')
            checkbox.setAttribute('type', 'checkbox')
            checkbox.setAttribute('class', 'checkbox')
            let checklistItem = document.createElement('li')
            checklistItem.setAttribute('class', 'checklistItem')
            checklistItem.id = 'checklistItem'
            checklistItem.setAttribute('contenteditable', 'true')
            checklistItem.textContent = 'Edit me'

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
            }
            else { //What to do if it's already expanded
                notes.style.display = 'none'
                checklist.style.display = 'none'
                deleteTaskButton.style.display = 'block'
            }
        }

        priority.onclick = () => {
            if (priorityText.textContent == 'Normal') {
                priorityText.textContent = 'High'
                priorityText.style.color = '#921616'
            }
            else if (priorityText.textContent == 'High') {
                priorityText.textContent = 'Low'
                priorityText.style.color = '#90e4a4'
            }
            else {
                priorityText.textContent = 'Normal'
                priorityText.style.color = '#d6d6d6'
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
            deleteTaskButton: deleteTaskButton
        }

        activeProject.tasks.push(task)
        return task
    }
    return {createProject, createTask}
})();