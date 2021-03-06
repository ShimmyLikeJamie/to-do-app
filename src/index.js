// Entire App is in an IIFE
(() => {
  let projects = [];
  let storage = window.localStorage;
  let activeProject = null;

  function removeAllChildElements(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

  const DOM = (() => {
    let elements = {
      appContainer: document.getElementById('appContainer'),
      navBar: document.getElementById('navBar'),
      newProjectButton: document.getElementById('newProjectButton'),
      deleteProjectButton: document.getElementById('deleteProjectButton'),
      taskContainer: document.getElementById('taskContainer'),
      newTaskButton: document.getElementById('newTaskButton'),
      showCompletedTasksButton: document.getElementById(
        'showCompletedTasksButton'
      ),
      banner: document.getElementById('banner'),
    };

    elements.banner.onchange = function () {
      if (activeProject != null) {
        activeProject.name = elements.banner.value;
        activeProject.button.textContent = elements.banner.value;
      }
    };

    function determinePriorityColor(priorityText) {
      if (priorityText === 'Medium') {
        return '#bdbd00';
      } else if (priorityText === 'High') {
        return '#921616';
      } else {
        return '#32cd13';
      }
    }

    function createCheckbox() {
      let checkbox = document.createElement('input');
      checkbox.setAttribute('type', 'checkbox');
      checkbox.setAttribute('class', 'checkbox');
      return checkbox;
    }

    function createChecklistItem(text = 'New Item') {
      let checklistItem = document.createElement('textarea');
      checklistItem.setAttribute('class', 'checklistItem');
      checklistItem.id = 'checklistItem';
      checklistItem.value = text;
      return checklistItem;
    }

    function loadTasks(project) {
      removeAllChildElements(elements.taskContainer);

      let i = 0;
      while (i < project.tasks.length) {
        DOM.createTask(project.tasks[i]);
        i += 1;
      }

      let container = document.createElement('div');
      container.setAttribute('class', 'task');
      elements.taskContainer.appendChild(container);
      container.appendChild(elements.newTaskButton);
    }

    function createProject(project) {
      let button = document.createElement('ul');
      button.classList.add('navItem', 'projectButton');
      button.textContent = project.name;
      button.style.backgroundColor = '#007b94';
      project.button = button;

      if (activeProject != null) {
        activeProject.button.style.backgroundColor = '#00c8f0';
      }

      //Button changes active project, color and displays project tasks upon clicking
      button.onclick = () => {
        if (!(activeProject === null)) {
          activeProject.button.style.backgroundColor = '#007b94';
        }
        button.style.backgroundColor = '#00c8f0';
        activeProject = project;
        loadTasks(project);
        DOM.elements.banner.value = activeProject.name;
      };

      DOM.elements.navBar.appendChild(button);
    }

    function createTask(task) {
      let container = elements.taskContainer;

      //Create elements, set attributes and append them to container

      let parent = document.createElement('div');
      parent.setAttribute('class', 'task');

      //Task Expand/Collapse button
      let taskExpand = document.createElement('div');
      taskExpand.classList.add('taskItem', 'taskExpand');
      taskExpand.textContent = '+ / -';
      //Task expand/collapse functionality
      taskExpand.onclick = () => {
        if (notesDiv.style.display == 'none') {
          //What to do if task is hidden
          notesDiv.style.display = 'block';
          checklistDiv.style.display = 'inline-block';
          deleteTaskButton.style.display = 'none';
          completeTaskButton.style.display = 'none';
          addChecklistItem.style.display = 'block';
          removeChecklistItem.style.display = 'block';
        } else {
          //What to do if it's already expanded
          notesDiv.style.display = 'none';
          checklistDiv.style.display = 'none';
          deleteTaskButton.style.display = 'block';
          completeTaskButton.style.display = 'block';
          addChecklistItem.style.display = 'none';
          removeChecklistItem.style.display = 'none';
        }
      };

      //Name
      let nameDiv = document.createElement('textarea');
      nameDiv.classList.add('name', 'taskItem');
      nameDiv.setAttribute('id', 'name');
      nameDiv.value = task.name;
      nameDiv.onchange = function () {
        task.name = nameDiv.value;
      };

      //Due date
      let dueDateDiv = document.createElement('div');
      let dueDateText = document.createElement('input');
      dueDateText.setAttribute('id', 'dueDateText');
      dueDateDiv.classList.add('dueDate', 'taskItem');
      dueDateDiv.setAttribute('id', 'dueDate');
      dueDateDiv.textContent = 'Due: ';
      dueDateText.setAttribute('type', 'datetime-local');
      dueDateText.value = task.dueDate;
      dueDateDiv.appendChild(dueDateText);
      dueDateText.onchange = function () {
        task.dueDate = dueDateText.value;
      };

      //Priority
      let priorityDiv = document.createElement('div');
      let priorityText = document.createElement('span');
      priorityDiv.classList.add('priority', 'taskItem');
      priorityDiv.setAttribute('id', 'priority');
      priorityDiv.textContent = 'Priority: ';
      priorityText.textContent = task.priority;
      priorityText.style.color = determinePriorityColor(task.priority);
      priorityDiv.appendChild(priorityText);
      //Functionality for priority text
      priorityDiv.onclick = () => {
        if (priorityText.textContent == 'Medium') {
          priorityText.textContent = 'High';
          priorityText.style.color = '#921616';
        } else if (priorityText.textContent == 'High') {
          priorityText.textContent = 'Low';
          priorityText.style.color = '#32cd13';
        } else {
          priorityText.textContent = 'Medium';
          priorityText.style.color = '#bdbd00';
        }
      };

      //Notes
      let notesDiv = document.createElement('div');
      let notesText = document.createElement('textarea');
      notesDiv.classList.add('taskItem', 'notes');
      notesDiv.setAttribute('id', 'notes');
      notesDiv.textContent = 'Notes';
      notesText.setAttribute('id', 'notesText');
      notesText.value = task.notes;
      notesDiv.appendChild(notesText);
      notesText.onchange = function () {
        task.notes = notesText.value;
      };

      //Checklist
      let checklistDiv = document.createElement('ol');
      checklistDiv.classList.add('checklist', 'taskItem');
      checklistDiv.setAttribute('id', 'checklist');
      checklistDiv.textContent = 'Checklist';
      checklistDiv.appendChild(document.createElement('br'));

      //Checklist buttons
      let addChecklistItem = document.createElement('div');
      let removeChecklistItem = document.createElement('div');
      addChecklistItem.setAttribute('class', 'addChecklistItem');
      addChecklistItem.setAttribute('id', 'addChecklistItem');
      addChecklistItem.textContent = '+';
      removeChecklistItem.textContent = '-';
      removeChecklistItem.setAttribute('class', 'removeChecklistItem');
      removeChecklistItem.setAttribute('id', 'removeChecklistItem');

      //Functionality for checklist buttons
      addChecklistItem.onclick = () => {
        addChecklistItem.previousSibling.appendChild(createCheckbox());
        let item = createChecklistItem();
        task.checklist.push(item.value);
        addChecklistItem.previousSibling.appendChild(item);
      };
      removeChecklistItem.onclick = () => {
        let checklist = addChecklistItem.previousElementSibling;
        let lastItem = checklist.lastChild;
        if (lastItem != null && lastItem.nodeName != 'BR') {
          let i = 0;
          while (i < task.checklist.length) {
            if (lastItem.value === task.checklist[i]) {
              task.checklist.splice(i, 1);
              break;
            }
            i += 1;
          }
          lastItem.previousSibling.remove();
          lastItem.remove();
        }
      };
      //Append checklist items (if they exist)
      let i = 0;
      while (i < task.checklist.length) {
        checklistDiv.appendChild(createCheckbox());
        let item = createChecklistItem(task.checklist[i]);
        let cachedval = item.value;
        checklistDiv.appendChild(item);

        item.onchange = function () {
          let x = 0;
          while (x < task.checklist.length) {
            if (task.checklist[x] == cachedval) {
              task.checklist[x] = item.value;
              cachedval = item.value;
              break;
            }
            x += 1;
          }
        };
        i += 1;
      }

      //Complete task button
      let completeTaskButton = document.createElement('div');
      completeTaskButton.setAttribute('class', 'taskItem');
      completeTaskButton.setAttribute('id', 'completeTaskButton');
      completeTaskButton.textContent = 'Complete';
      completeTaskButton.style.display = 'none';

      completeTaskButton.onclick = () => {
        let i = 0;
        while (i < activeProject.tasks.length) {
          if (activeProject.tasks[i].name === nameDiv.value) {
            activeProject.completedTasks[activeProject.completedTasksCount] =
              activeProject.tasks[i];
            activeProject.tasks.splice(i, 1);
            activeProject.completedTasksCount += 1;
            parent.remove();
            break;
          }
          i += 1;
        }
      };

      //Delete task button
      let deleteTaskButton = document.createElement('div');
      deleteTaskButton.setAttribute('class', 'taskItem');
      deleteTaskButton.setAttribute('id', 'deleteTaskButton');
      deleteTaskButton.textContent = 'Delete';
      deleteTaskButton.style.display = 'none';

      deleteTaskButton.onclick = () => {
        let i = 0;
        console.log(activeProject.tasks);
        while (i < activeProject.tasks.length) {
          if (activeProject.tasks[i].name === nameDiv.value) {
            activeProject.tasks.splice(i, 1);
            break;
          }
          i += 1;
        }
        parent.remove();
        console.log('after removal');
        console.log(activeProject.tasks);
      };

      //Append parent to task container, then task elements to parent
      container.appendChild(parent);
      parent.appendChild(taskExpand);
      parent.appendChild(nameDiv);
      parent.appendChild(dueDateDiv);
      parent.appendChild(priorityDiv);
      parent.appendChild(notesDiv);
      parent.appendChild(checklistDiv);
      parent.appendChild(addChecklistItem);
      parent.appendChild(removeChecklistItem);
      parent.appendChild(completeTaskButton);
      parent.appendChild(deleteTaskButton);

      return {
        taskExpand,
        completeTaskButton,
        deleteTaskButton,
        addChecklistItem,
        removeChecklistItem,
        priorityDiv,
      };
    }

    return { elements, createTask, createProject, loadTasks };
  })();

  function createProject(
    name = 'New Project',
    tasks = [],
    completedTasks = [],
    completedTasksCount = 0,
    button = null,
    showCompletedTasks = false
  ) {
    return {
      name,
      tasks,
      completedTasks,
      completedTasksCount,
      button,
      showCompletedTasks,
    };
  }

  function createTask(
    name = 'New Task',
    dueDate = '',
    priority = 'Medium',
    notes = '',
    checklist = []
  ) {
    return {
      name,
      dueDate,
      priority,
      notes,
      checklist,
    };
  }

  //New Project Button
  DOM.elements.newProjectButton.onclick = () => {
    let project = createProject();
    projects.push(project);
    DOM.createProject(project);
    console.log(projects);
  };

  //Delete Project Button
  DOM.elements.deleteProjectButton.onclick = () => {
    if (!(activeProject === null)) {
      removeAllChildElements(DOM.elements.taskContainer);
      activeProject.button.remove();

      //Remove active project from projects array
      let i = 0;

      while (i < projects.length) {
        if (activeProject === projects[i]) {
          projects.splice(i, 1);
          break;
        }
        i += 1;
      }

      activeProject = null;
    }
  };

  DOM.elements.newTaskButton.onclick = () => {
    DOM.elements.newTaskButton.parentElement.remove();
    DOM.elements.newTaskButton.remove();
    let newTask = createTask();
    activeProject.tasks.push(newTask);
    DOM.createTask(newTask);
    let newTaskContainer = document.createElement('div');
    newTaskContainer.setAttribute('class', 'task');
    newTaskContainer.appendChild(DOM.elements.newTaskButton);
    DOM.elements.taskContainer.appendChild(newTaskContainer);
  };

  DOM.elements.showCompletedTasksButton.onclick = () => {
    //Show completed tasks button

    if (activeProject.showCompletedTasks == false) {
      removeAllChildElements(DOM.elements.taskContainer);
      let i = 0;
      while (i < activeProject.completedTasks.length) {
        let elements = DOM.createTask(activeProject.completedTasks[i]);
        elements.taskExpand.style.display = 'none';

        elements.completeTaskButton.style.display = 'none';
        elements.deleteTaskButton.style.display = 'none';
        elements.addChecklistItem.style.display = 'none';
        elements.removeChecklistItem.style.display = 'none';
        elements.priorityDiv.style.display = 'none';

        i += 1;
      }
      activeProject.showCompletedTasks = true;
      DOM.elements.showCompletedTasksButton.style.backgroundColor = '#00c8f0';
    } else {
      DOM.loadTasks(activeProject);
      activeProject.showCompletedTasks = false;
      DOM.elements.showCompletedTasksButton.style.backgroundColor = '#007b94';
    }
  };

  setInterval(function () {
    console.log('Saving projects...');
    storage.setItem('projects', JSON.stringify(projects));
    console.log('Projects saved');
    console.log(projects);
  }, 60 * 1000); // 60 * 1000 milsec

  if (storage.getItem('projects') == null) {
    activeProject = createProject();
    projects.push(activeProject);
    DOM.createProject(activeProject);
  } else {
    projects = JSON.parse(storage.getItem('projects'));
    let i = 0;
    while (i < projects.length) {
      DOM.createProject(projects[i]);
      i += 1;
    }
    removeAllChildElements(DOM.elements.taskContainer);
  }
})();
