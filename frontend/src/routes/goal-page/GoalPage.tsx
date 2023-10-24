import { ConfigProvider, Pagination } from 'antd';
import { useState } from 'react';
import { useAuthHeader } from 'react-auth-kit';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import {
  getGoalById,
  getGoalTasksPercentage,
  getTasksByGoal,
  getTasksCountPerGoal,
} from '../../apis/apis';
import AddTaskButton from '../../components/add-task-button/AddTaskButton.component';
import AddTaskModal from '../../components/add-task-modal/AddTaskModal.component';
import FilterHeader from '../../components/filter-header/FilterHeader.component';
import ProgressBar from '../../components/progress-bar/ProgressBar.component';
import Task from '../../components/task/Task.compoennt';
import useDebounce from '../../helpers/useDebounce';
import Loader from '../loader/Loader';
import './goal-page.scss';

const initialGoalData = {
  _id: '',
  title: '',
};
const GoalPage = () => {
  const [goalData, setGoalData] = useState(initialGoalData);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 100);
  const [completed, setCompleted] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const { goalId } = useParams();

  const [showTaskModal, setShowTaskModal] = useState(false);
  const handleShowTaskModal = () => setShowTaskModal(true);
  const handleCloseTaskModal = () => setShowTaskModal(false);

  const authHeader = useAuthHeader();

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },
  };

  const { data: tasksCountData } = useQuery(
    ['tasks-count', goalId, debouncedSearch],
    () => getTasksCountPerGoal(config, debouncedSearch, goalId),
    {
      refetchOnWindowFocus: false,
      onSuccess: (data: any) => {
        setCount(data.data);
      },
    }
  );

  const { data, error, isError } = useQuery(
    ['tasks', goalId, debouncedSearch, page],
    () => getTasksByGoal(config, goalId, debouncedSearch, page - 1, pageSize),
    {
      refetchOnWindowFocus: false,
      onSuccess: (data: any) => {
        setTasks(data.data);
      },
    }
  );

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

  const onSearchHandler = (e: any) => {
    setSearch(e.target.value);
    setPage(1);
  };

  if (isLoading || isFetching) {
    return <Loader />;
  }
  return (
    <div className="goal-page container">
      <div className="goal-info">
        <h2>{goalData.title}</h2>
      </div>

      <div className="progressbar">
        <ProgressBar completed={completed} />
      </div>
      <FilterHeader onChangeHandler={onSearchHandler} />
      <div className="tasks">
        {tasks.length > 0 ? (
          tasks.map((task: any) => <Task key={task._id} task={task} />)
        ) : (
          <p>There are no tasks in this goal</p>
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
      <AddTaskButton onClickHandler={handleShowTaskModal} />
      <AddTaskModal
        goalId={goalData._id}
        goalTitle={goalData.title}
        showTaskModal={showTaskModal}
        handleCloseTaskModal={handleCloseTaskModal}
      />
    </div>
  );
};

export default GoalPage;
