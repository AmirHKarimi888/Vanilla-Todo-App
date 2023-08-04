import { AddTodo } from './components/AddTodo'
import { Todos } from './components/Todos'
import './style.scss'
import './style'


document.querySelector('#app').innerHTML = `
  <div class="App">
    ${ AddTodo() }
    <br/><br/><br/>
    ${ Todos() }
  </div>
`