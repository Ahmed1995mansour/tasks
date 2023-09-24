import { ConfigProvider, Pagination } from 'antd';
import { useState } from 'react';
import { useAuthHeader } from 'react-auth-kit';
import { useQuery } from 'react-query';
import { components } from 'react-select';
import { getTasks, getTasksCount } from '../../apis/apis';
import AddModal from '../../components/add-modal/AddModal';
import FilterHeader from '../../components/filter-header/FilterHeader.component';
import Message from '../../components/message/Message.component';
import Task from '../../components/task/Task.compoennt';
import Loader from '../loader/Loader';
import './tasks.styles.scss';

const Tasks = () => {
  const authHeader = useAuthHeader();
  const [search, setSearch] = useState('');
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },
  };

  const { data: tasksCountData } = useQuery('tasks-count', () => getTasksCount(config), {
    refetchOnWindowFocus: false,
    onSuccess: (data: any) => {
      setCount(data.data);
    },
  });
  const { data, error, isLoading, isFetching, isError } = useQuery(
    ['tasks', page],
    () => getTasks(config, page - 1, pageSize),
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

      <div className="pagination-wrapper container">
        <div className="pagination-container">
          <ConfigProvider
            theme={{
              components: {
                Pagination: {
                  itemActiveBgDisabled: '#3b71ca',
                  itemSize: 38,
                  fontSize: 16,
                },
              },
            }}
          >
            <Pagination
              onChange={(page, pageSize) => {
                setPage(page);
                setPageSize(pageSize);
              }}
              defaultCurrent={1}
              current={page}
              total={count}
              defaultPageSize={pageSize}
              hideOnSinglePage
            />
          </ConfigProvider>
        </div>
      </div>

      <AddModal />
    </div>
  );
};

export default Tasks;
