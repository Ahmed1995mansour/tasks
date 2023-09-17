import moment from 'moment';
import { useState } from 'react';
import { useAuthHeader } from 'react-auth-kit';
import { useQuery } from 'react-query';
import { getAllTasksPercentage, getTasksByDate } from '../../apis/apis';
import AddGoalModal from '../../components/add-goal-modal/AddGoalModal.component';
import AddModal from '../../components/add-modal/AddModal';
import AddTaskModal from '../../components/add-task-modal/AddTaskModal.component';
import FilterBar from '../../components/filter-bar/FilterBar.component';
import ProgressBar from '../../components/progress-bar/ProgressBar.component';
import Task from '../../components/task/Task.compoennt';

type props = {};
const Home: React.FC<props> = ({}) => {
  const authHeader = useAuthHeader();

  const [tasks, setTasks] = useState([]);
  const [date, setDate] = useState<Date>(new Date(moment().format('L')));
  const [completed, setCompleted] = useState(0);

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },
  };
  const { data: tasksData } = useQuery(['tasks', date], () => getTasksByDate(config, date), {
    refetchOnWindowFocus: false,
    onSuccess: data => {
      setTasks(data.data);
    },
  });

  const { data: percentageData } = useQuery(['percentage'], () => getAllTasksPercentage(config), {
    refetchOnWindowFocus: false,
    onSuccess: data => {
      setCompleted(Math.round(data.data));
    },
  });

  const selectDateFilter = (date: Date) => {
    setDate(date);
  };

  return (
    <div className="home container-fluid">
      <h2 className="title">Tasks: All tasks progress </h2>
      <ProgressBar completed={completed} />

      <FilterBar selectDateFilter={selectDateFilter} />
      <div className="tasks container">
        {tasks.length > 0 ? (
          tasks.map((task: any) => <Task key={task._id} task={task} />)
        ) : (
          <p>There are no tasks in this day</p>
        )}
      </div>
      <AddModal />

      {/* <AddGoalModal /> */}
    </div>
  );
};

export default Home;
