import {Component} from 'react';
import styled from 'styled-components';
import './App.css';
import Todo from './todo';

/*
  1. Addhi ek wrapper bnvu 
  2. Uske andar 2 dabbe
    i-> create task wala button
    ii -> List tasks ki
  Ohk? 
*/

class App extends Component{
  constructor(props){
    super(props);
    // Temporary task for testing
    this.state = {
      todos: [{
        title: "Create todo App",
        desc: "We're creating a todo app... smile in pain",
        deadline: Date.now(),
        done: false
      }],
      modalOpen: false,
      inputs: {
        tname: "",
        desc: "",
        deadline: ""
      }
    }
    this.new_task = this.new_task.bind(this);
    this.check_task = this.check_task.bind(this);
    this.toggle_form = this.toggle_form.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event){
    const key = event.target.name;
    const value = event.target.value;

    this.setState(state=>{
      // Save current state to  varible
      const temp = state;
      // Change key with the changed value
      temp.inputs[key] = value;
      return temp;
    })
  }
  new_task(event){
    event.preventDefault(); // Prevent reloading, form submit
    if(this.state.inputs.tname === "") return;

    this.setState(state=>{
      const new_task = {
        title: state.inputs.tname,
        desc: state.inputs.desc,
        deadline: state.inputs.deadline,
        done: false
      };
      
      const newState = {...state};
      console.log(newState, state);
      newState.todos = [...state.todos, new_task];
      newState.inputs = {
        tname: "",
        desc: "",
        deadline: ""
      }
      // Close the modal after addition
      newState.modalOpen = false;
      return newState;
    })
  }

  check_task(){}

  toggle_form() {
    this.setState(state=>({
      ...state,
      modalOpen: !state.modalOpen
    }))
  }

  render(){
    return <>
    <Box>
      <NewTask>
        <button onClick={this.toggle_form}>New task</button>
      </NewTask>
      <TaskList>
        {this.state.todos.map((todo, idx)=>{
          return <Todo  key = {idx} {...todo} />
        })}
      </TaskList>
    </Box>
    
    <NewTaskMenu open={this.state.modalOpen} onSubmit={this.new_task}>
      <span onClick={this.toggle_form}>❌</span>
      
      <label>Task Name: 
        <input type="text" name="tname" placeholder="Enter task here" 
          value={this.state.inputs.tname} onChange={this.handleInputChange} />
      </label>
      <label>Description: 
        <textarea rows="4" name="desc" placeholder="Describe your task here" 
        value={this.state.inputs.desc} onChange={this.handleInputChange} />
      </label>
      <label>Deadline: 
        <input type="datetime-local" name="deadline" value={this.state.inputs.deadline} 
          onChange={this.handleInputChange} />
      </label>
      <input type="submit" value="Add TODO"/>
    </NewTaskMenu>
    </>
  }
}

const Box = styled.main`
  display: flex;
  padding: 2em;
  flex-flow: column;
  border-radius: 30% 10px 30% 10px;
  
  :hover{
    box-shadow: 0 0 10px 2px #332;
  }
`;
const NewTask = styled.div`
  button{
    background: #fff;
    width: 90px;
    height: 28px;
    color: #000;
    font-weight: 600;
    cursor: pointer;
    border-radius: 8px;
    outline: none;
    transition: all 0.3s ease-in-out;
  }
  button:hover {
    outline: none;
    background: #333;
    color: #fff;
  }
`;
const TaskList = styled.div``;

const NewTaskMenu = styled.form`
  position: absolute;
  transition: 0.5s;
  z-index: 999;
  display: flex;
  flex-flow: column;
  gap: .5em;
  background-color: rgba(0, 0, 0, 1);
  padding: 1em;
  color: #fff;
  border-radius: 4px;
  left: 50%;
  transform: translate(-50%, -50%);
  
  ${(props)=>{
    if(props.open){
      return `top: 50%;`;
    }
    return `
    top: -100vh;
    `;
  }}

  span{
    text-align: right;
    cursor: pointer;
  }
  label{
    display: flex;
    justify-content: space-between;
    gap: .5em;
  }

  input, textarea{outline: none;}

  /* TODO: Style add todo button */
  input[type=submit]{}
`;
export default App;
