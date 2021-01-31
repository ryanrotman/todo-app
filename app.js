// Selected items from HTML
let todoInput = document.querySelector("#todo-text");
let todoForm = document.querySelector("#todo-form");
let todoList = document.querySelector("#todo-list");
let completeBtn = document.querySelector(".completeBtn");
let deleteBtn = document.querySelector(".deleteBtn");

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
            <td><button type="button" class="btn btn-warning completeBtn" data-value="complete" data-index=${i}>Complete</button>&nbsp<button type="button" class="btn btn-danger deleteBtn" data-value="delete" data-index=${i}>Delete</button></td>
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

// Completing/Deleting a todo
todoList.addEventListener("click", function completeDeleteTodo(event) {
    event.preventDefault();
    console.log("BUTTON CLICK EVENT-----", event);
    let targetIndex = event.target.dataset.index;
    console.log("TARGET INDEX-----", targetIndex);
    let currentTodo = todos[targetIndex];
    console.log("CURRENT TODO-----", currentTodo);
    let buttonClicked = event.target.dataset.value;
    console.log(`${buttonClicked} clicked!`);
    if (buttonClicked == "complete") {
        console.log(`YOU CLICKED THE COMPLETE BUTTON FOR ${currentTodo}`);
    } else if (buttonClicked == "delete") {
        console.log(`YOU CLICKED THE DELETE BUTTON FOR ${currentTodo}`);
        todos.splice(targetIndex, 1);
    }
    storeTodo();
    renderTodos();
})