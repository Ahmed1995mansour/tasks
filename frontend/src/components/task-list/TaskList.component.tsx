import Task from '../task/Task.compoennt';
import './task-list.styles.css';

type props = {
  tasks: Array<{}>;
};
const TaskList: React.FC<props> = ({ tasks }) => {
  return (
    <div className="container task-list">
      <ul>
        {tasks && tasks.length > 0 ? (
          tasks.map((task: any) => (
            <li key={task._id}>
              <Task task={task} />
            </li>
          ))
        ) : (
          <p>There are no tasks in this day</p>
        )}
      </ul>
    </div>
  );
};

export default TaskList;
