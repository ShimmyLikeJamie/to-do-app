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

eval("const App = (() => {\n\n    const DOM = (() => {\n\n        let elements = {\n            appContainer: document.getElementById('appContainer'),\n            navBar:  document.getElementById('navBar'),\n            newProjectButton: document.getElementById('newProjectButton'),\n            taskContainer: document.getElementById('taskContainer'),\n            tasks: {}\n        }\n\n        return elements\n    });\n\n    let projects = {}\n\n    \n});\n\nlet navBar = document.getElementById('navBar')\nlet newItem = document.createElement('ul')\nnewItem.textContent = 'newItem'\nnewItem.setAttribute('class', 'navItem')\nnavBar.appendChild(newItem)\n\n//# sourceURL=webpack://my-webpack-project/./src/index.js?");

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