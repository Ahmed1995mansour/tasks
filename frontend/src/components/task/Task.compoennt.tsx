import './task.styles.css';

type props = {
  taskText: string;
};
const Task = ({ taskText }: props) => {
  return (
    <div className="task d-flex justify-content-between">
      <h3 className="task-text">{taskText}</h3>
      <input type="checkbox" className="checkbox" />
    </div>
  );
};

export default Task;
