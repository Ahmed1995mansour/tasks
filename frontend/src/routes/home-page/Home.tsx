import moment from 'moment';
import { useState } from 'react';
import { useAuthHeader } from 'react-auth-kit';
import { useQuery } from 'react-query';
import {
  getAllTasksPercentage,
  getAllTasksPercentageByDate,
  getTasksByDate,
} from '../../apis/apis';
import AddModal from '../../components/add-modal/AddModal';
import FilterBar from '../../components/filter-bar/FilterBar.component';
import ProgressBar from '../../components/progress-bar/ProgressBar.component';
import Task from '../../components/task/Task.compoennt';

type props = {};
const Home: React.FC<props> = ({}) => {
  const authHeader = useAuthHeader();

  const [tasks, setTasks] = useState([]);
  const [date, setDate] = useState<Date>(new Date(moment().format('L')));
  const [filter, setFilter] = useState('all');
  const [completed, setCompleted] = useState(0);

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },
  };
  const { data: tasksData } = useQuery(
    ['tasks', date, filter],
    () => getTasksByDate(config, date, filter),
    {
      refetchOnWindowFocus: false,
      onSuccess: data => {
        setTasks(data.data);
      },
    }
  );

  const { data: percentageData } = useQuery(
    ['percentage', date],
    () => getAllTasksPercentageByDate(config, date),
    {
      refetchOnWindowFocus: false,
      onSuccess: data => {
        setCompleted(Math.round(data.data));
      },
    }
  );

  const onSelectOption = (value: string) => {
    setFilter(value);
  };

  const selectDateFilter = (date: Date) => {
    setDate(date);
  };

  return (
    <div className="home container-fluid">
      <h2 className="title">Progress for this day</h2>
      <ProgressBar completed={completed} />

      <FilterBar selectDateFilter={selectDateFilter} onSelectOption={onSelectOption} />
      <div className="tasks container">
        {tasks.length > 0 ? (
          tasks.map((task: any) => <Task key={task._id} task={task} />)
        ) : (
          <p>There are no tasks in this day</p>
        )}
      </div>
      <AddModal />
    </div>
  );
};

export default Home;
