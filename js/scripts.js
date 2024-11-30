const rootStyles = document.documentElement.style;
const activateDarkElement = document.getElementById('to-dark');
const deactivateDarkElement = document.getElementById('no-dark');
const inputElement = document.getElementById('input');
const toAddTasksElement = document.getElementById('to-add-tasks');
const counterItemsElement = document.getElementById('counter-items-left');
const clearCompletedElement = document.getElementById('clear-completed');
const filtersElement = document.getElementById('filters');
const formElement = document.getElementById('form');
const allCardsElement = document.getElementById('all-cards');

let tasks = [];
//{
//id: Date.now(),
//name: 'Comprar el pan',
//completed: false,
//},

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

// imprimir tareas --> hacerlo diferente si el task.completed === true

const printTasks = (tasks) => {
  tasks.forEach((task) => {
    const fragment = document.createDocumentFragment();

    const check = document.createElement('img');
    check.classList.add('check');
    check.src = './assets/images/icon-check.svg';

    const circle = document.createElement('div');
    circle.classList.add('circle', 'pointer-none');
    circle.dataset.classToAdd = 'circle';

    const taskText = document.createElement('span');
    taskText.textContent = task.name;
    taskText.classList.add('pointer-none');
    circle.dataset.classToAdd = 'span';

    const taskCreated = document.createElement('div');
    taskCreated.classList.add('task-created');
    taskCreated.dataset.type = 'markCompleted';
    taskCreated.dataset.identificator = task.id;

    const deleteItem = document.createElement('img');
    deleteItem.classList.add('delete-item', 'delete-item-hide');
    deleteItem.src = './assets/images/icon-cross.svg';
    deleteItem.dataset.type = 'delete';
    deleteItem.dataset.identificator = task.id;

    const newTask = document.createElement('div');
    newTask.classList.add('new-task');

    circle.append(check);
    taskCreated.append(circle, taskText);
    newTask.append(taskCreated, deleteItem);
    fragment.append(newTask);
    toAddTasksElement.append(fragment);
  });
};

//Añadir tarea

const addTask = (event) => {
  event.preventDefault();
  toAddTasksElement.textContent = '';
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
  console.log(tasks);
};

formElement.addEventListener('submit', addTask);

//clicks para marcar completado

const completeTask = (event) => {
  const id = Number(event.target.dataset.identificator);
  const circle = event.target.children[0];
  const text = event.target.children[1];
  tasks.forEach((task) => {
    if (task.id === id) {
      task.completed = true;
      event.target.dataset.type = 'markUncompleted';
      circle.classList.add('circle-completed');
      text.classList.add('txt-completed');
    }
  });
};

// para desmarcar el completado

const uncompleteTask = (event) => {
  const id = Number(event.target.dataset.identificator);
  const circle = event.target.children[0];
  const text = event.target.children[1];
  tasks.forEach((task) => {
    if (task.id === id) {
      task.completed = false;
      event.target.dataset.type = 'markCompleted';
      circle.classList.remove('circle-completed');
      text.classList.remove('txt-completed');
    }
  });
};

//contador de completados

const updateCounter = (array) => {
  const totalCounter = array.filter((element) => element.completed === false);
  counterItemsElement.textContent = totalCounter.length;
};

// para filtrar tareas

//activas

const filterActive = (event) => {
  let activeTasks = [...tasks];
  activeTasks = activeTasks.filter((task) => task.completed === false);
  toAddTasksElement.textContent = '';
  printTasks(activeTasks);
};

//completadas

const filterCompleted = (event) => {
  let completedTasks = [...tasks];
  completedTasks = completedTasks.filter((task) => task.completed === true);
  toAddTasksElement.textContent = '';
  printTasks(completedTasks);
};

//todas

const filterAll = (event) => {
  toAddTasksElement.textContent = '';
  printTasks(tasks);
};

//limpiar completos

const clearCompleted = (event) => {
  tasks = tasks.filter((task) => task.completed === false);
  toAddTasksElement.textContent = '';
  printTasks(tasks);
};

// main click

const clickInMain = (event) => {
  const type = event.target.dataset.type;
  if (!type) return;
  if (type === 'markCompleted') {
    completeTask(event);
  }
  if (type === 'markUncompleted') {
    uncompleteTask(event);
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

allCardsElement.addEventListener('click', clickInMain);
