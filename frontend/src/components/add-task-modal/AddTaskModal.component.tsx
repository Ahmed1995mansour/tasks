import axios from 'axios';
import moment from 'moment';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import AddButton from '../add-button/AddButton.component';
import DatePiker from '../date-picker/DatePiker.component';
import './add-task-modal.styles.css';

type props = {
  onAddTask: Function;
};
const AddTaskModal: React.FC<props> = ({ onAddTask }) => {
  const [show, setShow] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({ title: '', _id: '' });
  const [date, setDate] = useState<Date>(new Date(moment().format('L')));
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addTaskHandler = async () => {
    const task = {
      title: taskTitle,
      category: category._id,
      date: date,
    };

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const { data } = await axios.post(`http://localhost:5000/api/tasks`, task, config);

      toast('Task Added', {
        type: 'success',
        theme: 'colored',
      });
    } catch (error) {
      toast(`Error: ${error}`, { type: 'error', theme: 'colored' });
    }
    onAddTask();
    handleClose();
  };

  const onSelectDate = (value: Date) => {
    setDate(value);
  };

  const getCategories = async () => {
    const categoriesData = await axios.get(`http://localhost:5000/api/category`);
    setCategories(categoriesData.data);
  };

  const handleSelectCategory = (event: any) => {
    const selectedCategoryArr = categories.find((cat: any) => cat.title === event.target.value);
    if (selectedCategoryArr) {
      setCategory(selectedCategoryArr);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);
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
                type="text"
                value={taskTitle}
                onChange={(e: any) => setTaskTitle(e.target.value)}
                placeholder="Title"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Select onChange={handleSelectCategory}>
                <option>Choose Category</option>
                {categories.map((cat: any) => (
                  <option key={cat._id}>{cat.title}</option>
                ))}
              </Form.Select>
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
