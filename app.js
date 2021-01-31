// Selected items from HTML
let todoInput = document.querySelector("#todo-text");
let todoForm = document.querySelector("#todo-form");
let todoList = document.querySelector("#todo-list");
let completeBtn = document.querySelectorAll(".completeBtn");
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

        let li = document.createElement("li");
        li.innerHTML = `
            <span class="todo-item">${todo}</span>
            <td><button name="completeBtn" type="button" class="btn btn-warning" data-value="complete" data-index=${i}>Complete</button>&nbsp<button name="deleteBtn" type="button" class="btn btn-danger" data-value="delete" data-index=${i}>Delete</button></td>
        `

        // let completeBtn = document.createElement("button");
        // completeBtn.textContent = "Complete";

        // let deleteBtn = document.createElement("button");
        // deleteBtn.textContent = "Delete";

        // tr.appendChild(completeBtn);
        // tr.appendChild(deleteBtn);
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

// Completing/Deleting a todo
// todoList.addEventListener("click", function completeDeleteTodo(event) {
//     event.preventDefault();
//     console.log("BUTTON CLICK EVENT-----", event);
//     let targetIndex = event.target.dataset.index;
//     console.log("TARGET INDEX-----", targetIndex);
//     let currentTodo = todos[targetIndex];
//     console.log("CURRENT TODO-----", currentTodo);
//     let buttonClicked = event.target.dataset.value;
//     console.log(`${buttonClicked} clicked!`);
//     if (buttonClicked == "complete") {
//         console.log(`YOU CLICKED THE COMPLETE BUTTON FOR ${currentTodo}`);
//         let element = event.target.parentElement.parentElement.children[0];
//         console.log("TARGETED ELEMENT-----", element);
//         // element.setAttribute("style", "text-decoration: line-through;");
//         element.style.textDecoration = "line-through";
//     } else if (buttonClicked == "delete") {
//         console.log(`YOU CLICKED THE DELETE BUTTON FOR ${currentTodo}`);
//         todos.splice(targetIndex, 1);
//     }
//     storeTodo();
//     renderTodos();
// })

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
    renderTodos();
}