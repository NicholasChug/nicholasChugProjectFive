import React from 'react';

const SubmitForm = (props) => {
    return(
        <section className='submitSection wrapper'>
          <form action="submit">
            <label className='addLabel' htmlFor="newItem">Add a task to your list:</label>
            <input type="text" id="newItem" className='newItem' value={this.state.userTask} onChange={this.handleChange}/>
            
            <button className='submitButton' onClick={this.addTask}>Add a Task!</button>
          </form>
        </section>
    )
}

export default SubmitForm;