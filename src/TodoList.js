import React from 'react';

const TodoList = (props) => {
    return(
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
    )
}

export default TodoList;