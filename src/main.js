import TodosView from "./components/TodosView.js";
import { state } from "./model.js";

state.displayingTodos = state.todos;

TodosView.render();