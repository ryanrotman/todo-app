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
    
    // Render a new li for each to-do
    for (let i = 0; i < todos.length; i++) {
        let todo = todos[i];

        let li = document.createElement("li");
        li.innerHTML = `
            <span class="todo-item">${todo}</span>
            <td><button name="completeBtn" type="button" class="btn btn-warning" data-value="complete" data-index=${i}>Complete</button>&nbsp<button name="deleteBtn" type="button" class="btn btn-danger" data-value="delete" data-index=${i}>Delete</button></td>
        `

        li.classList.add("todo-list-item");
        todoList.appendChild(li);
    }
}

// Submitting a todo
todoForm.addEventListener("submit", function addTodo(event) {
    event.preventDefault();
    let todoText = todoInput.value;
    console.log(todoText);
    if (todoText !== "") {
        todos.push(todoText);
    }
    todoInput.value = "";
    storeTodo();
    renderTodos();
})

// Store todos in local storage
function storeTodo() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

todoList.addEventListener("click", function handleCompleteOrDelete(event) {
    event.preventDefault();
    console.log(event);
    if (event.target.name == "completeBtn") {
        completeTodo(event);
    } else if (event.target.name == "deleteBtn") {
        deleteTodo(event);
    }
})

function completeTodo(event) {
    let item = event.target.parentElement;
    item.style.textDecoration = "line-through";
}

function deleteTodo(event) {
    let targetIndex = event.target.dataset.index;
    console.log("TARGET INDEX-----", targetIndex);
    todos.splice(targetIndex, 1);
    storeTodo();
    renderTodos();
}