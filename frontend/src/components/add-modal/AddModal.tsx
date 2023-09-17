import { useState } from 'react';
import AddButtonV2 from '../add-button-v2/AddButtonV2';
import AddGoalModal from '../add-goal-modal/AddGoalModal.component';
import AddTaskModal from '../add-task-modal/AddTaskModal.component';

const AddModal = () => {
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const handleShowTaskModal = () => setShowTaskModal(true);
  const handleCloseTaskModal = () => setShowTaskModal(false);

  const handleShowGoalModal = () => setShowGoalModal(true);
  const handleCloseGoalModal = () => setShowGoalModal(false);

  return (
    <>
      <AddButtonV2 onAddTaskHandler={handleShowTaskModal} onAddGoalHandler={handleShowGoalModal} />
      <AddTaskModal showTaskModal={showTaskModal} handleCloseTaskModal={handleCloseTaskModal} />
      <AddGoalModal showGoalModal={showGoalModal} handleCloseGoalModal={handleCloseGoalModal} />
    </>
  );
};

export default AddModal;
