import './add-button.styles.css';

const AddButton = ({ onClickHandler }: any) => {
  return (
    <>
      <div id="container-floating" onClick={onClickHandler}>
        <div id="floating-button">
          <p className="plus">+</p>
          <img
            className="edit"
            src="https://ssl.gstatic.com/bt/C3341AA7A1A076756462EE2E5CD71C11/1x/bt_compose2_1x.png"
          />
        </div>
      </div>
    </>
  );
};

export default AddButton;
