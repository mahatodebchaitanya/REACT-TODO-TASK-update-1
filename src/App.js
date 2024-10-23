import logo from './logo.svg';
import './App.css';
import { TodoProvider } from './context/context';
import AddTask from './pages/addTask';
import CompletedTask from './pages/completedTask';
import Tasks from './pages/tasks';
import { BrowserRouter,Routes,Route } from 'react-router-dom';

function App() {
  return (
    <>
    <BrowserRouter>
    <TodoProvider>
     <Routes>
      <Route path='/' element={<Tasks/>}></Route>
      <Route path='/addtask' element={<AddTask/>}></Route>
      <Route path='/completedtask' element={<CompletedTask/>}></Route>
     </Routes>
     </TodoProvider>
     </BrowserRouter>
    </>
  );
}

export default App;
