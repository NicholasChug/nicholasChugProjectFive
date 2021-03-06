// HackerYou Project #5 - Nicholas Chug

import React, { Component } from 'react';
import firebase from './firebase';
import Header from './Header';
import Footer from './Footer';
import './App.css';
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

  // On webpage startup, the database objects will be stored into the state created toDoList
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

  // This function is attached to the text input value for the to do item, and targets the textfield that the user will use to write the desired task
  handleChange = (event) => {
    event.preventDefault();
    this.setState({userTask: event.target.value})
  }

  // This function is attached to the click listener of the add item button. Once clicked, the function will create a new task and search for the proper input. Then, the new task will be pushed to the firebase databse and store the object there, while also updating the local toDoList with the newly added object.
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

  // This function is attached to the checkbox accompanying each user created task. Once clicked, the targeted list item will become 'completed' in both the databse storage and the local storage. 
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

  // This function is attached to the garbage bin icon associated with each list item. It will remove the task from the page and from the databse once clicked.
  removeTask(taskId) {
    const dbRef = firebase.database().ref();
    dbRef.child(taskId).remove();
  }

  // This function is attached to the final button on the page, which will remove only the tasks that have been toggled completed by the previous toggleCompletion() function above. 
  removeCompletedTasks= () => {
    this.state.toDoList.map((individualTask) => {
      if (individualTask.isComplete === true) {
        const dbRef = firebase.database().ref();
        dbRef.child(individualTask.uniqueKey).remove();
      }
    })
  }

  // Below are the elements that will be rendered to the webpage upon refresh
  render() {
    return (
      <div className="App">
        <Header />
        <section className='submitSection wrapper'>
          <form action="submit">
            <label className='addLabel' htmlFor="newItem">Add a task to your list:</label>
            <input type="text" id="newItem" className='newItem' value={this.state.userTask} onChange={this.handleChange}/>
            {/* Button associated with the addTask() function */}
            <button className='submitButton' onClick={this.addTask}>Add a Task!</button>
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
                  {/* Checkbox associated with the toggleCompletion() function */}
                  <input className='checkbox' type='checkbox' onClick={() => this.toggleCompletion(item.uniqueKey)}></input>
                  {/* Button associated with the removeTask() function */}
                  <button className='icon' onClick={() => this.removeTask(item.uniqueKey)}><i className="fas fa-trash-alt"></i></button>
                  </li>
                </div>
                )
              })}
            </ul>
            {/* Button associated with the removeCompletedTasks() function */}
            <button className='submitButton' onClick={this.removeCompletedTasks}>Remove All Completed Tasks!</button>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

export default App;
