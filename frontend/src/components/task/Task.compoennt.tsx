import axios from 'axios';
import { useState } from 'react';
import { useRef } from 'react';
import { useAuthHeader } from 'react-auth-kit';
import { useMutation, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteTask, markTaskComletede } from '../../apis/apis';
import DeleteConfirmModal from '../delete-modal/DeleteModal';
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
  const queryClient = useQueryClient();

  const [taskDone, setTaskDone] = useState(task.done);

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: auth(),
    },
  };

  const deleteMutation = useMutation(deleteTask, {
    onSuccess: (data: any) => {
      toast('Task Deleted', { type: 'error', theme: 'colored' });
      queryClient.invalidateQueries('tasks');
      queryClient.invalidateQueries('percentage');
    },
  });

  const mutation = useMutation(markTaskComletede, {
    onSuccess: (data: any) => {
      setTaskDone(data.data.done);
      const taskDiv = document.getElementById(task._id);
      if (data.data.done) {
        toast('Task Completed', { type: 'success', theme: 'colored' });
        taskDiv?.classList.replace('bg-uncomplete', 'bg-success');
        taskDiv?.classList.add('text-white');
      } else {
        toast('Task Marked Uncompleted', { type: 'success', theme: 'light' });
        taskDiv?.classList.replace('bg-success', 'bg-uncomplete');
        taskDiv?.classList.remove('text-white');
      }
      queryClient.invalidateQueries('percentage');
    },
    onError: (data: any) => {
      toast('There was a problem', { type: 'error', theme: 'colored' });
    },
  });

  const changeTaskStatusHandler = async (event: any) => {
    mutation.mutate({
      config,
      taskId: task._id,
      done: event.target.checked,
    });
  };

  const deleteTaskHandler = (taskId: any) => {
    deleteMutation.mutate({
      config,
      taskId,
    });
  };

  return (
    <div
      id={task._id}
      className={
        task.done ? 'task card bg-success text-white mb-3' : 'task card  bg-uncomplete mb-3'
      }
      style={{ maxWidth: '18 rem' }}
    >
      <div className="card-header">{task.title}</div>
      <div className="card-body">
        <div className="task-parents ">
          <h4 className="card-title">{task.goal.title}</h4>
          <h5>{task.category.title}</h5>
        </div>
        <div className="task-controls">
          <div className="task-complete">
            <input
              type="checkbox"
              className="checkbox"
              checked={taskDone || false}
              onChange={changeTaskStatusHandler}
            />
          </div>
          <div className="task-actions">
            <Link className="btn btn-primary" to="/">
              View
            </Link>
            <Link className="btn btn-secondary" to="/">
              Edit
            </Link>
            <DeleteConfirmModal deleteHandler={() => deleteTaskHandler(task._id)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
