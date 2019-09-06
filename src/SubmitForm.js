import React from 'react';

const SubmitForm = (props) => {
    return(
        <form action="submit">
          <label htmlFor="newItem">Add a task to your list!</label>
          <input type="text" id="newItem" value={this.state.userTask} onChange={this.handleChange}/>
          
          <button onClick={this.handleClick}>Add Book</button>
        </form>
    )
}

export default SubmitForm;