import React, { useContext, useState } from 'react'
import { TodoContext } from '../context/context'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import Layout from '../layout/layout'
import '../App.css'
const Tasks = () => {


  const [searchTerm, setSearchTerm] = useState(''); 
  const { task, setTask, setCompleteTask } = useContext(TodoContext);
  const navigate = useNavigate();

  

  const groupedTasks = task
    // Sort tasks by date in ascending order
    .sort((a, b) => moment(a.date).diff(moment(b.date)))
    // Reduce tasks into groups based on the date
    .reduce((acc, task) => {
      const date = moment(task.date).format('YYYY-MM-DD');
      // If the date group doesn't exist, create it
      if (!acc[date]) {
        acc[date] = [];
      }
      // Push task into the respective date group
      acc[date].push(task);
      return acc;
    }, {});
   
// Filtering the task start here
const [filteredTasks, setFilteredTasks] = useState(groupedTasks); //filtered tasks are added here
const handleSearch = () => {
  const newFilteredTasks = Object.keys(groupedTasks).reduce((acc, date) => {
    const filteredByTask = groupedTasks[date].filter(task =>
      task.task.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filteredByTask.length > 0) {
      acc[date] = filteredByTask; // Keep tasks if the name matches
    }
    return acc;
  }, {});
  setFilteredTasks(newFilteredTasks);
};

// task filtering end here

// deleting task start here
const deleteTask = (id) => {
  // Filter out the task with the matching ID from the main task array
  const updatedTasks = task.filter(t => t.id !== id);
  
  // Update the main task state
  setTask(updatedTasks);

  // Update the filteredTasks state to reflect the deleted task
  const updatedFilteredTasks = Object.keys(filteredTasks).reduce((acc, date) => {
    const filteredByTask = filteredTasks[date].filter(t => t.id !== id);
    if (filteredByTask.length > 0) {
      acc[date] = filteredByTask;
    }
    return acc;
  }, {});

  setFilteredTasks(updatedFilteredTasks);
};


// deleting task end here
  return (
    <Layout>
      <div id='task'>
        <h1>Tasks</h1>
        <div id='search'>

          <input id="searchbar" type="text" placeholder='Search the tasks here'value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}/>

          <button id="searchbutton"  onClick={handleSearch}>search button</button>
        </div>
        <div className='taskState'>
          <button className='complete' onClick={() => navigate('/completedtask')}>Complete</button>
          <button className='add' onClick={() => navigate('/addtask')}>Add</button>
        </div>
        <div>


           {/* filtered task is here */}
           <div>
            
            {Object.keys(filteredTasks).map((date) => (
              <div key={date}>
                <div id='date'><h2>{date}</h2><p>{moment(date).isSame(moment(),'day')?'Today':
                  moment(date).isSame(moment().subtract(1, 'days'), 'day')?'yesterday':
                  moment(date).isSame(moment().add(1, 'days'), 'day')?'Tomorrow':'Day'}</p></div>
                
                <ul>
                  {filteredTasks[date].map((task) =>{   
                  return(
                    <li key={task.id} id='t'>
                      {moment(date).isSame(moment(),'day')||moment(date).isSame(moment().subtract(1, 'days'), 'day')?<input type="checkbox" />:''}
                      <strong>Task Name: {task.task}</strong>
                      <strong>{task.date.toDateString()}</strong>
                      <strong>Start time : {task.startTime.toLocaleTimeString()}</strong>
                      <strong>End time : {task.endTime.toLocaleTimeString()}</strong>
                      <button onClick={() =>deleteTask(task.id)}>delete</button>
                    </li>
                      )})}
                </ul>
              </div>
            ))}
          </div> 
           {/* filter task end here */}

           
           
        </div>

      </div>
    </Layout>
  )
}

export default Tasks