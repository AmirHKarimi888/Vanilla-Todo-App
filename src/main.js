import { Action, url } from "./api";
import './style.scss'

let todos = [];
let title = "";

Action.get(url + "todos", (response) => {
  todos = response.data;
})

const addTodo = () => {
  let maxId = 0;
  for (let todo of todos) {
    if (parseInt(todo.id) > maxId) {
      maxId = parseInt(todo.id);
    }
  }

  const newTodo = {
    id: maxId + 1,
    title: title,
    done: false
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
        displayTodosItem.className = `p-3 bg-gray-100 font-bold border-4 ${todo.done ? 'border-green-600 text-green-600' : 'border-gray-400'} rounded-lg shadow-lg cursor-pointer grid grid-cols-2 gap-24`;
        displayTodosItem.innerHTML = todo?.title;
        displayTodosItem.id = todo?.id;
        displayTodosItem.addEventListener("click", () => toggleTodoStatus(todo.id));

        const deleteTodoBtn = document.createElement("button");
        const deleteTodoBtnIcon = document.createElement("i");
        deleteTodoBtnIcon.className = "fa fa-trash text-red-500"
        deleteTodoBtn.addEventListener("click", (event) => {
          event.stopPropagation();
          deleteTodo(todo.id)
        });

        deleteTodoBtn.append(deleteTodoBtnIcon);
        displayTodosItem.append(deleteTodoBtn);

        document.querySelector("#todos").append(displayTodosItem);
      })
    })
    .then(() => {
      title = "";
      document.querySelector("#todoInput").value = "";
    })
}


const toggleTodoStatus = (id) => {
  todos.filter((todo) => {
    if (todo.id == id) {
      Action.put(url + "todos/" + id, {
        ...todo,
        done: !todo.done
      })
        .then(() => {
          todo.done = !todo.done;
        })
        .then(() => {
          document.querySelector("#todos").innerHTML = "";
        })
        .then(() => {
          todos.map((todo) => {

            const displayTodosItem = document.createElement("li");
            displayTodosItem.className = `p-3 bg-gray-100 font-bold border-4 ${todo.done ? 'border-green-600 text-green-600' : 'border-gray-400'} rounded-lg shadow-lg cursor-pointer grid grid-cols-2 gap-24`;
            displayTodosItem.innerHTML = todo?.title;
            displayTodosItem.id = todo?.id;
            displayTodosItem.addEventListener("click", () => toggleTodoStatus(todo.id));

            const deleteTodoBtn = document.createElement("button");
            const deleteTodoBtnIcon = document.createElement("i");
            deleteTodoBtnIcon.className = "fa fa-trash text-red-500"
            deleteTodoBtn.addEventListener("click", (event) => {
              event.stopPropagation();
              deleteTodo(todo.id)
            });

            deleteTodoBtn.append(deleteTodoBtnIcon);
            displayTodosItem.append(deleteTodoBtn);

            document.querySelector("#todos").append(displayTodosItem);
          })
        })
    }
  })
}


const deleteTodo = (id) => {
  Action.delete(url + "todos/" + id)
    .then(() => {
      todos = todos.filter((todo) => {
        if (todo.id != id) {
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
        displayTodosItem.className = `p-3 bg-gray-100 font-bold border-4 ${todo.done ? 'border-green-600 text-green-600' : 'border-gray-400'} rounded-lg shadow-lg cursor-pointer grid grid-cols-2 gap-24`;
        displayTodosItem.innerHTML = todo?.title;
        displayTodosItem.id = todo?.id;
        displayTodosItem.addEventListener("click", () => toggleTodoStatus(todo.id));

        const deleteTodoBtn = document.createElement("button");
        const deleteTodoBtnIcon = document.createElement("i");
        deleteTodoBtnIcon.className = "fa fa-trash text-red-500"
        deleteTodoBtn.addEventListener("click", (event) => {
          event.stopPropagation();
          deleteTodo(todo.id)
        });

        deleteTodoBtn.append(deleteTodoBtnIcon);
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
admin.className = "mx-auto mt-20 bg-gray-100 w-[330px] border-2 border-gray-400 rounded-lg p-16 shadow-lg"

const todoInput = document.createElement("input");
todoInput.className = "h-[40px] border border-gray-400 rounded-lg p-2";
todoInput.id = "todoInput";
todoInput.placeholder = "Todo"
todoInput.addEventListener("change", (event) => {
  title = event.target.value;
})
todoInput.addEventListener("keypress", (event) => {
  if (event.key == "Enter") {
    addTodo();
  }
})

const addTodoBtn = document.createElement("button");
addTodoBtn.className = "text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mt-5";
addTodoBtn.innerHTML = "Add Todo";
addTodoBtn.addEventListener("click", addTodo);

const displayTodos = document.createElement("ul");
displayTodos.className = "my-20 mx-auto w-[330px] grid gap-5 grid-cols-1";
displayTodos.id = "todos";


app.append(dashboard);

dashboard.append(admin);
admin.append(todoInput);
admin.append(addTodoBtn);

dashboard.append(displayTodos);

setTimeout(() => {
  todos.map((todo) => {

    const displayTodosItem = document.createElement("li");
    displayTodosItem.className = `p-3 bg-gray-100 font-bold border-4 ${todo.done ? 'border-green-600 text-green-600' : 'border-gray-400'} rounded-lg shadow-lg cursor-pointer grid grid-cols-2 gap-24`;
    displayTodosItem.innerHTML = todo?.title;
    displayTodosItem.id = todo?.id;
    displayTodosItem.addEventListener("click", () => toggleTodoStatus(todo.id));

    const deleteTodoBtn = document.createElement("button");
    const deleteTodoBtnIcon = document.createElement("i");
    deleteTodoBtnIcon.className = "fa fa-trash text-red-500"
    deleteTodoBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      deleteTodo(todo.id)
    });

    deleteTodoBtn.append(deleteTodoBtnIcon);
    displayTodosItem.append(deleteTodoBtn);

    displayTodos.append(displayTodosItem);
  })
}, 1000);

document.querySelector('#app').append(app);