import Task from '../task/Task.compoennt';
import './task-list.styles.css';

const TaskList = () => {
  return (
    <div className="container task-list">
      <ul>
        <li>
          <Task taskText="This is task 1" />
        </li>
        <li>
          <Task taskText="This is task 2" />
        </li>
        <li>
          <Task taskText="This is task 3" />
        </li>
        <li>
          <Task taskText="This is task 4" />
        </li>
      </ul>
    </div>
  );
};

export default TaskList;
