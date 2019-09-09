import React, { Component } from 'react';
import firebase from './firebase';
import Header from './Header';
import SubmitForm from './SubmitForm';
import TodoList from './TodoList';
import Footer from './Footer';
import './App.css';
import { declareFunction } from '@babel/types';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';

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
         updatedState.push({ uniqueKey: key, task: data[key].task, isComplete: data[key].isComplete });
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

    if (this.state.userTask === '') {
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        onOpen: () => {
          MySwal.clickConfirm()
        }
      }).then(() => {
        return MySwal.fire(<p>Please enter a valid task!</p>)
      })
    } else {
       const dbRef = firebase.database().ref();
       dbRef.push(newTask);
       this.setState({
         userTask: ''
       })
    }
  }

  toggleCompletion = itemID => {
    this.state.toDoList.map(userTask => {
      if (userTask.uniqueKey === itemID) {
        const toDoRef = firebase.database().ref(`/${userTask.uniqueKey}`);
        toDoRef.once('value', (data) => {
          const targeted = data.val();
          toDoRef.update({
            isComplete: !targeted.isComplete,
          })
        })
      }
    });
  }

  removeTask(taskId) {
    const dbRef = firebase.database().ref();
    dbRef.child(taskId).remove();
  }

  removeCompletedTasks= () => {
    this.state.toDoList.map((individualTask) => {
      if (individualTask.isComplete === true) {
        const dbRef = firebase.database().ref();
        dbRef.child(individualTask.uniqueKey).remove();
      }
    })
  }

  render() {
    return (
      <div className="App">
        <Header />
        {/* <SubmitForm /> */}
        <section className='submitSection wrapper'>
          <form action="submit">
            <label className='addLabel' htmlFor="newItem">Add a task to your list:</label>
            <input type="text" id="newItem" className='newItem' value={this.state.userTask} onChange={this.handleChange}/>
            
            <button className='submitButton' onClick={this.addTask}>Add a Task!</button>
          </form>
        </section>
        {/* <ToDoList /> */}
        <section className='toDoListSection wrapper'>
          <div className="listedItems">
            <h2>Today's Tasks:</h2>
            <ul>
              {this.state.toDoList.map((item) => {
                return (
                <div className='slide-in-left' key={item.uniqueKey}>
                  <li className={item.isComplete ? `completedTask` : `uncompletedTask`}>
                  {item.task}
                  <input className='checkbox' type='checkbox' onClick={() => this.toggleCompletion(item.uniqueKey)}></input>
                  <button className='icon' onClick={() => this.removeTask(item.uniqueKey)}><i className="fas fa-trash-alt"></i></button>
                  </li>
                </div>
                )
              })}
            </ul>
            <button className='submitButton' onClick={this.removeCompletedTasks}>Remove All Completed Tasks!</button>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

export default App;
