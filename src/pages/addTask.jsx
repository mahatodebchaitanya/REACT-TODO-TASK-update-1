import React from 'react'
import DatePicker from 'react-datepicker';
import { TodoContext } from '../context/context';
import { useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import 'react-datepicker/dist/react-datepicker.css';
import Layout from '../layout/layout';
import '../App.css'
const AddTask = () => {
    const [formData, setFormData] = useState({ task: "", date: null, startTime: null, endTime: null, duration: "" });
    const {setTask}=useContext(TodoContext)
    const navigate=useNavigate();
    const difInMs=Math.abs(formData.endTime - formData.startTime);
    const difInMin=Math.floor(difInMs/(1000*60));
    const difInHr=Math.floor(difInMin/60);
    const remInMin=((difInMin) % 60);
    
    

    // console.log(difInHr,remInMin);

    const handleTaskChange = (e) => {
        setFormData({
            ...formData,
            task: e.target.value,
        })
    }
    const handleDateChange = (date) => {
        setFormData({
            ...formData,
            date: date,
        });
    };
    const handleStartTimeChange = (time) => {
        setFormData({
            ...formData,
            startTime: time,
        });
    };
    const handleEndTimeChange = (time) => {
        setFormData({
            ...formData,
            endTime: time,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        const newTask={
            ...formData,
            id: uuidv4(),
            duration:`${difInHr} hr ${remInMin} mins`
        }
        setTask((pre)=>[...pre,newTask]);

        setFormData({
            task: '',
            date: null,
            startTime: null,
            endTime: null,
            duration: '',
          });
          navigate('/');
        
    }
    return (
        <>
         {/* task start here */}
          
         {/* task end here */}
        <Layout>
        <div id='addtask'>

            <h1>Add Task</h1>
            <form action="" id='form' onSubmit={(e)=>handleSubmit(e)}>
                <div className='labelcontainer'><label htmlFor="">Task Name:</label>
                    <input
                        type="text"
                        value={formData.task}
                        onChange={handleTaskChange}
                        placeholder="Enter Task"
                    />
                </div>
                <div className='labelcontainer'>
                    <label htmlFor="">Date:</label>
                    <DatePicker
                        selected={formData.date}
                        onChange={handleDateChange}
                        dateFormat="MM/dd/yyyy"
                        placeholderText="Select Date"
                    />
                </div>
                <div className='labelcontainer'>
                    <label htmlFor="">Start Time:</label>
                    <DatePicker
                        selected={formData.startTime}
                        onChange={handleStartTimeChange}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                        placeholderText="Select Start Time"
                    />
                </div>
                <div className='labelcontainer'>
                    <label htmlFor="">End Time:</label>
                    <DatePicker
                        selected={formData.endTime}
                        onChange={handleEndTimeChange}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                        placeholderText="Select End Time"
                    />
                </div>
                <div className='labelcontainer'>
                    <label htmlFor="">Duration:</label>
                    <input type="text" value={`${difInHr} hr ${remInMin} mins`}  readOnly/>
                </div>
                <button id='addbutton' type='submit' >Add</button>
            </form>
            
        </div>
        </Layout>
        </>
    )
}

export default AddTask