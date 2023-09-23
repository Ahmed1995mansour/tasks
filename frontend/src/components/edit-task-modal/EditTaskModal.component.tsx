import moment from 'moment';
import { useState } from 'react';
import { useAuthHeader } from 'react-auth-kit';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { addTask, getGoals, updateTask } from '../../apis/apis';
import DatePiker from '../date-picker/DatePiker.component';
import './edit-task-modal.styles.scss';

type GoalStateT = {
  label: string;
  value: string;
};

type Props = {
  showTaskModal: boolean;
  handleCloseTaskModal: Function;
  task: {
    title: string;
    done: boolean;
    _id: string;
    date: '';
    goal: { title: string; _id: string };
  };
};

const EditTaskModal: React.FC<Props> = ({ showTaskModal, handleCloseTaskModal, task }) => {
  const initialTaskTitle = task.title;
  const initialGoalState = { label: task.goal.title, value: task.goal._id };
  const initialDate = new Date(moment(task.date).format('L'));

  const [taskTitle, setTaskTitle] = useState(initialTaskTitle);
  const [goals, setGoals] = useState();
  const [goal, setGoal] = useState<GoalStateT>(initialGoalState);
  const [date, setDate] = useState<Date>(initialDate);
  const handleClose = () => handleCloseTaskModal();

  const auth = useAuthHeader();
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: auth(),
    },
  };

  const queryClient = useQueryClient();
  const mutation = useMutation(updateTask, {
    onSuccess: value => {
      toast(`Task '${value.data.title}' task updated`, {
        type: 'success',
        theme: 'colored',
      });
      queryClient.invalidateQueries('tasks');
      queryClient.invalidateQueries('percentage');
    },
    onError: error => {
      toast(`Error: ${error}`, { type: 'error', theme: 'colored' });
    },
  });

  const { data: goalsData } = useQuery('goals', () => getGoals(config), {
    refetchOnWindowFocus: false,
    onSuccess: data => {
      const fetchedGoals = data.data.map((goal: any) => ({
        label: `${goal.title}`,
        value: `${goal._id}`,
      }));
      setGoals(fetchedGoals);
    },
  });

  const updateTaskHandler = async (taskId: any) => {
    const updatedTask = {
      _id: taskId,
      title: taskTitle,
      goal: goal?.value,
      date: date,
    };

    mutation.mutate({
      updatedTask,
      config,
    });

    handleClose();
  };

  const onSelectDate = (value: Date) => {
    setDate(value);
  };

  const onSelectGoalChange = (option: any) => {
    setGoal(option);
  };

  return (
    <>
      <Modal show={showTaskModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                className="input-task-title"
                type="text"
                value={taskTitle}
                onChange={(e: any) => setTaskTitle(e.target.value)}
                placeholder="Title"
                autoFocus
              />
            </Form.Group>

            <Form.Group>
              <div className="select-goal" id="select-goal">
                <Select
                  defaultValue={goal}
                  onChange={onSelectGoalChange}
                  options={goals}
                  placeholder="Select a goal"
                />
              </div>
            </Form.Group>

            <Form.Group>
              <Form.Label>Select Date: </Form.Label>
              <DatePiker handleSelectDate={onSelectDate} initialDate={initialDate} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => updateTaskHandler(task._id)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditTaskModal;
