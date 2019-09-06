import React from 'react';

const TodoList = (props) => {
    return(
        <ul>
          {props.toDoList.map((item) => {
            return (
            <div key={item.key}>
              <li>{item.task}</li>
              <button onClick={() => props.removeTask()}> Remove Task</button>
            </div>
            )
          })}
        </ul>
    )
}

export default TodoList;