import axios from 'axios';
import { useState } from 'react';
import { useAuthHeader } from 'react-auth-kit';
import { toast } from 'react-toastify';
import './task.styles.css';

type props = {
  task: {
    title: string;
    done: boolean;
    _id: string;
    category: { title: string };
    goal: { title: string };
  };
};
const Task: React.FC<props> = ({ task }) => {
  const auth = useAuthHeader();
  const [taskDone, setTaskDone] = useState(task.done);

  const changeTaskStatusHandler = async (event: any) => {
    setTaskDone(!taskDone);
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: auth(),
      },
    };
    try {
      const { data } = await axios.put(`http://localhost:5000/api/tasks/${task._id}`, {
        done: event.target.checked,
      });

      if (data.done) {
        toast('Task Completed', { type: 'success', theme: 'colored' });
      } else {
        toast('Task Marked Uncompleted', { type: 'success', theme: 'light' });
      }
    } catch (error) {
      toast('There was a problem', { type: 'error', theme: 'colored' });
    }
  };
  console.log(task);
  return (
    <div className="task d-flex justify-content-between">
      <div className="titles">
        <h5 className="task-goal-title">{task.goal.title}</h5>
        <h5 className="task-category-title">{task.category.title}</h5>
        <h3 className="task-title">{task.title}</h3>
      </div>
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
