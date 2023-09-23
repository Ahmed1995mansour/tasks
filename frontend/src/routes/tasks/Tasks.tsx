import { useState } from 'react';
import { useAuthHeader } from 'react-auth-kit';
import { useQuery } from 'react-query';
import { getTasks } from '../../apis/apis';
import AddModal from '../../components/add-modal/AddModal';
import FilterHeader from '../../components/filter-header/FilterHeader.component';
import Message from '../../components/message/Message.component';
import Task from '../../components/task/Task.compoennt';
import Loader from '../loader/Loader';
import './tasks.styles.scss';

const Tasks = () => {
  const authHeader = useAuthHeader();
  const [search, setSearch] = useState('');
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

  const onSearchHandler = (e: any) => {
    setSearch(e.target.value);
  };

  if (isLoading || isFetching) return <Loader />;

  if (isError) return <Message content={error} />;

  return (
    <div className="tasks-container container pt-5">
      <h2>Tasks</h2>
      <FilterHeader onChangeHandler={onSearchHandler} />
      <div className="tasks">
        {data?.data
          .filter(
            (item: any) =>
              item.title.toLowerCase().includes(search.toLowerCase()) ||
              item.goal.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((task: any) => (
            <Task key={task._id} task={task} />
          ))}
      </div>
      <AddModal />
    </div>
  );
};

export default Tasks;
