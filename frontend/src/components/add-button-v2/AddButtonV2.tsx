import './add-button-v2.scss';

const AddButtonV2 = ({ onAddTaskHandler, onAddGoalHandler }: any) => {
  return (
    <div>
      <div id="container-floating">
        <div className="nd3 nds">
          <div className="btn-container">
            <button className="cta" onClick={onAddGoalHandler}>
              <span className="letter">G</span>
              <span className="button-text">Add Goal</span>
            </button>
          </div>
        </div>

        <div className="nd1 nds">
          <div className="btn-container">
            <button className="cta" onClick={onAddTaskHandler}>
              <span className="letter">T</span>
              <span className="button-text">Add Task</span>
            </button>
          </div>
        </div>

        <div id="floating-button">
          <p className="plus">+</p>
          <img
            className="edit"
            src="https://ssl.gstatic.com/bt/C3341AA7A1A076756462EE2E5CD71C11/1x/bt_compose2_1x.png"
          />
        </div>
      </div>
    </div>
  );
};

export default AddButtonV2;
