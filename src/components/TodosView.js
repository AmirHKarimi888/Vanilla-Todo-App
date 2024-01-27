import { addTodo, clearCompleted, deleteTodo, setFilter, setTodoCompletionState } from "../main.js";
import { state } from "../model.js";

class TodosView {

    constructor() {

    }

    main = document.querySelector("main");
    todoInput = "";

    render() {
        this.generateMarkup();
        this.eventHandler();
    }

    eventHandler() {
        const todoInputEl = document.querySelector("#todoInput");
        const todoInitialCheckBtnEl = document.querySelector("#todoInitialCheckBtn");
        const deleteTodoBtnsEl = document.querySelectorAll(".delete-todo-btn");
        const filtersEl = document.querySelectorAll(".card-footer-filter-item");
        const setTodoCompletionBtnEl = document.querySelectorAll(".set-todo-completion-btn");
        const clearCompletedBtn = document.querySelector(".card-footer-clear-compeleted-btn");

        todoInputEl.addEventListener("change", (event) => {
           this.todoInput = event.target.value;
        })

        todoInputEl.addEventListener("keyup", (event) => {
            if(event.key === "Enter") {
                addTodo(this.todoInput, todoInitialCheckBtnEl.checked);
                this.render();
            }
        })


        deleteTodoBtnsEl.forEach(btn => {
            btn.addEventListener("click", () => {
                deleteTodo(btn.id.slice(btn.id.length - 1));
                this.render();
            });
        })

        filtersEl.forEach(filter => {
            filter.addEventListener("click", () => {
                setFilter(filter.id);
                this.render();
            });
        })

        setTodoCompletionBtnEl.forEach(btn => {
            btn.addEventListener("click", () => {
                setTodoCompletionState(btn.id.slice(btn.id.length - 1), btn.checked);
                this.render();
            })
        })

        clearCompletedBtn.addEventListener("click", () => {
            clearCompleted();
            this.render();
        })
    }

    generateMarkup() {

        const markup = /*html*/`
        <div class="card">
        <div class="card-header">
          <span class="card-header-title">Todo</span>
          <span class="card-header-theme-toggle-btn"><img src="./src/assets/images/icon-moon.svg" alt="moon"></span>
        </div>
  
        <div class="card-body">
          <div class="card-body-input">
            <input type="checkbox" id="todoInitialCheckBtn">
            <input type="text" placeholder="Create a new todo..." id="todoInput">
          </div>
  
          <ul class="card-body-items">
            ${
                state.displayingTodos.length !== 0 ? state.displayingTodos.map(todo => /*html*/`
                <li class="card-body-item">
                <div class="card-body-item-checking">
                  <span class="card-body-item-checkbox"><input type="checkbox" class="set-todo-completion-btn" id="setTodoCheckBtn${ todo?.id }" ${ todo?.completed ? "checked" : null }></span>
                  <span class="card-body-item-title" style="${ todo?.completed ? 'text-decoration: line-through; color: hsl(233, 11%, 84%);' : '' }">${ todo?.title }</span>
                </div>
    
                <div class="card-body-item-deleting">
                  <span class="card-body-item-delete-btn"><img src="./src/assets/images/icon-cross.svg" alt="delete" class="delete-todo-btn" id="deleteTodoBtn${ todo?.id }"></span>
                </div>
              </li>`).join("") : /*html*/`
              <p style="padding: 2rem; text-align: center;">Your todo list is empty!</p>
              `
            }
          </ul>
        </div>
  
        <div class="card-footer">
          <div class="card-footer-items-left"><span>${ state.displayingTodos.length } items left</span></div>
          <ul class="card-footer-filter-items">
            <li class="card-footer-filter-item" id="all" style="${ state.filter === "all" ? "color: hsl(220, 98%, 61%);" : '' }"><span>All</span></li>
            <li class="card-footer-filter-item" id="active" style="${ state.filter === "active" ? "color: hsl(220, 98%, 61%);" : '' }"><span>Active</span></li>
            <li class="card-footer-filter-item" id="completed" style="${ state.filter === "completed" ? "color: hsl(220, 98%, 61%);" : '' }"><span>Completed</span></li>
          </ul>
          <div class="card-footer-clear-compeleted-btn"><span>Clear Completed</span></div>
        </div>
        
       </div>
        `

        this.main.innerHTML = "";
        this.main.insertAdjacentHTML("afterbegin", markup);
    }
}

export default new TodosView();