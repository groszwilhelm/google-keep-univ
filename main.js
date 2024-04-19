// Option 1 -> querySelector all inputs and get value from them when submit is clicked
// import { default as defaultExport } from './storage-functions.js';
import {
  deleteFromStorage,
  getTodosFromStorage,
  saveToStorage,
  updateToStorage,
} from "./storage-functions.js";
// import * as everything from "./storage-functions.js";

const formElement = document.querySelector("[data-todo-create]");

formElement.addEventListener("submit", createTodo);

function createTodo(event) {
  event.preventDefault();

  const formElement = event.target;

  const { title, description, url, color } = formElement;

  const todo = {
    title: title.value,
    description: description.value,
    url: url.value,
    color: color.value,
  };

  console.log(todo);
  saveToStorage(todo)
    .then(() => console.log("Todo saved"))
    .catch(() => console.error("Server error, please try again later"));
  renderTodos();
}

function updateTodo(event, todo) {
  event.preventDefault();

  const formElement = event.target;

  const { title, description, url, color } = formElement;

  const updatedTodo = {
    // id: id.value,
    ...todo,
    id: todo.id,
    title: title.value,
    description: description.value,
    url: url.value,
    color: color.value,
  };

  updateToStorage(updatedTodo)
    .then(() => {
      console.log("Todo saved");
      renderTodos();
    })
    .catch(() => console.error("Server error, please try again later"));
}

function renderTodos() {
  getTodosFromStorage().then((todos) => {
    const todoContainer = document.querySelector("[data-todo-list]");
    const todoTemplate = document.querySelector("[data-todo-template]");

    todoContainer.innerHTML = "";

    for (const todo of todos) {
      renderTodo(todoTemplate, todo, todoContainer);
    }
  });
}

renderTodos();

const obj = {
  prop1: "prop1",
  prop2: "prop2",
};

function renderTodo(todoTemplate, todo, todoContainer) {
  const todoElementClone = todoTemplate.content.cloneNode(true);
  const todoElement = todoElementClone.querySelector("[data-todo]");
  const titleElement = todoElementClone.querySelector("[data-title]");
  const descriptionElement =
    todoElementClone.querySelector("[data-description]");
  const imageElement = todoElementClone.querySelector("[data-image]");
  const todoDeleteElement = todoElementClone.querySelector("[data-delete]");
  const todoEditElement = todoElementClone.querySelector("[data-edit]");

  todoElement.style.backgroundColor = todo.color;
  titleElement.innerText = todo.title;
  descriptionElement.innerText = todo.description;

  if (todo.url) {
    imageElement.src = todo.url;
  } else {
    imageElement.remove();
  }

  todoDeleteElement.addEventListener("click", deleteTodo);
  todoEditElement.addEventListener("click", (event) => editTodo(event, todo));

  function deleteTodo() {
    todoElement.parentElement.remove();
    todoDeleteElement.removeEventListener("click", deleteTodo);
    deleteFromStorage(todo.id);
  }

  function editTodo(event, todo) {
    const dialog = document.querySelector("[data-dialog-edit]");
    const closeDialog = document.querySelector("[data-close-dialog]");
    const editForm = document.querySelector("[data-todo-edit]");
    editForm.addEventListener("submit", (event) => updateTodo(event, todo));

    const {
      id: idElement,
      title: titleElement,
      description: descriptionElement,
      url: urlElement,
      color: colorElement,
    } = editForm;

    // idElement.value = todo.id;
    titleElement.value = todo.title;
    descriptionElement.value = todo.description;
    urlElement.value = todo.url;
    colorElement.value = todo.color;

    dialog.showModal();

    closeDialog.addEventListener(
      "click",
      (event) => {
        event.preventDefault();
        editForm.removeEventListener("submit", updateTodo);
        dialog.close();
      },
      { once: true }
    );
  }

  todoContainer.appendChild(todoElementClone);
}
// const prop1 = obj.prop1;
// const prop2 = obj.prop2;
// const { prop1, prop2 } = obj;

/**
 * RESTful API's -> Representational State Transfer
 * GET /todos -> Obtains a list of resources
 * GET /todos/:id -> Obtains a single resource
 * POST /todos -> Create a new todo
 * PUT / PATCH /todos/:id
 * DELETE /todos -> Remove all resources
 * DELETE /todos/:id -> Remove a single resource
 *
 * Response status codes]
 * 1** -> General information
 * 2** -> Status okay
 * 3** -> Redirect
 * 4** -> Client errors
 * 5** -> Server errors
 *
 * 404 Not Found
 * 200 Okay
 * 201 Created
 * 204 Deleted (No content)
 * 500 Internal server
 *
 */
