import { state } from "../model.js";

class TodosView {

    constructor() {

    }

    main = document.querySelector("main");

    render() {
        this.generateMarkup();
    }

    eventHandler() {

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
            <input type="checkbox">
            <input type="text" placeholder="Create a new todo...">
          </div>
  
          <ul class="card-body-items">
            ${
                state.displayingTodos.length !== 0 ? state.displayingTodos.map(todo => /*html*/`
                <li class="card-body-item">
                <div class="card-body-item-checking">
                  <span class="card-body-item-checkbox"><input type="checkbox" ${ todo?.completed ? "checked" : null }></span>
                  <span class="card-body-item-title">${ todo?.title }</span>
                </div>
    
                <div class="card-body-item-deleting">
                  <span class="card-body-item-delete-btn"><img src="./src/assets/images/icon-cross.svg" alt="delete" id="deleteTodoBtn${ todo?.id }"></span>
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
            <li class="card-footer-filter-item" style="${ state.filter === "all" ? "color: hsl(220, 98%, 61%);" : '' }"><span>All</span></li>
            <li class="card-footer-filter-item" style="${ state.filter === "active" ? "color: hsl(220, 98%, 61%);" : '' }"><span>Active</span></li>
            <li class="card-footer-filter-item" style="${ state.filter === "completed" ? "color: hsl(220, 98%, 61%);" : '' }"><span>Completed</span></li>
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