import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import './task.styles.css';

type props = {
  task: { title: string; done: boolean; _id: string };
  getTasksByDate: Function;
  getPercentage: Function;
};
const Task: React.FC<props> = ({ task, getTasksByDate, getPercentage }) => {
  const [taskDone, setTaskDone] = useState(task.done);

  const changeTaskStatusHandler = async (event: any) => {
    setTaskDone(!taskDone);
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const { data } = await axios.put(`http://localhost:5000/api/tasks/${task._id}`, {
        done: event.target.checked,
      });
      console.log(data);
      if (data) {
        toast('Task Completed', { type: 'success', theme: 'colored' });
      }
    } catch (error) {
      toast('There was a problem', { type: 'error', theme: 'colored' });
    }
    getTasksByDate();
    getPercentage();
  };
  return (
    <div className="task d-flex justify-content-between">
      <h3 className="task-text">{task.title}</h3>
      <input
        type="checkbox"
        className="checkbox"
        checked={taskDone || false}
        onChange={changeTaskStatusHandler}
      />
    </div>
  );
};

export default Task;
