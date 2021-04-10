const App = (() => {

    const DOM = (() => {

        let elements = {
            appContainer: document.getElementById('appContainer'),
            navBar:  document.getElementById('navBar'),
            newProjectButton: document.getElementById('newProjectButton'),
            deleteProjectButton: document.getElementById('deleteProjectButton'),
            taskContainer: document.getElementById('taskContainer'),
            newTaskButton: document.getElementById('newTaskButton'),
            tasks: {}
        }
        return elements;
    })();

    let projects = {}
    let activeProject = createProject()

    DOM['newTaskButton'].onclick = () => { //Adds new task onto page
        parent = DOM['newTaskButton'].parentElement
        DOM['newTaskButton'].remove()
        let task = createTask()
        console.log(task)
        parent.appendChild(task.taskExpand)
        parent.appendChild(task.name)
        parent.appendChild(task.dueDate)
        parent.appendChild(task.priority)
        parent.appendChild(task.notes)
        parent.appendChild(task.checklist)
        parent.appendChild(task.checklistButtons.add)
        parent.appendChild(task.checklistButtons.remove)
        task.checklistButtons.add.style.marginLeft = '70px'

        let newTask = document.createElement('div')
        newTask.setAttribute('class', 'task')
        newTask.appendChild(DOM.newTaskButton)
        DOM.taskContainer.appendChild(newTask)
    }

    function createProject() {

        let button = document.createElement('ul')
        button.setAttribute('class', 'navItem')
        button.textContent = 'New Project'
        button.setAttribute('editablecontent', 'true')
        let tasks = {}

        let project = {
            button: button,
            tasks: tasks
        }
        
        return project
    }

    function createTask() {

        //Create elements and set attributes

        //Task Expand/Collapse button
        let taskExpand = document.createElement('div')
        taskExpand.classList.add('taskItem', 'taskExpand')
        taskExpand.textContent = '+'

        //Name of task
        let name = document.createElement('div')
        name.setAttribute('contenteditable', 'true')
        name.classList.add('name', 'taskItem')
        name.setAttribute('id', 'name')
        name.textContent = 'Task Name'

        //Due date of task
        let dueDate = document.createElement('div')
        let dueDateText = document.createElement('span')
        dueDate.classList.add('dueDate', 'taskItem')
        dueDate.setAttribute('id', 'dueDate')
        dueDate.textContent = 'Due: '
        dueDateText.setAttribute('contenteditable', 'true')
        dueDate.appendChild(dueDateText)

        //Priority of task
        let priority = document.createElement('div')
        let priorityText = document.createElement('span')
        priority.classList.add('priority', 'taskItem')
        priority.setAttribute('id', 'priority')
        priority.textContent = 'Priority: '
        priorityText.setAttribute('contenteditable', 'true')
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
        addChecklistItem.textContent = '+'
        removeChecklistItem.textContent = '-'
        removeChecklistItem.setAttribute('class', 'removeChecklistItem')
        checklist.classList.add('checklist', 'taskItem')
        checklist.setAttribute('id', 'checklist')
        checklist.textContent = 'Checklist'
        checklist.appendChild(document.createElement('br'))

        addChecklistItem.onclick = () => {

            
            let checkbox = document.createElement('input')
            checkbox.setAttribute('type', 'checkbox')
            checkbox.setAttribute('class', 'checkbox')
            let checklistItem = document.createElement('li')
            checklistItem.setAttribute('class', 'checklistItem')
            checklistItem.id = 'checklistItem'
            checklistItem.setAttribute('contenteditable', 'true')

            checklistButtons.add.remove()
            checklistButtons.remove.remove()

            checklistButtons.add.style.marginLeft = '0'

            checklist.appendChild(checkbox)
            checklist.appendChild(checklistItem)

            checklist.appendChild(checklistButtons.add)
            checklist.appendChild(checklistButtons.remove)

        }

        let checklistButtons = {
            add: addChecklistItem,
            remove: removeChecklistItem
        }
        checklist.appendChild(checklistButtons.add)
        checklist.appendChild(checklistButtons.remove)

        let task = {

            taskExpand: taskExpand,
            name: name,
            dueDate: dueDate,
            priority: priority,
            notes: notes,
            checklist: checklist,
            checklistButtons: checklistButtons

        }

        return task
    }

    return {DOM, projects}
})();