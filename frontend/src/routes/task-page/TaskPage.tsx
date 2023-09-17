import moment from 'moment';
import { useState } from 'react';
import { useAuthHeader } from 'react-auth-kit';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getTaskById, markTaskComletede } from '../../apis/apis';
import ActionsMenu from '../../components/actions-menu/ActionsMenu';
import Loader from '../loader/Loader';
import './task-page.styles.scss';

type GoalT = {
  _id: string;
  title: string;
};

type TaskT = {
  _id: string;
  title: string;
  date: '';
  goal: GoalT;
};

const initialTaskData: TaskT = {
  _id: '',
  title: '',
  date: '',
  goal: {
    _id: '',
    title: '',
  },
};

const TaskPage = () => {
  const [taskDate, setTaskDate] = useState(null);
  const [taskDone, setTaskDone] = useState(false);
  const [taskData, setTaskData] = useState<TaskT>(initialTaskData);

  const queryClient = useQueryClient();

  const mutation = useMutation(markTaskComletede, {
    onSuccess: (data: any) => {
      setTaskDone(data.data.done);
      if (data.data.done) {
        toast('Task Completed', { type: 'success', theme: 'colored' });
      } else {
        toast('Task Marked Uncompleted', { type: 'success', theme: 'light' });
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
      taskId: taskData._id,
      done: event.target.checked,
    });
  };
  const { taskId } = useParams();
  const authHeader = useAuthHeader();
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },
  };

  const {
    data: fetchedTaskData,
    isLoading,
    isFetching,
  } = useQuery(['task', taskId], () => getTaskById(config, taskId), {
    refetchOnWindowFocus: false,
    onSuccess: (data: any) => {
      setTaskData(data.data);
      const date: any = moment(data.data.date).format('ll');
      setTaskDate(date);
      setTaskDone(data.data.done);
    },
  });

  if (isLoading || isFetching) {
    return <Loader />;
  }

  return (
    <div className="task-page container">
      <div className="card mb-3" style={{ maxWidth: '900px' }}>
        <div className="row g-0">
          <div className="col-md-3">
            <img
              src="https://mdbcdn.b-cdn.net/wp-content/uploads/2020/06/vertical.webp"
              alt="Trendy Pants and Shoes"
              className="img-fluid rounded-start"
            />
          </div>
          <div className="col-md-9">
            <div className="card-body">
              <div className="task-info">
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={taskDone || false}
                  onChange={changeTaskStatusHandler}
                />
                <h3 className="card-title">{taskData.title}</h3>
                <ActionsMenu taskId={taskData._id} onTaskDelete={() => {}} />
              </div>
              <Link to={`/goals/${taskData.goal._id}`}>
                <p className="task-goal">{taskData.goal.title}</p>
              </Link>
              <div className="task-body">
                <div className="task-desc-container">
                  <p className="task-desc">
                    This is a wider card with supporting text below as a natural lead-in to
                    additional content. This content is a little bit longer.
                  </p>
                </div>
                <div className="subtasks-container">
                  <ul className="subtasks-list">
                    <li>Sub task 1</li>
                    <li>Sub task 2</li>
                    <li>Sub task 3</li>
                  </ul>
                </div>
              </div>
              <div className="card-text">
                <small className="text-muted">{taskDate}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskPage;
