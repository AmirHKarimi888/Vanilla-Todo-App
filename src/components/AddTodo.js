import { Action, url } from "../api";

export const AddTodo = () => {

    let todos = [];

    let text = "";

    //mounted
    setTimeout(() => {
        Action.get(url + "todos", (response) => todos = response.data)
        .then(() => {
            
        todos = todos.reverse().map((todo) => {
            return `<li class="bg-gray-200 border border-gray-400 hover:bg-gray-100 duration-75 aspect-square rounded-lg grid justify-center items-center" id="Todo">${todo.text}</li>`
        })

        document.querySelector("#Todos").innerHTML = todos.join("");

        const Todo = document.querySelector("li");

        })
    })

    //text input onchange
    setTimeout(() => {
        document.querySelector("#AddTodoInput").addEventListener("change", (event) => {
            text = event.target.value;
            document.querySelector("#ShowTodo").innerHTML = text;
        })
    })

    //addTodo function
    setTimeout(() => {
        document.querySelector("#AddTodoBtn").addEventListener("click", () => {
            Action.post(url + "todos", {
                text: text
            })
            .then(() => {
                todos = [...todos, `<li class="bg-gray-200 border border-gray-400 hover:bg-gray-100 duration-75 aspect-square rounded-lg grid justify-center items-center" id="Todo">${text}</li>`];
                todos = todos.reverse();
                document.querySelector("#Todos").innerHTML = todos.join("");
                document.querySelector("#AddTodoInput").value = "";
                console.log(document.querySelector("#AddTodo").classList);
            })
        })
    })

    return (
        `
        <div>
        <div id="AddTodo">
        <div>
          <input id="AddTodoInput" />
        </div>
        <div>
          <button id="AddTodoBtn">Add Todo</button>
        </div>
        <br/><br/><br/>
        <div id="ShowTodo">
        </div>
      </div>
        </div>
        `
    )
}