import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import './add-category-modal.styles.css';

function AddCategoryModal() {
  const [show, setShow] = useState(false);
  const [categoryTitle, setCategoryTitle] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setCategoryTitle('');
  };

  const addCategoryHandler = async () => {
    const category = {
      title: categoryTitle,
    };
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const { data } = await axios.post(`http://localhost:5000/api/category`, category, config);
      toast('Category Added', {
        type: 'success',
        theme: 'colored',
      });
    } catch (error) {
      toast(`Error: ${error}`, { type: 'error', theme: 'colored' });
    }

    handleClose();
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
