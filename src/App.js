import React, { Component } from 'react';
import firebase from './firebase';
import Header from './Header';
import SubmitForm from './SubmitForm';
import TodoList from './TodoList';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toDoList: [],
      completed: false,
      userTask: ''
    }
  }

  componentDidMount() {
    const dbRef = firebase.database().ref();

    dbRef.on('value', (res) => {
       const updatedState = [];
       const data = res.val();
       for (let key in data) {
         updatedState.push({ uniqueKey: key, task: data[key] });
       }
       this.setState({
         toDoList: updatedState,
       })
    })
  }

  handleChange = (event) => {
    event.preventDefault();
    this.setState({userTask: event.target.value})
  }

  handleClick =(event) => {
    event.preventDefault();

    const dbRef = firebase.database().ref();

    dbRef.push(this.state.userTask);

    this.setState({
      userTask: ''
    })
  }

  removeTask(taskId) {

    const dbRef = firebase.database().ref();

    dbRef.child(taskId).remove();
  }

  render() {
    return (
      <div className="App">
        <Header />
        <form action="submit">
          <label htmlFor="newItem">Add a task to your list!</label>
          <input type="text" id="newItem" value={this.state.userTask} onChange={this.handleChange}/>
          
          <button onClick={this.handleClick}>Add a Task!</button>
        </form>
        {/* <SubmitForm 
        handleClick={this.handleClick}
        value={this.state.userTask} 
        toDoList={this.state.toDoList}
        /> */}
        <ul>
          {this.state.toDoList.map((item) => {
            return (
            <div key={item.key}>
              <li className='uncompleted'>{item.task}</li>
              <button onClick={() => this.removeTask(item.uniqueKey)}> Remove Task</button>
            </div>
            )
          })}
        </ul>
        {/* <TodoList 
        removeTask={this.removeTask}
        toDoList={this.state.toDoList}
        /> */}
      </div>
    );
  }
}

export default App;
