import { useState } from 'react';
import { useAuthHeader, useAuthUser } from 'react-auth-kit';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useQueryClient } from 'react-query';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { addGoal } from '../../apis/apis';
import './add-goal-modal.styles.scss';

function AddGoalModal() {
  const queryClient = useQueryClient();
  const mutation = useMutation(addGoal, {
    onSuccess: value => {
      toast(`Goal '${value.data.title}' added`, {
        type: 'success',
        theme: 'colored',
      });
      queryClient.invalidateQueries('goals');
    },
    onError: error => {
      toast(`Error: ${error}`, { type: 'error', theme: 'colored' });
    },
  });
  const authHeader = useAuthHeader();

  const [show, setShow] = useState(false);
  const [goalTitle, setGoalTitle] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setGoalTitle('');
  };

  const addGoalHandler = async () => {
    const goal = {
      title: goalTitle,
    };
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: authHeader(),
      },
    };

    mutation.mutate({ goal, config });

    handleClose();
  };

  return (
    <>
      <Button className="add-goal-button" variant="primary" onClick={handleShow}>
        Add Goal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Goal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                value={goalTitle}
                onChange={(e: any) => setGoalTitle(e.target.value)}
                placeholder="Title"
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addGoalHandler}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddGoalModal;
