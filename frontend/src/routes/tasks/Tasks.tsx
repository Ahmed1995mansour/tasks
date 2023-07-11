import { useAuthHeader } from 'react-auth-kit';
import { useQuery } from 'react-query';
import { getCategories, getTasks } from '../../apis/apis';
import AddTaskModal from '../../components/add-task-modal/AddTaskModal.component';
import FilterHeader from '../../components/filter-header/FilterHeader.component';
import Message from '../../components/message/Message.component';
import Task from '../../components/task/Task.compoennt';
import Loader from '../loader/Loader';
import './tasks.styles.scss';

const Tasks = () => {
  const authHeader = useAuthHeader();
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },
  };
  const { data, error, isLoading, isFetching, isError } = useQuery(
    'tasks',
    () => getTasks(config),
    {
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading || isFetching) return <Loader />;

  if (isError) return <Message content={error} />;

  return (
    <div className="tasks-container container pt-5">
      <h2>Tasks</h2>
      <FilterHeader />
      <div className="tasks">
        {data?.data.map((task: any) => (
          <Task key={task._id} task={task} />
        ))}
      </div>
      <AddTaskModal />
    </div>
  );
};

export default Tasks;
