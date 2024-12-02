const rootStyles = document.documentElement.style;
const activateDarkElement = document.getElementById('to-dark');
const deactivateDarkElement = document.getElementById('no-dark');
const allCardsElement = document.getElementById('all-cards');
const inputElement = document.getElementById('input');
const formElement = document.getElementById('form');
const toAddTasksElement = document.getElementById('to-add-tasks');
const clearCompletedElement = document.getElementById('clear-completed');
const counterItemsElement = document.getElementById('counter-items-left');
const filtersElement = document.getElementById('filters');

let tasks = [];

//Cambiar entre modos

const toDarkMode = () => {
  document.body.classList.add('dark');
  deactivateDarkElement.classList.remove('hide');
  activateDarkElement.classList.add('hide');
};

const toNormalMode = () => {
  document.body.classList.remove('dark');
  deactivateDarkElement.classList.add('hide');
  activateDarkElement.classList.remove('hide');
};

// imprimir tareas

const printTasks = (tasks) => {
  const fragment = document.createDocumentFragment();
  toAddTasksElement.textContent = '';
  tasks.forEach((task) => {
    const circle = document.createElement('div');
    circle.classList.add('circle', 'pointer-none');
    circle.dataset.classToAdd = 'circle';

    const taskText = document.createElement('span');
    taskText.textContent = task.name;
    taskText.classList.add('pointer-none');
    circle.dataset.classToAdd = 'span';

    const taskCreated = document.createElement('div');
    taskCreated.classList.add('task-created');
    taskCreated.dataset.type = 'toComplete';
    taskCreated.dataset.identificator = task.id;

    const deleteItem = document.createElement('img');
    deleteItem.classList.add('delete-item', 'delete-item-hide');
    deleteItem.src = './assets/images/icon-cross.svg';
    deleteItem.dataset.type = 'delete';
    deleteItem.dataset.identificator = task.id;
    deleteItem.addEventListener('click', () => clearTask(event));

    const newTask = document.createElement('div');
    newTask.classList.add('new-task');
    if (task.completed) {
      taskText.classList.add('txt-completed');
      circle.classList.add('circle-completed');
    }
    taskCreated.append(circle, taskText);
    newTask.append(taskCreated, deleteItem);
    fragment.append(newTask);
    toAddTasksElement.append(fragment);
  });
};

//Añadir tarea

const addTask = () => {
  event.preventDefault();
  const textToAdd = event.target.children.input.value;
  const taskToCreate = {
    id: Date.now(),
    name: textToAdd,
    completed: false,
  };
  tasks.push(taskToCreate);
  printTasks(tasks);
  updateCounter(tasks);
  inputElement.value = '';
};

//clicks para marcar/desmarcar completado

const toggleComplete = () => {
  const id = Number(event.target.dataset.identificator);
  const taskFound = tasks.find((task) => task.id === id);
  if (taskFound.completed) {
    taskFound.completed = false;
  } else {
    taskFound.completed = true;
  }
  printTasks(tasks);
};

//contador de completados

const updateCounter = (array) => {
  const totalCounter = array.filter((element) => element.completed === false);
  counterItemsElement.textContent = totalCounter.length;
};

//filtrar activas

const filterActive = () => {
  const activeTasks = tasks.filter((task) => !task.completed);
  printTasks(activeTasks);
};

//filtrar completadas

const filterCompleted = () => {
  completedTasks = tasks.filter((task) => task.completed);
  printTasks(completedTasks);
};

//filtrar todas

const filterAll = () => {
  printTasks(tasks);
};

// cambiar el color del filtro activo

const changeFilterColor = (event) => {
  const filter = event.target.dataset.change;
  if (!filter) return;
  for (const filter of filtersElement.children) {
    filter.classList.remove('active-filter');
  }
  event.target.classList.add('active-filter');
};

//limpiar completos

const clearCompleted = () => {
  tasks = tasks.filter((task) => !task.completed);
  printTasks(tasks);
};

//eliminar tarea

const clearTask = () => {
  const id = Number(event.target.dataset.identificator);
  tasks = tasks.filter((task) => task.id !== id);
  printTasks(tasks);
};

// all click events

const clickInMain = (event) => {
  const type = event.target.dataset.type;
  if (!type) return;
  if (type === 'toComplete') {
    toggleComplete(event);
  }
  if (type === 'active') {
    filterActive(event);
  }
  if (type === 'completed') {
    filterCompleted(event);
  }
  if (type === 'all') {
    filterAll(event);
  }
  if (type === 'clear-completed') {
    clearCompleted(event);
  }
  updateCounter(tasks);
  console.log(tasks);
};

activateDarkElement.addEventListener('click', toDarkMode);
deactivateDarkElement.addEventListener('click', toNormalMode);
formElement.addEventListener('submit', addTask);
filtersElement.addEventListener('click', changeFilterColor);
allCardsElement.addEventListener('click', clickInMain);
