import React from 'react'
import { createContext, useState } from 'react';
export const TodoContext = createContext();
export const TodoProvider = ({children}) => {
    const [task,setTask]=useState([{task:"",date:new Date(),startTime: new Date(),endTime:new Date(),duration:"" ,completed:false}])
    const [completeTask,setCompleteTask]=useState([{task:"",date:null,startTime: null,endTime:null,duration:"",completed:false}])
  return (
    <TodoContext.Provider value={{task,setTask,completeTask,setCompleteTask}}>
        {children}
    </TodoContext.Provider>
  )
}

export default TodoContext