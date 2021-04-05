const App = (() => {

    const DOM = (() => {

        let elements = {
            appContainer: document.getElementById('appContainer'),
            navBar:  document.getElementById('navBar'),
            newProjectButton: document.getElementById('newProjectButton'),
            taskContainer: document.getElementById('taskContainer'),
            tasks: {}
        }

        return elements
    });

    let projects = {}

    
});

let navBar = document.getElementById('navBar')
let newItem = document.createElement('ul')
newItem.textContent = 'newItem'
newItem.setAttribute('class', 'navItem')
navBar.appendChild(newItem)