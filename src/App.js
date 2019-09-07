import React, { Component } from 'react';
import firebase from './firebase';
import Header from './Header';
import SubmitForm from './SubmitForm';
import TodoList from './TodoList';
import Footer from './Footer';
import './App.css';
import { declareFunction } from '@babel/types';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toDoList: [],
      userTask: ''
    }
  }

  componentDidMount() {
    const dbRef = firebase.database().ref();

    dbRef.on('value', (res) => {
       const updatedState = [];
       const data = res.val();
       for (let key in data) {
         updatedState.push({ uniqueKey: key, task: data[key].task, isComplete: data[key].completed });
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

  addTask = (event) => {
    event.preventDefault();

    let newTask = {
      task: this.state.userTask,
      completed: false,
    }

    const dbRef = firebase.database().ref();
    dbRef.push(newTask);
  }

  toggleCompletion = itemID => {
    this.state.toDoList.map(userTask => {
      if (userTask.uniqueKey === itemID) {
        // on firebase update isComplete item
        // Store in a variable a firebase reference for a specific targeted node (userTask.uniqueKey)
        // Within the firebase .once method 
          // Using firebase .update method to update isComplete property to the opposite of its current value
        const toDoRef = firebase.database().ref(`/${userTask.uniqueKey}`);
        toDoRef.once('value', (data) => {
          const targeted = data.val();
          toDoRef.update({
            isComplete: !targeted.isComplete
          })
        }) 
      }
    });
    this.setState({userTask: ''})
  }

  removeTask(taskId) {

    const dbRef = firebase.database().ref();
    dbRef.child(taskId).remove();
  }

  removeCompletedTasks(taskId) {
    const dbRef = firebase.database().ref(`/${this.userTask}`);
    if(dbRef.isComplete === true) {
      dbRef.child(taskId).remove();
    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        <section className='submitSection wrapper'>
          <form action="submit">
            <label className='addLabel' htmlFor="newItem">Add a task to your list:</label>
            <input type="text" id="newItem" className='newItem' value={this.state.userTask} onChange={this.handleChange}/>
            
            <button onClick={this.addTask}>Add a Task!</button>
          </form>
        </section>
        <section className='toDoListSection wrapper'>
          <div className="listedItems">
            <h2>Today's Tasks:</h2>
            <ul>
              {this.state.toDoList.map((item) => {
                return (
                <div className='slide-in-left' key={item.uniqueKey}>
                  <li className={item.isComplete ? `completedTask` : `uncompletedTask`}>
                  {item.task}
                  <input type='checkbox' onClick={() => this.toggleCompletion(item.uniqueKey)}></input>
                  <button className='icon' onClick={() => this.removeTask(item.uniqueKey)}><i className="fas fa-trash-alt"></i></button>
                  </li>
                </div>
                )
              })}
            </ul>
            <button onClick={() => this.removeCompletedTasks(this.userInput.uniqueKey)}>Remove All Completed Tasks!</button>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

export default App;
