import React from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
const Navbar = () => {
  return (
   
    <div id='nav'>
    <Link to='/'>Tasks</Link>
    <Link to='/addtask'>Add Task</Link>
    <Link to='/completedtask'>Completed Task</Link>
    </div>
   
  )
}

export default Navbar