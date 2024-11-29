const rootStyles = document.documentElement.style;
const activateDarkElement = document.getElementById('to-dark');
const deactivateDarkElement = document.getElementById('no-dark');
const inputElement = document.getElementById('input');
const toAddTasksElement = document.getElementById('to-add-tasks');
const counterItemsElement = document.getElementById('counter-items-left');
const clearCompletedElement = document.getElementById('clear-completed');
const filtersElement = document.getElementById('filters');

const tasks = [];
//{
//id: Date.now(),
//name: 'Comprar el pan',
//completed: false,
//},

// imprimir tareas

const printTasks = (tasks) => {
  tasks.forEach((task) => {
    const fragment = document.createDocumentFragment();

    const check = document.createElement('img');
    check.classList.add('check');
    check.src = './assets/images/icon-check.svg';

    const circle = document.createElement('div');
    circle.classList.add('circle');

    const taskText = document.createElement('span');
    taskText.textcontent = task.name;

    const taskCreated = document.createElement('div');
    taskCreated.classList.add('task-created');

    const deleteItem = document.createElement('img');
    deleteItem.classList.add('delete-item', 'delete-item-hide');
    deleteItem.src = './assets/images/icon-cross.svg';

    const newTask = document.createElement('div');
    newTask.classList.add(newTask);

    circle.append(check);
    taskCreated.append(circle, taskText);
    newTask.append(taskCreated, deleteItem);
    fragment.append(newTask);
    toAddTasksElement.append(fragment);
  });
};

//Cambiar entre modos

const toDarkMode = (event) => {
  document.body.classList.add('dark');
  deactivateDarkElement.classList.remove('hide');
  activateDarkElement.classList.add('hide');
};

const toNormalMode = (event) => {
  document.body.classList.remove('dark');
  deactivateDarkElement.classList.add('hide');
  activateDarkElement.classList.remove('hide');
};

activateDarkElement.addEventListener('click', toDarkMode);
deactivateDarkElement.addEventListener('click', toNormalMode);
