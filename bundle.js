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

eval("const App = (() => {\n\n    const DOM = (() => {\n\n        let elements = {\n            appContainer: document.getElementById('appContainer'),\n            navBar:  document.getElementById('navBar'),\n            newProjectButton: document.getElementById('newProjectButton'),\n            deleteProjectButton: document.getElementById('deleteProjectButton'),\n            taskContainer: document.getElementById('taskContainer'),\n            newTaskButton: document.getElementById('newTaskButton'),\n            tasks: {}\n        }\n        return elements;\n    })();\n\n    let projects = {}\n    let activeProject = createProject()\n\n    DOM['newTaskButton'].onclick = () => { //Adds new task onto page\n        parent = DOM['newTaskButton'].parentElement\n        DOM['newTaskButton'].remove()\n        let task = createTask()\n        console.log(task)\n        parent.appendChild(task.taskExpand)\n        parent.appendChild(task.name)\n        parent.appendChild(task.dueDate)\n        parent.appendChild(task.priority)\n        parent.appendChild(task.notes)\n        parent.appendChild(task.checklist)\n        parent.appendChild(task.checklistButtons)\n\n        let newTask = document.createElement('div')\n        newTask.setAttribute('class', 'task')\n        newTask.appendChild(DOM.newTaskButton)\n        DOM.taskContainer.appendChild(newTask)\n    }\n\n    function createProject() {\n\n        let button = document.createElement('ul')\n        button.setAttribute('class', 'navItem')\n        button.textContent = 'New Project'\n        button.setAttribute('editablecontent', 'true')\n        let tasks = {}\n\n        let project = {\n            button: button,\n            tasks: tasks\n        }\n        \n        return project\n    }\n\n    function createTask() {\n\n        //Create elements and set attributes\n\n        //Task Expand/Collapse button\n        let taskExpand = document.createElement('div')\n        taskExpand.classList.add('taskItem', 'taskExpand')\n        taskExpand.textContent = '+'\n\n        //Name of task\n        let name = document.createElement('div')\n        name.setAttribute('contenteditable', 'true')\n        name.classList.add('name', 'taskItem')\n        name.setAttribute('id', 'name')\n        name.textContent = 'Task Name'\n\n        //Due date of task\n        let dueDate = document.createElement('div')\n        let dueDateText = document.createElement('span')\n        dueDate.classList.add('dueDate', 'taskItem')\n        dueDate.setAttribute('id', 'dueDate')\n        dueDate.textContent = 'Due: '\n        dueDateText.setAttribute('contenteditable', 'true')\n        dueDate.appendChild(dueDateText)\n\n        //Priority of task\n        let priority = document.createElement('div')\n        let priorityText = document.createElement('span')\n        priority.classList.add('priority', 'taskItem')\n        priority.setAttribute('id', 'priority')\n        priority.textContent = 'Priority: '\n        priorityText.setAttribute('contenteditable', 'true')\n        priority.appendChild(priorityText)\n        \n        //Notes of task\n        let notes = document.createElement('div')\n        let notesText = document.createElement('div')\n        notes.classList.add('taskItem', 'notes')\n        notes.setAttribute('id', 'notes')\n        notes.textContent = 'Notes'\n        notesText.setAttribute('contenteditable', 'true')\n        notesText.setAttribute('class', 'notesText')\n        notes.appendChild(notesText)\n\n        //Checklist of task\n        let checklist = document.createElement('ol')\n        let addChecklistItem = document.createElement('div')\n        let removeChecklistItem = document.createElement('div')\n        addChecklistItem.setAttribute('class', 'addChecklistItem')\n        addChecklistItem.textContent = '+'\n        removeChecklistItem.textContent = '-'\n        removeChecklistItem.setAttribute('class', 'removeChecklistItem')\n        checklist.classList.add('checklist', 'taskItem')\n        checklist.setAttribute('id', 'checklist')\n        checklist.textContent = 'Checklist'\n        checklist.appendChild(document.createElement('br'))\n        let checklistButtons = {\n            add: addChecklistItem,\n            remove: removeChecklistItem\n        }\n        checklist.appendChild(checklistButtons.add)\n        checklist.appendChild(checklistButtons.remove)\n\n        let task = {\n\n            taskExpand: taskExpand,\n            name: name,\n            dueDate: dueDate,\n            priority: priority,\n            notes: notes,\n            checklist: checklist,\n            checklistButtons: checklistButtons\n\n        }\n\n        return task\n    }\n\n    return {DOM, projects}\n})();\n\n//# sourceURL=webpack://my-webpack-project/./src/index.js?");

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