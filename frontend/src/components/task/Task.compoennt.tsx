import { useState } from 'react';
import { useAuthHeader } from 'react-auth-kit';
import { useMutation, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteTask, markTaskComletede } from '../../apis/apis';
import ActionsMenu from '../actions-menu/ActionsMenu';
import EditTaskModal from '../edit-task-modal/EditTaskModal.component';
import './task.styles.css';

type props = {
  task: {
    title: string;
    done: boolean;
    _id: string;
    date: '';
    goal: { title: string; _id: string };
  };
};
const Task: React.FC<props> = ({ task }) => {
  const auth = useAuthHeader();
  const queryClient = useQueryClient();

  const [taskDone, setTaskDone] = useState(task.done);
  const [showEdit, setShowEdit] = useState(false);

  const handleCloseEditTaskModal = () => setShowEdit(false);

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

  const onTaskEdit = () => {
    setShowEdit(true);
  };

  return (
    <div
      id={task._id}
      className={
        task.done ? 'task card bg-success text-white mb-1' : 'task card  bg-uncomplete mb-1'
      }
      style={{ maxWidth: '18 rem' }}
    >
      <div className="card-body">
        <div className="task-info">
          <div className="task-title">
            <input
              type="checkbox"
              className="checkbox"
              checked={taskDone || false}
              onChange={changeTaskStatusHandler}
            />
            <Link to={`/tasks/${task._id}`}>
              <h5>{task.title}</h5>
            </Link>
          </div>
          <div className="goal-title">
            <Link to={`/goals/${task.goal._id}`}>
              <p>{task.goal.title}</p>
            </Link>
          </div>
        </div>
        <div className="task-controls">
          <ActionsMenu
            taskId={task._id}
            onTaskDelete={() => deleteTaskHandler(task._id)}
            onTaskEdit={onTaskEdit}
          />
        </div>
      </div>
      <EditTaskModal
        showTaskModal={showEdit}
        handleCloseTaskModal={handleCloseEditTaskModal}
        task={task}
      />
    </div>
  );
};

export default Task;
