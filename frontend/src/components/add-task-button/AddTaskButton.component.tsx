import './add-task-button.styles.scss';

const AddTaskButton = ({ onClickHandler }: any) => {
  return (
    <div className="add-task-button">
      <div id="container-floating" onClick={onClickHandler}>
        <div className="nd1 nds ">
          <div className="btn-container">
            <button className="cta" onClick={onClickHandler}>
              <span className="letter">T</span>
              <span className="button-text">Add Task</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTaskButton;
