//Selectors
const todoInput = document.querySelector('.todo_input');
const todoButton = document.querySelector('.todo_button');
const todoList = document.querySelector('.todo_list');

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos())
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
//Functions
function addTodo(event) {
    event.preventDefault();
    if (todoInput.value){
        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");

        const newTodo = document.createElement('li');
        newTodo.innerText = todoInput.value;
        newTodo.classList.add('todo_item');
        todoDiv.appendChild(newTodo);

        saveLocalTodos(todoInput.value);

        const completedButton = document.createElement('button');
        completedButton.innerText = '✔';
        completedButton.classList.add("completed_button");
        todoDiv.appendChild(completedButton);

        const trashButton = document.createElement('button');
        trashButton.innerText = '✖';
        trashButton.classList.add("trash_button");
        todoDiv.appendChild(trashButton);

        todoList.appendChild(todoDiv);

        todoInput.value = "";
    }
}

function deleteCheck(e) {
    const item = e.target;
    if(item.classList[0] == "trash_button") {
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos(todo);
        if(item.classList[0] == "trash_button") {
            const todo = item.parentElement;
            todo.addEventListener('transitionend', function() {
            todo.remove();    
            });
            
        }
    }

    if(item.classList[0] == "completed_button") {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo) {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");

        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo_item');
        todoDiv.appendChild(newTodo);

        const completedButton = document.createElement('button');
        completedButton.innerText = '✔';
        completedButton.classList.add("completed_button");
        todoDiv.appendChild(completedButton);

        const trashButton = document.createElement('button');
        trashButton.innerText = '✖';
        trashButton.classList.add("trash_button");
        todoDiv.appendChild(trashButton);

        todoList.appendChild(todoDiv);
    });
}
function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}