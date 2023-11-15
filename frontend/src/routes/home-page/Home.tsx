import { ConfigProvider, Pagination } from 'antd';
import moment from 'moment';
import { useState } from 'react';
import { useAuthHeader } from 'react-auth-kit';
import { useQuery } from 'react-query';
import { getAllTasksPercentageByDate, getTasksByDate, getTasksCountPerDay } from '../../apis/apis';
import AddModal from '../../components/add-modal/AddModal';
import FilterBar from '../../components/filter-bar/FilterBar.component';
import ProgressBar from '../../components/progress-bar/ProgressBar.component';
import Task from '../../components/task/Task.compoennt';
import useDebounce from '../../helpers/useDebounce';

type props = {};
const Home: React.FC<props> = ({}) => {
  const authHeader = useAuthHeader();

  const [tasks, setTasks] = useState([]);
  const [date, setDate] = useState<Date>(new Date(moment().format('L')));
  const [filter, setFilter] = useState('all');
  const [completed, setCompleted] = useState(0);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [pageSize, setPageSize] = useState(12);
  const debouncedSearch = useDebounce(search, 100);

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },
  };

  const { data: tasksCountData } = useQuery(
    ['tasks-count', date, filter, debouncedSearch],
    () => getTasksCountPerDay(config, date, filter, debouncedSearch),
    {
      refetchOnWindowFocus: false,
      onSuccess: (data: any) => {
        setCount(data.data);
      },
    }
  );

  const { data: tasksData } = useQuery(
    ['tasks', date, filter, debouncedSearch, page],
    () => getTasksByDate(config, date, filter, debouncedSearch, page - 1, pageSize),
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

  const onSearchHandler = (e: any) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <div className="home container">
      <h2 className="title">Progress for this day</h2>
      <ProgressBar completed={completed} />

      <FilterBar
        selectDateFilter={selectDateFilter}
        onSelectOption={onSelectOption}
        onChangeHandler={onSearchHandler}
      />
      <div className="tasks container">
        {tasks.length > 0 ? (
          tasks.map((task: any) => <Task key={task._id} task={task} />)
        ) : (
          <p>There are no tasks in this day</p>
        )}
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

export default Home;
