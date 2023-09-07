import { Action, url } from "./api";
import './style.scss'
import './style'

let todos = [];
let title = "";

Action.get(url + "todos", (response) => {
  todos = response.data;
})

const addTodo = () => {
  let maxId = 0;
  for(let todo of todos) {
    if(parseInt(todo.id) > maxId) {
      maxId = parseInt(todo.id);
    }
  }

  const newTodo = {
    id: maxId + 1,
    title: title
  };

  Action.post(url + "todos", newTodo)
  .then(() => {
    todos.push(newTodo);
  })
  .then(() => {
    document.querySelector("#todos").innerHTML = "";
  })
  .then(() => {
    todos.map((todo) => {

      const displayTodosItem = document.createElement("li");
      displayTodosItem.className = "aspect-square bg-gray-100 border border-gray-400 rounded-lg shadow-lg grid justify-center items-center";
      displayTodosItem.innerHTML = todo?.title;
      displayTodosItem.id = todo?.id;
      const deleteTodoBtn = document.createElement("button");
      deleteTodoBtn.className = "p-3 rounded-lg mt-5 bg-red-600 text-white";
      deleteTodoBtn.innerHTML = "Delete Todo";
      deleteTodoBtn.addEventListener("click", () => deleteTodo(todo.id));
  
      displayTodosItem.append(deleteTodoBtn);
    
      document.querySelector("#todos").append(displayTodosItem);
    })
  })
  .then(() => {
    title = "";
    document.querySelector("#todoInput").value = "";
  })
}

const deleteTodo = (id) => {
  Action.delete(url + "todos/" + id)
  .then(() => {
    todos = todos.filter((todo) => {
      if(todo.id != id) {
        return todo;
      }
    })
  })
  .then(() => {
    document.querySelector("#todos").innerHTML = "";
  })
  .then(() => {
    todos.map((todo) => {

      const displayTodosItem = document.createElement("li");
      displayTodosItem.className = "aspect-square bg-gray-100 border border-gray-400 rounded-lg shadow-lg grid justify-center items-center";
      displayTodosItem.innerHTML = todo?.title;
      displayTodosItem.id = todo?.id;
      const deleteTodoBtn = document.createElement("button");
      deleteTodoBtn.className = "p-3 rounded-lg mt-5 bg-red-600 text-white";
      deleteTodoBtn.innerHTML = "Delete Todo";
      deleteTodoBtn.addEventListener("click", () => deleteTodo(todo.id));
  
      displayTodosItem.append(deleteTodoBtn);
    
      document.querySelector("#todos").append(displayTodosItem);
    })
  })
}

const app = document.createElement("div");
app.id = "main";

const dashboard = document.createElement("div");
dashboard.id = "dashboard";


const admin = document.createElement("div");
admin.id = "admin";
admin.className = "mx-auto mt-20 bg-gray-100 w-[330px] h-[330px] border border-gray-400 rounded-lg p-16 shadow-lg"

const todoInput = document.createElement("input");
todoInput.className = "h-[40px] mt-10 border border-gray-400 rounded-lg";
todoInput.id = "todoInput";
todoInput.addEventListener("change", (event) => {
  title = event.target.value;
})

const addTodoBtn = document.createElement("button");
addTodoBtn.className = "p-3 rounded-lg mt-5 bg-blue-600 text-white";
addTodoBtn.innerHTML = "Add Todo";
addTodoBtn.addEventListener("click", addTodo);

const displayTodos = document.createElement("ul");
displayTodos.className = "mt-20 mx-auto w-[70%] grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
displayTodos.id = "todos";


app.append(dashboard);

dashboard.append(admin);
admin.append(todoInput);
admin.append(addTodoBtn);

dashboard.append(displayTodos);

setTimeout(() => {
  todos.map((todo) => {

    const displayTodosItem = document.createElement("li");
    displayTodosItem.className = "aspect-square bg-gray-100 border border-gray-400 rounded-lg shadow-lg grid justify-center items-center";
    displayTodosItem.innerHTML = todo?.title;
    displayTodosItem.id = todo?.id;
    const deleteTodoBtn = document.createElement("button");
    deleteTodoBtn.className = "p-3 rounded-lg mt-5 bg-red-600 text-white";
    deleteTodoBtn.innerHTML = "Delete Todo";
    deleteTodoBtn.addEventListener("click", () => deleteTodo(todo.id));

    displayTodosItem.append(deleteTodoBtn);

    displayTodos.append(displayTodosItem);
  })
}, 1000);

document.querySelector('#app').append(app);