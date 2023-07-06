import moment from 'moment';
import { useState } from 'react';
import { useAuthHeader } from 'react-auth-kit';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { addTask, getCategoriesByGoal, getGoals } from '../../apis/apis';
import AddButton from '../add-button/AddButton.component';
import DatePiker from '../date-picker/DatePiker.component';
import './add-task-modal.styles.css';

type GoalStateT = {
  label: string;
  value: string;
};

type CategoryStateT = {
  label: string;
  value: string;
};

type props = {
  onAddTask: Function;
};
const AddTaskModal: React.FC<props> = ({ onAddTask }) => {
  const [show, setShow] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [categories, setCategories] = useState<CategoryStateT[]>();
  const [category, setCategory] = useState<CategoryStateT | null>();
  const [goals, setGoals] = useState();
  const [goal, setGoal] = useState<GoalStateT>();
  const [date, setDate] = useState<Date>(new Date(moment().format('L')));
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const auth = useAuthHeader();
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: auth(),
    },
  };

  const queryClient = useQueryClient();
  const mutation = useMutation(addTask, {
    onSuccess: value => {
      toast(`Task '${value.data.title}' added`, {
        type: 'success',
        theme: 'colored',
      });
      queryClient.invalidateQueries('tasks');
      queryClient.invalidateQueries(['tasks', category?.value]);
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

  const { data: categoriesData } = useQuery(
    ['categories', goal?.value],
    () => getCategoriesByGoal(goal?.value, config),
    {
      enabled: !!goal,
      onSuccess: data => {
        const fetchedCategories = data.data.map((category: any) => ({
          label: `${category.title}`,
          value: `${category._id}`,
        }));
        setCategories(fetchedCategories);
      },
    }
  );
  const addTaskHandler = async () => {
    const task = {
      title: taskTitle,
      goal: goal?.value,
      category: category?.value,
      date: date,
    };

    mutation.mutate({
      task,
      config,
    });

    handleClose();
  };

  const onSelectDate = (value: Date) => {
    setDate(value);
  };

  const onSelectGoalChange = (option: any) => {
    setCategory(null);
    setGoal(option);
  };

  const onSelectCategoryChange = (option: any) => {
    setCategory(option);
  };

  return (
    <>
      <AddButton onClickHandler={handleShow} />

      <Modal show={show} onHide={handleClose}>
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
              <div className="select-category" id="select-category">
                <Select
                  value={category}
                  onChange={onSelectCategoryChange}
                  options={categories || []}
                  isDisabled={!goal}
                  placeholder="Select a category"
                />
              </div>
            </Form.Group>

            <Form.Group>
              <Form.Label>Select Date: </Form.Label>
              <DatePiker handleSelectDate={onSelectDate} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addTaskHandler}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddTaskModal;
