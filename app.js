// Selected items from HTML
let todoInput = document.querySelector("#todo-text");
let todoForm = document.querySelector("#todo-form");
let todoList = document.querySelector("#todo-list");

// Empty array to hold todos
let todos = [];

// App init
init();

// // Get stored todos from localstorage
function init() {
    let storedTodos = JSON.parse(localStorage.getItem("todos"));

    if (storedTodos !== null) {
        todos = storedTodos;
    }

    renderTodos();
}

renderTodos();

function renderTodos() {
    todoList.innerHTML = "";
    
    // Render a new tr for each to-do
    for (let i = 0; i < todos.length; i++) {
        let todo = todos[i];

        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${todo}</td>
            <td><button type="button" class="btn btn-warning">Complete</button>&nbsp<button type="button" class="btn btn-danger">Delete</button></td>
        `

        // let completeBtn = document.createElement("button");
        // completeBtn.textContent = "Complete";

        // let deleteBtn = document.createElement("button");
        // deleteBtn.textContent = "Delete";

        // tr.appendChild(completeBtn);
        // tr.appendChild(deleteBtn);
        todoList.appendChild(tr);
    }
}