import React, { useContext } from 'react'
import '../App.css'
import Layout from '../layout/layout'
import moment from 'moment'
import TodoContext from '../context/context'
const CompletedTask = () => {

  const {completeTask,setCompleteTask}=useContext(TodoContext);
  const groupedCompleteTasks = completeTask
    .sort((a, b) => moment(a.date).diff(moment(b.date))) // Sort by date
    .reduce((acc, task) => {
      const date = moment(task.date).format('YYYY-MM-DD'); // Format the date as 'YYYY-MM-DD'
      if (!acc[date]) acc[date] = [];
      acc[date].push(task); // Group tasks by date
      return acc;
    }, {});

  // Delete task function
  const deleteCompletedTask = (id) => {
    setCompleteTask(completeTask.filter(t => t.id !== id)); // Remove the task from completeTask array
  };



  return (
    <Layout>
    <div id='completetask'>
        <h1>Completed Task</h1>
        <div>
        {Object.keys(groupedCompleteTasks).map((date) => (
          <div key={date}>
            <div id='date'>
              <h2>{date}</h2>
              <p>{moment(date).isSame(moment(), 'day') ? 'Today' :
                moment(date).isSame(moment().subtract(1, 'days'), 'day') ? 'Yesterday' :
                moment(date).isSame(moment().add(1, 'days'), 'day') ? 'Tomorrow' : 'Day'}
              </p>
            </div>

            <ul>
              {groupedCompleteTasks[date].map((task) => (
                <li key={task.id} id='t'>
                  <strong>Task Name: {task.task}</strong>
                  <strong>{task.date.toDateString()}</strong>
                  <strong>Start time: {task.startTime.toLocaleTimeString()}</strong>
                  <strong>End time: {task.endTime.toLocaleTimeString()}</strong>
                  <strong>Duration:{task.duration}</strong>
                  <button onClick={() => deleteCompletedTask(task.id)}>Delete</button> {/* Delete Button */}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    
    </div>
    </Layout>
  )
}

export default CompletedTask