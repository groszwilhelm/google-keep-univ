// Option 1 -> querySelector all inputs and get value from them when submit is clicked

const formElement = document.querySelector("[data-todo-create]");

formElement.addEventListener("submit", createTodo);

const todoStorageKey = "todo";

function createTodo(event) {
  event.preventDefault();

  const formElement = event.target;

  const { title, description, url, color } = formElement;

  const todo = {
    id: Math.random(),
    title: title.value,
    description: description.value,
    url: url.value,
    color: color.value,
  };

  console.log(todo);
  saveToStorage(todo);
  renderTodos();
}

function saveToStorage(todo) {
  const todoList = getTodosFromStorage();

  todoList.push(todo);
  localStorage.setItem(todoStorageKey, JSON.stringify(todoList));
}

function deleteFromStorage(listItemId) {
  const todos = getTodosFromStorage();
  const updatedTodos = todos.filter((todo) => todo.id !== listItemId);

  localStorage.setItem(todoStorageKey, JSON.stringify(updatedTodos));
}

function getTodosFromStorage() {
  const todoListFromStorage = localStorage.getItem(todoStorageKey);
  const todoList = todoListFromStorage ? JSON.parse(todoListFromStorage) : [];

  return todoList;
}

function renderTodos() {
  const todos = getTodosFromStorage();

  const todoContainer = document.querySelector("[data-todo-list]");
  const todoTemplate = document.querySelector('[data-todo-template]');

  todoContainer.innerHTML = '';

  for (const todo of todos) {
    const todoElementClone = todoTemplate.content.cloneNode(true);
    const todoElement = todoElementClone.querySelector('[data-todo]');
    const titleElement = todoElementClone.querySelector('[data-title]');
    const descriptionElement = todoElementClone.querySelector('[data-description]');
    const imageElement = todoElementClone.querySelector('[data-image]');
    const todoDeleteElement = todoElementClone.querySelector('[data-delete]')

    todoElement.style.backgroundColor = todo.color;
    titleElement.innerText = todo.title;
    descriptionElement.innerText = todo.description;

    if (todo.url) {
      imageElement.src = todo.url;
    } else {
      imageElement.remove();
    }

    todoDeleteElement.addEventListener('click', deleteTodo);

    function deleteTodo() {
      todoElement.parentElement.remove();
      todoDeleteElement.removeEventListener('click', deleteTodo);
      deleteFromStorage(todo.id);
    }

    todoContainer.appendChild(todoElementClone);
  } 
}

renderTodos();

const obj = {
  prop1: "prop1",
  prop2: "prop2",
};

// const prop1 = obj.prop1;
// const prop2 = obj.prop2;
// const { prop1, prop2 } = obj;
