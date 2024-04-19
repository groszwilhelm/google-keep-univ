const todoStorageKey = "todo";

const url = "http://localhost:3000/todos";

fetch(url)
  .then((response) => {
    const body = response.json();
    // body.then((todos) => {
    //   console.log(todos);
    // })

    return body;
  })
  .then((body) => {
    console.log(body);
  });


export function saveToStorage(todo) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(todo),
  })
  .then((response) => response.json())
}

export function deleteFromStorage(listItemId) {
  fetch(`${url}/${listItemId}`, {
    method: 'DELETE'
  })
}

export function updateToStorage(todo) {
  return fetch(`${url}/${todo.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(todo)
  })
}

export function getTodosFromStorage() {
  return fetch(`${url}`)
    .then((response) => {
      const body = response.json();
      // body.then((todos) => {
      //   console.log(todos);
      // })

      return body;
    });
}

const hello = "Paul";

export default hello;
