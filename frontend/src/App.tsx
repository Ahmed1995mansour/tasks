import axios from 'axios';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import AddCategoryModal from './components/add-category-modal/AddCategoryModal.component';
import AddTaskModal from './components/add-task-modal/AddTaskModal.component';
import FilterBar from './components/filter-bar/FilterBar.component';
import Header from './components/navbar/Header.component';
import ProgressBar from './components/progress-bar/ProgressBar.component';
import TaskList from './components/task-list/TaskList.component';
import Home from './routes/Home';

function App() {
  const [tasks, setTasks] = useState([]);
  const [date, setDate] = useState<Date>(new Date(moment().format('L')));
  const [completed, setCompleted] = useState(0);

  const selectDateFilter = (date: Date) => {
    setDate(date);
  };

  const getTasksByDate = async () => {
    const { data } = await axios.get(`http://localhost:5000/api/tasks/${date}`);
    console.log(data);
    if (data) {
      setTasks(data);
    }
    return data;
  };

  const getPercentage = async () => {
    const { data } = await axios.get(`http://localhost:5000/api/tasks/percentage`);
    setCompleted(Math.round(data));
  };

  const onAddingTask = () => {
    getTasksByDate();
    getPercentage();
  };

  useEffect(() => {
    getTasksByDate();
    getPercentage();
  }, [date]);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
      <h2 className="title">Tasks: Road to Full Stack MERN </h2>
      <ProgressBar completed={completed} />
      <FilterBar selectDateFilter={selectDateFilter} />

      <TaskList getTasksByDate={getTasksByDate} tasks={tasks} getPercentage={getPercentage} />
      <AddTaskModal onAddTask={onAddingTask} />
      <AddCategoryModal />
      <ToastContainer />
    </div>
  );
}

export default App;
