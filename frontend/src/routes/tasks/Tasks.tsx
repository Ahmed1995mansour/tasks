import { ConfigProvider, Pagination } from 'antd';
import { useState } from 'react';
import { useAuthHeader } from 'react-auth-kit';
import { useQuery } from 'react-query';
import { getAllTasksPercentage, getTasks, getTasksCount } from '../../apis/apis';
import AddModal from '../../components/add-modal/AddModal';
import FilterHeader from '../../components/filter-header/FilterHeader.component';
import Message from '../../components/message/Message.component';
import ProgressBar from '../../components/progress-bar/ProgressBar.component';
import Task from '../../components/task/Task.compoennt';
import useDebounce from '../../helpers/useDebounce';
import './tasks.styles.scss';

const Tasks = () => {
  const authHeader = useAuthHeader();
  const [search, setSearch] = useState('');
  const [tasks, setTasks] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [completed, setCompleted] = useState(0);
  const debouncedSearch = useDebounce(search, 100);

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },
  };

  const { data: tasksCountData } = useQuery(
    ['tasks-count', debouncedSearch],
    () => getTasksCount(config, debouncedSearch),
    {
      refetchOnWindowFocus: false,
      onSuccess: (data: any) => {
        setCount(data.data);
      },
    }
  );
  const { data, error, isLoading, isFetching, isError } = useQuery(
    ['tasks', debouncedSearch, page],
    () => getTasks(config, debouncedSearch, page - 1, pageSize),
    {
      refetchOnWindowFocus: false,
      onSuccess: (data: any) => {
        setTasks(data.data);
      },
    }
  );

  const { data: tasksPercentageData } = useQuery(
    'percentage',
    () => getAllTasksPercentage(config),
    {
      refetchOnWindowFocus: false,
      onSuccess: (data: any) => {
        setCompleted(Math.round(data.data));
      },
    }
  );

  const onSearchHandler = (e: any) => {
    setSearch(e.target.value);
    setPage(1);
  };

  if (isError) return <Message content={error} />;

  return (
    <div className="tasks-container container pt-5">
      <h2>Tasks</h2>
      <ProgressBar completed={completed} />
      <FilterHeader onChangeHandler={onSearchHandler} />
      <div className="tasks">
        {tasks.map((task: any) => (
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
              showSizeChanger={false}
            />
          </ConfigProvider>
        </div>
      </div>

      <AddModal />
    </div>
  );
};

export default Tasks;
