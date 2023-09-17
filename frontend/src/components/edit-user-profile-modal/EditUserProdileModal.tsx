import { useState } from 'react';
import { useAuthHeader, useAuthUser } from 'react-auth-kit';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useQueryClient } from 'react-query';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { addGoal } from '../../apis/apis';

const EditUserProfileModal: React.FC = () => {
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
  const authUser = useAuthUser();
  const user = authUser();

  const [show, setShow] = useState(false);
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber);
  const [avatar, setAvatar] = useState(user?.avatar);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  const handleAvatarChange = (e: any) => {
    setAvatar(URL.createObjectURL(e.target.files[0]));
  };

  const editProfileHandler = async () => {
    handleClose();
  };

  return (
    <>
      <span onClick={handleShow}>
        <i className="fa-solid fa-pen-to-square fa-lg"></i>
      </span>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <img src={avatar} alt="User Avatar" />
              <input type="file" onChange={handleAvatarChange} />
              <Form.Control
                type="text"
                value={avatar}
                onChange={(e: any) => setAvatar(e.target.value)}
                placeholder="Avatar"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                value={firstName}
                onChange={(e: any) => setFirstName(e.target.value)}
                placeholder="First Name"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                value={lastName}
                onChange={(e: any) => setLastName(e.target.value)}
                placeholder="Last Name"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                value={phoneNumber}
                onChange={(e: any) => setPhoneNumber(e.target.value)}
                placeholder="Phone Number"
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={editProfileHandler}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditUserProfileModal;
