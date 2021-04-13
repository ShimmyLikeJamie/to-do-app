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

eval("const App = (() => {\n\n    const DOM = (() => {\n\n        let elements = {\n            appContainer: document.getElementById('appContainer'),\n            navBar:  document.getElementById('navBar'),\n            newProjectButton: document.getElementById('newProjectButton'),\n            deleteProjectButton: document.getElementById('deleteProjectButton'),\n            taskContainer: document.getElementById('taskContainer'),\n            newTaskButton: document.getElementById('newTaskButton'),\n        }\n        return elements;\n    })();\n\n    let projects = []\n    let activeProject = createProject()\n\n    function removeAllChildElements(element) {\n        while (element.firstChild) {\n            element.removeChild(element.firstChild)\n        }\n    }\n\n    function changeActiveProject(project) { \n        activeProject.button.style.backgroundColor = '#007b94'\n        removeAllChildElements(DOM.taskContainer)\n        activeProject = project\n        activeProject.button.style.backgroundColor = '#00c8f0'\n        \n        let i = 0\n        while (i < activeProject.tasks.length) {\n            DOM.taskContainer.appendChild(activeProject.tasks[i].container)\n            i += 1\n        }\n        let newTask = document.createElement('div')\n        newTask.setAttribute('class', 'task')\n        newTask.appendChild(DOM.newTaskButton)\n        DOM.taskContainer.appendChild(newTask)\n\n    }\n\n    DOM.newTaskButton.onclick = () => { //Adds new task onto page\n        parent = DOM.newTaskButton.parentElement //Parent is taskContainer\n        let task = createTask()\n        DOM.newTaskButton.remove()\n        parent.appendChild(task.taskExpand)\n        parent.appendChild(task.name)\n        parent.appendChild(task.dueDate)\n        parent.appendChild(task.priority)\n        parent.appendChild(task.notes)\n        parent.appendChild(task.checklist)\n        task.checklist.appendChild(task.checklistButtons.add)\n        task.checklist.appendChild(task.checklistButtons.remove)\n        parent.appendChild(task.completeTaskButton)\n        parent.appendChild(task.deleteTaskButton)\n\n        let newTask = document.createElement('div')\n        newTask.setAttribute('class', 'task')\n        newTask.appendChild(DOM.newTaskButton)\n        DOM.taskContainer.appendChild(newTask)\n    }\n\n    DOM.newProjectButton.onclick = () => { //Creates new project and makes it the active project\n        changeActiveProject(createProject())\n    }\n    DOM.deleteProjectButton.onclick = () => { //Deletes active project\n        activeProject.button.remove()\n        removeAllChildElements(DOM.taskContainer)\n    }\n\n    function createProject() {\n\n        let button = document.createElement('ul')\n        button.classList.add('navItem', 'projectButton')\n        button.textContent = 'New Project'\n        button.setAttribute('contenteditable', 'true')\n        button.style.backgroundColor = '#00c8f0'\n\n        let tasks = []\n        let completedTasks = []\n        let completedTasksCount = 0\n\n        let project = {\n            name: button.textContent,\n            button: button,\n            tasks: tasks,\n            completedTasks,\n            completedTasksCount\n        }\n        \n        button.onclick = () => { \n            changeActiveProject(project)\n        }\n        document.getElementById('navBar').appendChild(button)\n        projects.push(project)\n        return project\n    }\n\n    function createTask() {\n\n        //Create elements and set attributes\n\n        //Task Expand/Collapse button\n        let taskExpand = document.createElement('div')\n        taskExpand.classList.add('taskItem', 'taskExpand')\n        taskExpand.textContent = '+ / -'\n\n        //Name of task\n        let name = document.createElement('div')\n        name.setAttribute('contenteditable', 'true')\n        name.classList.add('name', 'taskItem')\n        name.setAttribute('id', 'name')\n        name.textContent = 'Task Name'\n\n        //Due date of task\n        let dueDate = document.createElement('div')\n        let dueDateText = document.createElement('input')\n        dueDateText.setAttribute('id', 'dueDateText')\n        dueDate.classList.add('dueDate', 'taskItem')\n        dueDate.setAttribute('id', 'dueDate')\n        dueDate.textContent = 'Due: '\n        dueDateText.setAttribute('type', 'datetime-local')\n        dueDate.appendChild(dueDateText)\n\n        //Priority of task\n        let priority = document.createElement('div')\n        let priorityText = document.createElement('span')\n        priority.classList.add('priority', 'taskItem')\n        priority.setAttribute('id', 'priority')\n        priority.textContent = 'Priority: '\n        priorityText.textContent = 'Medium'\n        priorityText.style.color = '#bdbd00'\n        priority.appendChild(priorityText)\n        \n        //Notes of task\n        let notes = document.createElement('div')\n        let notesText = document.createElement('div')\n        notes.classList.add('taskItem', 'notes')\n        notes.setAttribute('id', 'notes')\n        notes.textContent = 'Notes'\n        notesText.setAttribute('contenteditable', 'true')\n        notesText.setAttribute('class', 'notesText')\n        notes.appendChild(notesText)\n\n        //Checklist of task\n        let checklist = document.createElement('ol')\n        let addChecklistItem = document.createElement('div')\n        let removeChecklistItem = document.createElement('div')\n        addChecklistItem.setAttribute('class', 'addChecklistItem')\n        addChecklistItem.setAttribute('id', 'addChecklistItem')\n        addChecklistItem.textContent = '+'\n        removeChecklistItem.textContent = '-'\n        removeChecklistItem.setAttribute('class', 'removeChecklistItem')\n        removeChecklistItem.setAttribute('id', 'removeChecklistItem')\n        checklist.classList.add('checklist', 'taskItem')\n        checklist.setAttribute('id', 'checklist')\n        checklist.textContent = 'Checklist'\n        checklist.appendChild(document.createElement('br'))\n\n        //Delete button of task\n        let deleteTaskButton = document.createElement('div')\n        deleteTaskButton.setAttribute('class', 'taskItem')\n        deleteTaskButton.setAttribute('id', 'deleteTaskButton')\n        deleteTaskButton.textContent = 'Delete'\n        deleteTaskButton.style.display = 'none'\n\n        deleteTaskButton.onclick = () => {\n            task.container.remove()\n\n            let i = 0\n\n            while (i < activeProject.tasks.length) {\n                if (activeProject.tasks[i] === task) {\n                    activeProject.tasks.splice(i, 1)\n                    break\n                }\n                i += 1\n            }\n        }\n        \n        //Complete button of task\n        let completeTaskButton = document.createElement('div')\n        completeTaskButton.setAttribute('class', 'taskItem')\n        completeTaskButton.setAttribute('id', 'completeTaskButton')\n        completeTaskButton.textContent = 'Complete'\n        completeTaskButton.style.display = 'none'\n\n        completeTaskButton.onclick = () => {\n            task.container.remove()\n\n            let i = 0\n\n            while (i < activeProject.tasks.length) {\n                if (activeProject.tasks[i] === task) {\n                    activeProject.completedTasks.push(activeProject.tasks[i])\n                    activeProject.completedTasksCount += 1\n                    activeProject.tasks.splice(i, 1)\n                    break\n                }\n                i += 1\n            }\n        }\n\n        addChecklistItem.onclick = () => {\n\n            \n            let checkbox = document.createElement('input')\n            checkbox.setAttribute('type', 'checkbox')\n            checkbox.setAttribute('class', 'checkbox')\n            let checklistItem = document.createElement('li')\n            checklistItem.setAttribute('class', 'checklistItem')\n            checklistItem.id = 'checklistItem'\n            checklistItem.setAttribute('contenteditable', 'true')\n            checklistItem.textContent = 'Edit me'\n\n            checklistButtons.add.remove()\n            checklistButtons.remove.remove()\n\n            checklist.appendChild(checkbox)\n            checklist.appendChild(checklistItem)\n\n            checklist.appendChild(checklistButtons.add)\n            checklist.appendChild(checklistButtons.remove)\n\n        }\n\n        removeChecklistItem.onclick = () => {\n            let checklistItem = addChecklistItem.previousElementSibling\n            let checkbox = checklistItem.previousElementSibling\n            if (checkbox != null) {\n                checklistItem.remove()\n                checkbox.remove()        \n            }\n        }\n\n        let checklistButtons = {\n            add: addChecklistItem,\n            remove: removeChecklistItem\n        }\n        checklist.appendChild(checklistButtons.add)\n        checklist.appendChild(checklistButtons.remove)\n\n        taskExpand.onclick = () => {\n            if (notes.style.display == 'none') { //What to do if task is hidden\n                notes.style.display = 'block'\n                checklist.style.display = 'inline-block'\n                deleteTaskButton.style.display = 'none'\n                completeTaskButton.style.display = 'none'\n            }\n            else { //What to do if it's already expanded\n                notes.style.display = 'none'\n                checklist.style.display = 'none'\n                deleteTaskButton.style.display = 'block'\n                completeTaskButton.style.display = 'block'\n            }\n        }\n\n        priority.onclick = () => {\n            if (priorityText.textContent == 'Medium') {\n                priorityText.textContent = 'High'\n                priorityText.style.color = '#921616'\n            }\n            else if (priorityText.textContent == 'High') {\n                priorityText.textContent = 'Low'\n                priorityText.style.color = '#32cd13'\n            }\n            else {\n                priorityText.textContent = 'Medium'\n                priorityText.style.color = '#bdbd00'\n            }\n        }\n\n        let task = {\n\n            container: DOM.newTaskButton.parentElement,\n            taskExpand: taskExpand,\n            name: name,\n            dueDate: dueDate,\n            priority: priority,\n            notes: notes,\n            checklist: checklist,\n            checklistButtons: checklistButtons,\n            deleteTaskButton: deleteTaskButton,\n            completeTaskButton: completeTaskButton\n        }\n\n        activeProject.tasks.push(task)\n        return task\n    }\n    return {createProject, createTask}\n})();\n\n//# sourceURL=webpack://my-webpack-project/./src/index.js?");

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