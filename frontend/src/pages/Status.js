import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import { useCookies } from 'react-cookie';

function Status({ show, onHide, currentComplaint }) {
  const [actionDescription, setActionDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const [status, setStatus] = useState('In Progress');


  // Use the cookies hook to get the auth token
  const [cookies] = useCookies(['authToken']);
  const authToken = cookies.authToken;

  const handleActionDescriptionChange = (e) => {
    setActionDescription(e.target.value);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  const handleStatusChange = (value) => {
    setStatus(value);
  };

  const handleSubmit = () => {
    // Create a FormData object to send data to the server
    const formData = new FormData();
    formData.append('actionDescription', actionDescription);
    formData.append('photo', photo);
    formData.append('status', status);
    formData.append("complaintId", currentComplaint)

    // Make a POST request to your server's endpoint with the full URL
    fetch(`http://localhost:4000/actions/actions/`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${authToken}`, // Use backticks for string interpolation
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Status updated:', data);
        // Close the modal after successful submission
        onHide();
      })
      .catch((error) => {
        console.error('Error updating status:', error);
        // Handle the error (e.g., show an error message)
      });
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Update Status</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <label htmlFor="actionDescription" className="form-label">
            Action Description:
          </label>
          <textarea
            className="form-control"
            id="actionDescription"
            value={actionDescription}
            onChange={handleActionDescriptionChange}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="status" className="form-label">
            Status:
          </label>
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="status-dropdown">
              {status}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleStatusChange('In Progress')}>In Progress</Dropdown.Item>
              <Dropdown.Item onClick={() => handleStatusChange('Completed')}>Completed</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="mb-3">
          <label htmlFor="photo" className="form-label">
            Upload File:
          </label>
          <input
            type="file"
            className="form-control"
            id="photo"
            name="photo"
            accept="image/*"
            onChange={handlePhotoChange}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save and Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Status;
