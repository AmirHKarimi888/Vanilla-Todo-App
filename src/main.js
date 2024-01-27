import TodosView from "./components/TodosView.js";
import { state } from "./model.js";

if("todos" in localStorage) {
    localStorage.getItem("todos") === "" ? localStorage.setItem("todos", "[]") : null;
    state.todos = JSON.parse(localStorage.getItem("todos"));
} else {
    localStorage.setItem("todos", "[]");
    state.todos = JSON.parse(localStorage.getItem("todos"));
}


state.displayingTodos = state.todos;

TodosView.render();

export const setFilter = (filter) => {
    state.filter = filter;

    if(filter === "all") {
        state.displayingTodos = state.todos;

    } else if(filter === "active") {
        state.displayingTodos = state.todos.filter(todo => {
            if(!todo?.completed) {
                return todo;
            }
        })

    } else if(filter === "completed") {
        state.displayingTodos = state.todos.filter(todo => {
            if(todo?.completed) {
                return todo;
            }
        })
    }
}

export const setTodoCompletionState = (id, completed) => {
    state.todos.filter(todo => {
        if(todo?.id === +id) {
            todo.completed = completed;
        }
    })

    localStorage.setItem("todos", JSON.stringify(state.todos));
    state.displayingTodos = state.todos;
}

export const clearCompleted = () => {
    state.todos = state.todos.filter(todo => {
        if(!todo?.completed) {
            return todo;
        }
    })

    localStorage.setItem("todos", JSON.stringify(state.todos));
    state.displayingTodos = state.todos;
}

export const addTodo = (title, completed) => {
    let lastTodo = state.todos.sort((a, b) => a - b)[state.todos.length - 1];

    if(state.todos.length === 0) {
        state.todos = [...state.todos, {
            id: 1,
            title: title,
            completed: completed
        }]

    } else {
        state.todos = [...state.todos, {
            id: lastTodo?.id + 1,
            title: title,
            completed: completed
        }]
    }

    localStorage.setItem("todos", JSON.stringify(state.todos));
    state.displayingTodos = state.todos;
}

export const deleteTodo = (id) => {
    state.todos = state.todos.filter(todo => {
        if(todo?.id !== +id) {
            return todo;
        }
    })

    localStorage.setItem("todos", JSON.stringify(state.todos));
    state.displayingTodos = state.todos;
}