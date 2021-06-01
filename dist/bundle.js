/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("const App = (() => {\r\n\r\n    let projects = []\r\n    let storage = window.localStorage\r\n\r\n    function removeAllChildElements(element) {\r\n        while (element.firstChild) {\r\n            element.removeChild(element.firstChild)\r\n        }\r\n    }\r\n\r\n    const DOM = (() => {\r\n\r\n        let elements = {\r\n            appContainer: document.getElementById('appContainer'),\r\n            navBar:  document.getElementById('navBar'),\r\n            newProjectButton: document.getElementById('newProjectButton'),\r\n            deleteProjectButton: document.getElementById('deleteProjectButton'),\r\n            taskContainer: document.getElementById('taskContainer'),\r\n            newTaskButton: document.getElementById('newTaskButton'),\r\n            showCompletedTasksButton: document.getElementById('showCompletedTasksButton'),\r\n            banner: document.getElementById('banner')\r\n        }\r\n\r\n        function determinePriorityColor(priorityText) {\r\n            if (priorityText === 'Medium') {\r\n                return '#bdbd00'\r\n            }\r\n            else if (priorityText === 'High') {\r\n                return '#921616'\r\n            }\r\n            else {\r\n                return '#32cd13'\r\n            }\r\n        }\r\n\r\n        function createCheckbox() {\r\n            let checkbox = document.createElement('input')\r\n            checkbox.setAttribute('type', 'checkbox')\r\n            checkbox.setAttribute('class', 'checkbox')\r\n            return checkbox\r\n        }\r\n\r\n        function createChecklistItem(text = 'New Item') {\r\n\r\n            let checklistItem = document.createElement('li')\r\n            checklistItem.setAttribute('class', 'checklistItem')\r\n            checklistItem.id = 'checklistItem'\r\n            checklistItem.setAttribute('contenteditable', 'true')\r\n            checklistItem.textContent = text\r\n            return checklistItem\r\n        }\r\n\r\n        function loadTasks(project) {\r\n\r\n            removeAllChildElements(elements.taskContainer)\r\n\r\n            let i = 0\r\n            while (i < project.tasks.length) {\r\n                DOM.createTask(project.tasks[i])\r\n                i += 1\r\n            }\r\n            \r\n            let container = document.createElement('div')\r\n            container.setAttribute('class', 'task')\r\n            elements.taskContainer.appendChild(container)\r\n            container.appendChild(elements.newTaskButton)\r\n        }\r\n\r\n        function createProject(project) { \r\n            let button = document.createElement('ul')\r\n            button.classList.add('navItem', 'projectButton')\r\n            button.textContent = project.name\r\n            button.style.backgroundColor = '#007b94'\r\n            project.button = button\r\n            activeProject.button.style.backgroundColor = '#00c8f0'\r\n\r\n            //Button changes active project, color and displays project tasks upon clicking\r\n            button.onclick = () => {\r\n\r\n                if (!(activeProject === null)) { activeProject.button.style.backgroundColor = '#007b94'}\r\n                button.style.backgroundColor = '#00c8f0'\r\n                activeProject = project\r\n                loadTasks(project)\r\n            }\r\n\r\n            DOM.elements.navBar.appendChild(button)\r\n        }\r\n\r\n\r\n        function createTask(task) {\r\n\r\n            let container = elements.taskContainer\r\n            \r\n            //Create elements, set attributes and append them to container\r\n\r\n            let parent = document.createElement('div')\r\n            parent.setAttribute('class', 'task')\r\n\r\n            //Task Expand/Collapse button\r\n            let taskExpand = document.createElement('div')\r\n            taskExpand.classList.add('taskItem', 'taskExpand')\r\n            taskExpand.textContent = '+ / -'\r\n            //Task expand/collapse functionality\r\n            taskExpand.onclick = () => {\r\n                if (notesDiv.style.display == 'none') { //What to do if task is hidden\r\n                    notesDiv.style.display = 'block'\r\n                    checklistDiv.style.display = 'inline-block'\r\n                    deleteTaskButton.style.display = 'none'\r\n                    completeTaskButton.style.display = 'none'\r\n                    addChecklistItem.style.display = 'block'\r\n                    removeChecklistItem.style.display = 'block'\r\n                }\r\n                else { //What to do if it's already expanded\r\n                    notesDiv.style.display = 'none'\r\n                    checklistDiv.style.display = 'none'\r\n                    deleteTaskButton.style.display = 'block'\r\n                    completeTaskButton.style.display = 'block'\r\n                    addChecklistItem.style.display = 'none'\r\n                    removeChecklistItem.style.display = 'none'\r\n                }\r\n            }\r\n\r\n\r\n            //Name\r\n            let nameInput = document.createElement('textarea')\r\n            nameInput.classList.add('name', 'taskItem')\r\n            nameInput.setAttribute('id', 'name')\r\n            nameInput.value = task.name\r\n            nameInput.onchange = function() {\r\n                task.name = nameInput.value\r\n            }\r\n\r\n            //Due date\r\n            let dueDateDiv = document.createElement('div')\r\n            let dueDateText = document.createElement('input')\r\n            dueDateText.setAttribute('id', 'dueDateText')\r\n            dueDateDiv.classList.add('dueDate', 'taskItem')\r\n            dueDateDiv.setAttribute('id', 'dueDate')\r\n            dueDateDiv.textContent = 'Due: '\r\n            dueDateText.setAttribute('type', 'datetime-local')\r\n            dueDateText.value = task.dueDate\r\n            dueDateDiv.appendChild(dueDateText)\r\n            dueDateText.onchange = function() {\r\n                task.dueDate = dueDateText.value\r\n            }\r\n\r\n            //Priority\r\n            let priorityDiv = document.createElement('div')\r\n            let priorityText = document.createElement('span')\r\n            priorityDiv.classList.add('priority', 'taskItem')\r\n            priorityDiv.setAttribute('id', 'priority')\r\n            priorityDiv.textContent = 'Priority: '\r\n            priorityText.textContent = task.priority\r\n            priorityText.style.color = determinePriorityColor(task.priority)\r\n            priorityDiv.appendChild(priorityText)\r\n            //Functionality for priority text\r\n            priorityDiv.onclick = () => {\r\n                if (priorityText.textContent == 'Medium') {\r\n                    priorityText.textContent = 'High'\r\n                    priorityText.style.color = '#921616'\r\n                }\r\n                else if (priorityText.textContent == 'High') {\r\n                    priorityText.textContent = 'Low'\r\n                    priorityText.style.color = '#32cd13'\r\n                }\r\n                else {\r\n                    priorityText.textContent = 'Medium'\r\n                    priorityText.style.color = '#bdbd00'\r\n                }\r\n            }\r\n\r\n            //Notes\r\n            let notesDiv = document.createElement('div')\r\n            let notesText = document.createElement('textarea')\r\n            notesDiv.classList.add('taskItem', 'notes')\r\n            notesDiv.setAttribute('id', 'notes')\r\n            notesDiv.textContent = 'Notes'\r\n            notesText.setAttribute('id', 'notesText')\r\n            notesText.value = task.notes\r\n            notesDiv.appendChild(notesText)\r\n            notesText.onchange = function() {\r\n                task.notes = notesText.value\r\n            }\r\n\r\n            //Checklist\r\n            let checklistDiv = document.createElement('ol')\r\n            checklistDiv.classList.add('checklist', 'taskItem')\r\n            checklistDiv.setAttribute('id', 'checklist')\r\n            checklistDiv.textContent = 'Checklist'\r\n            checklistDiv.appendChild(document.createElement('br'))\r\n\r\n            //Checklist buttons\r\n            let addChecklistItem = document.createElement('div')\r\n            let removeChecklistItem = document.createElement('div')\r\n            addChecklistItem.setAttribute('class', 'addChecklistItem')\r\n            addChecklistItem.setAttribute('id', 'addChecklistItem')\r\n            addChecklistItem.textContent = '+'\r\n            removeChecklistItem.textContent = '-'\r\n            removeChecklistItem.setAttribute('class', 'removeChecklistItem')\r\n            removeChecklistItem.setAttribute('id', 'removeChecklistItem')\r\n\r\n            //Functionality for checklist buttons\r\n            addChecklistItem.onclick = () => {\r\n                addChecklistItem.previousSibling.appendChild(createCheckbox())\r\n                addChecklistItem.previousSibling.appendChild(createChecklistItem())\r\n            }\r\n            removeChecklistItem.onclick = () => {\r\n                let checklist = addChecklistItem.previousElementSibling\r\n                let lastItem = checklist.lastChild\r\n                if (lastItem != null && lastItem.nodeName != 'BR') {\r\n                    lastItem.previousSibling.remove()\r\n                    lastItem.remove() \r\n                }\r\n            }\r\n            //Append checklist items (if they exist)\r\n            for (let item in task.checklist) {\r\n                checklistDiv.appendChild(createCheckbox())\r\n                checklistDiv.appendChild(createChecklistItem(task.checklist[item]))\r\n            }\r\n\r\n            //Complete task button\r\n            let completeTaskButton = document.createElement('div')\r\n            completeTaskButton.setAttribute('class', 'taskItem')\r\n            completeTaskButton.setAttribute('id', 'completeTaskButton')\r\n            completeTaskButton.textContent = 'Complete'\r\n            completeTaskButton.style.display = 'none'\r\n            \r\n            completeTaskButton.onclick = () => {\r\n                for (let task in activeProject.tasks) {\r\n                    if (activeProject.tasks[task].name === nameInput.textContent) {\r\n                        activeProject.completedTasks[activeProject.completedTasksCount] = activeProject.tasks[task]\r\n                        activeProject.completedTasksCount += 1\r\n                        parent.remove()\r\n                        break\r\n                    }\r\n                }\r\n            }\r\n\r\n            //Delete task button\r\n            let deleteTaskButton = document.createElement('div')\r\n            deleteTaskButton.setAttribute('class', 'taskItem')\r\n            deleteTaskButton.setAttribute('id', 'deleteTaskButton')\r\n            deleteTaskButton.textContent = 'Delete'\r\n            deleteTaskButton.style.display = 'none'\r\n\r\n            deleteTaskButton.onclick = () => {\r\n                parent.remove()\r\n            }\r\n\r\n            //Append parent to task container, then task elements to parent\r\n            container.appendChild(parent)\r\n            parent.appendChild(taskExpand)\r\n            parent.appendChild(nameInput)\r\n            parent.appendChild(dueDateDiv)\r\n            parent.appendChild(priorityDiv)\r\n            parent.appendChild(notesDiv)\r\n            parent.appendChild(checklistDiv)\r\n            parent.appendChild(addChecklistItem)\r\n            parent.appendChild(removeChecklistItem)\r\n            parent.appendChild(completeTaskButton)\r\n            parent.appendChild(deleteTaskButton)\r\n\r\n            return {taskExpand, completeTaskButton, deleteTaskButton, addChecklistItem, removeChecklistItem}\r\n        }\r\n\r\n        return {elements, createTask, createProject};\r\n    })();\r\n\r\n    function createProject(name = 'New Project', tasks = [], completedTasks = [], completedTasksCount = 0, button = null) {\r\n        return {name, tasks, completedTasks, completedTasksCount, button};\r\n    }\r\n\r\n    function createTask(name = 'New Task', dueDate = \"\", priority = 'Medium', notes = '', checklist = {}) {\r\n        return {\r\n            name,\r\n            dueDate,\r\n            priority,\r\n            notes,\r\n            checklist\r\n        }\r\n    }\r\n\r\n    //New Project Button\r\n    DOM.elements.newProjectButton.onclick = () => { \r\n        let project = createProject()\r\n        projects.push(project)\r\n        DOM.createProject(project)\r\n        console.log(projects)\r\n    }\r\n\r\n    //Delete Project Button\r\n    DOM.elements.deleteProjectButton.onclick = () => {\r\n        if (!(activeProject === null)) {\r\n            removeAllChildElements(DOM.elements.taskContainer)\r\n            activeProject.button.remove()\r\n\r\n            //Remove active project from projects array\r\n            let i = 0\r\n\r\n            while (i < projects.length) {\r\n                if (activeProject === projects[i]) {\r\n                    projects.splice(i, 1)\r\n                    break\r\n                }\r\n                i += 1\r\n            }\r\n\r\n            activeProject = null\r\n        }\r\n    }\r\n\r\n    DOM.elements.newTaskButton.onclick = () => { \r\n        DOM.elements.newTaskButton.parentElement.remove()\r\n        DOM.elements.newTaskButton.remove()\r\n        let newTask = createTask()\r\n        activeProject.tasks.push(newTask)\r\n        DOM.createTask(newTask)\r\n        let newTaskContainer = document.createElement('div')\r\n        newTaskContainer.setAttribute('class', 'task')\r\n        newTaskContainer.appendChild(DOM.elements.newTaskButton)\r\n        DOM.elements.taskContainer.appendChild(newTaskContainer)\r\n    }\r\n\r\n    DOM.elements.showCompletedTasksButton.onclick = () => {\r\n        removeAllChildElements(DOM.elements.taskContainer)\r\n        for (let task in activeProject.completedTasks) {\r\n            let elements = DOM.createTask(activeProject.completedTasks[task])\r\n            elements.taskExpand.style.display = 'none'\r\n            elements.completeTaskButton.style.display = 'none'\r\n            elements.deleteTaskButton.style.display = 'none'\r\n            elements.addChecklistItem.style.display = 'none'\r\n            elements.removeChecklistItem.style.display = 'none'\r\n        }\r\n    }\r\n\r\n    let activeProject = createProject()\r\n    projects.push(activeProject)\r\n    DOM.createProject(activeProject)\r\n\r\n})();\n\n//# sourceURL=webpack://my-webpack-project/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;