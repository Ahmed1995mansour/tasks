import { useState } from 'react';
import { useAuthHeader } from 'react-auth-kit';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getGoalById, getGoalTasksPercentage, getTasksByGoal } from '../../apis/apis';
import FilterHeader from '../../components/filter-header/FilterHeader.component';
import ProgressBar from '../../components/progress-bar/ProgressBar.component';
import Task from '../../components/task/Task.compoennt';
import Loader from '../loader/Loader';
import './goal-page.scss';

const initialGoalData = {
  _id: '',
  title: '',
};
const GoalPage = () => {
  const [goalData, setGoalData] = useState(initialGoalData);
  const [completed, setCompleted] = useState(0);
  const [tasks, setTasks] = useState([]);
  const { goalId } = useParams();
  const authHeader = useAuthHeader();

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },
  };
  const {
    data: fetchedGoalData,
    isLoading,
    isFetching,
  } = useQuery(
    ['goal', goalId],
    () => getGoalById(config, goalId),

    {
      refetchOnWindowFocus: false,
      onSuccess: data => {
        setGoalData(data.data);
      },
    }
  );

  const {
    data: tasksData,
    isLoading: isTasksLoading,
    isFetching: isTasksFetching,
  } = useQuery(['tasks', goalId], () => getTasksByGoal(config, goalId), {
    refetchOnWindowFocus: false,
    onSuccess: (data: any) => {
      setTasks(data.data);
    },
  });

  const { data: fetchedPercentageData } = useQuery(
    ['percentage', goalId],
    () => getGoalTasksPercentage(config, goalId),
    {
      refetchOnWindowFocus: false,
      onSuccess: (data: any) => {
        setCompleted(Math.round(data.data));
      },
    }
  );

  if (isLoading || isFetching) {
    return <Loader />;
  }
  return (
    <div className="goal-page">
      <div className="container">
        <div className="goal-info">
          <h2>{goalData.title}</h2>
        </div>

        <div className="progressbar">
          <ProgressBar completed={completed} />
        </div>
        <FilterHeader />
        <div className="tasks container">
          {tasks.length > 0 ? (
            tasks.map((task: any) => <Task key={task._id} task={task} />)
          ) : (
            <p>There are no tasks in this goal</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoalPage;
