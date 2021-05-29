const App = (() => {

    let storage = window.localStorage

    function removeAllChildElements(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild)
        }
    }

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

        function determinePriorityColor(priorityText) {
            if (priorityText === 'Medium') {
                return '#bdbd00'
            }
            else if (priorityText === 'High') {
                return '#921616'
            }
            else {
                return '#32cd13'
            }
        }

        function createCheckbox() {
            let checkbox = document.createElement('input')
            checkbox.setAttribute('type', 'checkbox')
            checkbox.setAttribute('class', 'checkbox')
            return checkbox
        }

        function createChecklistItem(text = 'New Item') {

            let checklistItem = document.createElement('li')
            checklistItem.setAttribute('class', 'checklistItem')
            checklistItem.id = 'checklistItem'
            checklistItem.setAttribute('contenteditable', 'true')
            checklistItem.textContent = text
            return checklistItem
        }

        function loadTasks(project) {

            removeAllChildElements(elements.taskContainer)

            let i = 0
            while (i < project.tasks.length) {
                DOM.createTask(project.tasks[i])
                i += 1
            }
            
            let container = document.createElement('div')
            container.setAttribute('class', 'task')
            elements.taskContainer.appendChild(container)
            container.appendChild(elements.newTaskButton)
        }

        function createProject(project) {
            let button = document.createElement('ul')
            button.classList.add('navItem', 'projectButton')
            button.textContent = project.name
            button.setAttribute('contenteditable', 'true')
            button.style.backgroundColor = '#007b94'
            project.button = button
            activeProject.button.style.backgroundColor = '#00c8f0'


            //Button changes active project, color and displays project tasks upon clicking
            button.onclick = () => {

                activeProject.button.style.backgroundColor = '#007b94'
                button.style.backgroundColor = '#00c8f0'
                activeProject = project
                loadTasks(project)
            }

            DOM.elements.navBar.appendChild(button)
        }


        function createTask(task) {

            let container = elements.taskContainer
            
            //Create elements, set attributes and append them to container

            let parent = document.createElement('div')
            parent.setAttribute('class', 'task')

            //Task Expand/Collapse button
            let taskExpand = document.createElement('div')
            taskExpand.classList.add('taskItem', 'taskExpand')
            taskExpand.textContent = '+ / -'
            //Task expand/collapse functionality
            taskExpand.onclick = () => {
                if (notesDiv.style.display == 'none') { //What to do if task is hidden
                    notesDiv.style.display = 'block'
                    checklistDiv.style.display = 'inline-block'
                    deleteTaskButton.style.display = 'none'
                    completeTaskButton.style.display = 'none'
                }
                else { //What to do if it's already expanded
                    notesDiv.style.display = 'none'
                    checklistDiv.style.display = 'none'
                    deleteTaskButton.style.display = 'block'
                    completeTaskButton.style.display = 'block'
                }
            }


            //Name
            let nameInput = document.createElement('textarea')
            nameInput.classList.add('name', 'taskItem')
            nameInput.setAttribute('id', 'name')
            nameInput.value = task.name
            nameInput.onchange = function() {
                task.name = nameInput.value
            }

            //Due date
            let dueDateDiv = document.createElement('div')
            let dueDateText = document.createElement('input')
            dueDateText.setAttribute('id', 'dueDateText')
            dueDateDiv.classList.add('dueDate', 'taskItem')
            dueDateDiv.setAttribute('id', 'dueDate')
            dueDateDiv.textContent = 'Due: '
            dueDateText.setAttribute('type', 'datetime-local')
            dueDateText.value = task.dueDate
            dueDateDiv.appendChild(dueDateText)
            dueDateText.onchange = function() {
                task.dueDate = dueDateText.value
            }

            //Priority
            let priorityDiv = document.createElement('div')
            let priorityText = document.createElement('span')
            priorityDiv.classList.add('priority', 'taskItem')
            priorityDiv.setAttribute('id', 'priority')
            priorityDiv.textContent = 'Priority: '
            priorityText.textContent = task.priority
            priorityText.style.color = determinePriorityColor(task.priority)
            priorityDiv.appendChild(priorityText)
            //Functionality for priority text
            priorityDiv.onclick = () => {
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

            //Notes
            let notesDiv = document.createElement('div')
            let notesText = document.createElement('textarea')
            notesDiv.classList.add('taskItem', 'notes')
            notesDiv.setAttribute('id', 'notes')
            notesDiv.textContent = 'Notes'
            notesText.setAttribute('id', 'notesText')
            notesText.value = task.notes
            notesDiv.appendChild(notesText)
            notesText.onchange = function() {
                task.notes = notesText.value
            }

            //Checklist
            let checklistDiv = document.createElement('ol')
            checklistDiv.classList.add('checklist', 'taskItem')
            checklistDiv.setAttribute('id', 'checklist')
            checklistDiv.textContent = 'Checklist'
            checklistDiv.appendChild(document.createElement('br'))

            //Checklist buttons
            let addChecklistItem = document.createElement('div')
            let removeChecklistItem = document.createElement('div')
            addChecklistItem.setAttribute('class', 'addChecklistItem')
            addChecklistItem.setAttribute('id', 'addChecklistItem')
            addChecklistItem.textContent = '+'
            removeChecklistItem.textContent = '-'
            removeChecklistItem.setAttribute('class', 'removeChecklistItem')
            removeChecklistItem.setAttribute('id', 'removeChecklistItem')

            //Functionality for checklist buttons
            addChecklistItem.onclick = () => {
                addChecklistItem.previousSibling.appendChild(createCheckbox())
                addChecklistItem.previousSibling.appendChild(createChecklistItem())
            }
            removeChecklistItem.onclick = () => {
                let checklist = addChecklistItem.previousElementSibling
                let lastItem = checklist.lastChild
                if (lastItem != null && lastItem.nodeName != 'BR') {
                    lastItem.previousSibling.remove()
                    lastItem.remove() 
                }
            }
            //Append checklist items (if they exist)
            for (let item in task.checklist) {
                checklistDiv.appendChild(createCheckbox())
                checklistDiv.appendChild(createChecklistItem(task.checklist[item]))
            }

            //Complete task button
            let completeTaskButton = document.createElement('div')
            completeTaskButton.setAttribute('class', 'taskItem')
            completeTaskButton.setAttribute('id', 'completeTaskButton')
            completeTaskButton.textContent = 'Complete'
            completeTaskButton.style.display = 'none'
            
            completeTaskButton.onclick = () => {
                for (let task in activeProject.tasks) {
                    if (activeProject.tasks[task].name === nameInput.textContent) {
                        activeProject.completedTasks[activeProject.completedTasksCount] = activeProject.tasks[task]
                        activeProject.completedTasksCount += 1
                        parent.remove()
                        break
                    }
                }
            }

            //Delete task button
            let deleteTaskButton = document.createElement('div')
            deleteTaskButton.setAttribute('class', 'taskItem')
            deleteTaskButton.setAttribute('id', 'deleteTaskButton')
            deleteTaskButton.textContent = 'Delete'
            deleteTaskButton.style.display = 'none'

            deleteTaskButton.onclick = () => {
                parent.remove()
            }

            //Append parent to task container, then task elements to parent
            container.appendChild(parent)
            parent.appendChild(taskExpand)
            parent.appendChild(nameInput)
            parent.appendChild(dueDateDiv)
            parent.appendChild(priorityDiv)
            parent.appendChild(notesDiv)
            parent.appendChild(checklistDiv)
            parent.appendChild(addChecklistItem)
            parent.appendChild(removeChecklistItem)
            parent.appendChild(completeTaskButton)
            parent.appendChild(deleteTaskButton)

            return {taskExpand, completeTaskButton, deleteTaskButton, addChecklistItem, removeChecklistItem}
        }

        return {elements, createTask, createProject};
    })();

    function createProject(name = 'New Project', tasks = [], completedTasks = [], completedTasksCount = 0, button = null) {
        return {name, tasks, completedTasks, completedTasksCount, button};
    }

    function createTask(name = 'New Task', dueDate = "", priority = 'Medium', notes = '', checklist = {}) {
        return {
            name,
            dueDate,
            priority,
            notes,
            checklist
        }
    }

    DOM.elements.newProjectButton.onclick = () => { DOM.createProject(createProject()) }

    DOM.elements.deleteProjectButton.onclick = () => {
        removeAllChildElements(DOM.elements.taskContainer)
        activeProject.button.remove()
        activeProject = null
    }

    DOM.elements.newTaskButton.onclick = () => { 
        DOM.elements.newTaskButton.parentElement.remove()
        DOM.elements.newTaskButton.remove()
        let newTask = createTask()
        activeProject.tasks.push(newTask)
        DOM.createTask(newTask)
        let newTaskContainer = document.createElement('div')
        newTaskContainer.setAttribute('class', 'task')
        newTaskContainer.appendChild(DOM.elements.newTaskButton)
        DOM.elements.taskContainer.appendChild(newTaskContainer)
    }

    DOM.elements.showCompletedTasksButton.onclick = () => {
        removeAllChildElements(DOM.elements.taskContainer)
        for (let task in activeProject.completedTasks) {
            let elements = DOM.createTask(activeProject.completedTasks[task])
            elements.taskExpand.style.display = 'none'
            elements.completeTaskButton.style.display = 'none'
            elements.deleteTaskButton.style.display = 'none'
            elements.addChecklistItem.style.display = 'none'
            elements.removeChecklistItem.style.display = 'none'
        }
    }

    let activeProject = createProject()
    DOM.createProject(activeProject)

})();