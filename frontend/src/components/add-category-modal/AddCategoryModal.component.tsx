import axios from 'axios';
import { useState } from 'react';
import { useAuthHeader } from 'react-auth-kit';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useMutation, useQuery } from 'react-query';
import { useQueryClient } from 'react-query';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { addCategory, getCategories, getGoals } from '../../apis/apis';
import './add-category-modal.styles.css';

function AddCategoryModal() {
  const queryClient = useQueryClient();

  const mutation = useMutation(addCategory, {
    onSuccess: value => {
      toast(`Goal '${value.data.title}' added`, {
        type: 'success',
        theme: 'colored',
      });
      queryClient.invalidateQueries('categories');
    },
    onError: error => {
      toast(`Error: ${error}`, { type: 'error', theme: 'colored' });
    },
  });

  const authHeader = useAuthHeader();

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(),
    },
  };

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
  const [show, setShow] = useState(false);
  const [categoryTitle, setCategoryTitle] = useState('');
  const [goal, setGoal] = useState();
  const [goals, setGoals] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setCategoryTitle('');
  };

  const addCategoryHandler = async () => {
    const category = {
      title: categoryTitle,
      goal: goal,
    };

    mutation.mutate({
      category,
      config,
    });

    handleClose();
  };

  const onSelectChange = (option: any) => {
    setGoal(option.value);
  };

  return (
    <>
      <Button className="add-category-button" variant="primary" onClick={handleShow}>
        Add Category
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                value={categoryTitle}
                onChange={(e: any) => setCategoryTitle(e.target.value)}
                placeholder="Title"
                autoFocus
              />
            </Form.Group>
            <Form.Group>
              <div className="select-goal">
                <Select
                  defaultValue={goal}
                  onChange={onSelectChange}
                  options={goals}
                  placeholder="Select goal"
                />
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addCategoryHandler}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddCategoryModal;
