import { useEffect, useState } from 'react';
import './App.css';
import AddButton from './components/add-button/AddButton.component';
import AddTaskModal from './components/add-task-modal/AddTaskModal.component';
import FilterBar from './components/filter-bar/FilterBar.component';
import ProgressBar from './components/progress-bar/ProgressBar.component';
import TaskList from './components/task-list/TaskList.component';

function App() {
  const [taskCategory, setTaskCategory] = useState('');
  const [date, setDate] = useState('');
  return (
    <div className="App">
      <h2 className="title">Tasks: Road to Full Stack MERN </h2>
      <ProgressBar completed={50} />
      <FilterBar />

      <TaskList />

      <AddTaskModal />
    </div>
  );
}

export default App;
