import AddCategoryModal from '../../components/add-category-modal/AddCategoryModal.component';
import AddTaskModal from '../../components/add-task-modal/AddTaskModal.component';
import FilterBar from '../../components/filter-bar/FilterBar.component';
import ProgressBar from '../../components/progress-bar/ProgressBar.component';
import TaskList from '../../components/task-list/TaskList.component';

type props = {
  completed: number;
  selectDateFilter: Function;
  getTasksByDate: Function;
  tasks: Array<any>;
  getPercentage: Function;
  onAddingTask: Function;
};
const Home: React.FC<props> = ({
  completed,
  selectDateFilter,
  getTasksByDate,
  tasks,
  getPercentage,
  onAddingTask,
}) => {
  return (
    <div className="home">
      <h2 className="title">Tasks: Road to Full Stack MERN </h2>
      <ProgressBar completed={completed} />

      <FilterBar selectDateFilter={selectDateFilter} />

      <TaskList getTasksByDate={getTasksByDate} tasks={tasks} getPercentage={getPercentage} />
      <AddTaskModal onAddTask={onAddingTask} />
      <AddCategoryModal />
    </div>
  );
};

export default Home;
