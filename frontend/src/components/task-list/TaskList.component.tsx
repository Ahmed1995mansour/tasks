import Task from '../task/Task.compoennt';
import './task-list.styles.css';

type props = {
  tasks: Array<{}>;
  getTasksByDate: Function;
  getPercentage: Function;
};
const TaskList: React.FC<props> = ({ tasks }) => {
  return (
    <div className="container task-list">
      {/* <ul>
        {tasks.map((task: any) => (
          <li key={task._id}>
            <Task task={task} />
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default TaskList;
