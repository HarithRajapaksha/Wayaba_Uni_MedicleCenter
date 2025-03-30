import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Swal from 'sweetalert2';


function AdminSendStuData() {
  const [studentName, setStudentName] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [faculty, setFaculty] = useState('');
  const [extraInfo, setExtraInfo] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    const token = localStorage.getItem('token'); 
    console.log('Token:', token);

    // Data object to send
    const SendData = {
      studentName: studentName,
      registrationNumber: registrationNumber,
      faculty: faculty,
      extraInfo: extraInfo,
    };

    console.log('SendData:', SendData);

    try {
      const response = await axios.post(`http://localhost:3005/api/users/Nurse`,
        SendData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the Bearer token
            'Content-Type': 'application/json', // Optional: specify the content type
          },
          body: JSON.stringify(SendData),
        }
      );

      console.log("Registration Success", response.data);
      console.log('Student Name:', studentName);
      console.log('Registration Number:', registrationNumber);

       Swal.fire({
        title: "Success!",
        text: "Student Data Added",
        icon: "success",
      }).then(() => {
        // Optional: Clear form or perform other actions
      }); 
    } catch (error) {
      console.error("Students data sending fail", error.response ? error.response.data : error.message);

      Swal.fire({
        title: "Success!",
        text: "Student Data Not Added",
        icon: "error",
      }).then(() => {
        // Optional: Clear form or perform other actions
      }); 
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: '#f8f9fa' }}
    >
      <div className="p-4 border rounded shadow-sm bg-white" style={{ width: '600px' }}>
        <h4 className="text-center mb-4">Student Data Form</h4>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Student Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicRegNo">
            <Form.Label>Student Registration Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Registration Number"
              value={registrationNumber}
              onChange={(e) => setRegistrationNumber(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Student Faculty</Form.Label>
            <Form.Select
              aria-label="Select Student Faculty"
              value={faculty}
              onChange={(e) => setFaculty(e.target.value)}
              required
            >
              <option value="">Select Student Faculty</option>
              <option value="Applied">Applied</option>
              <option value="Technology">Technology</option>
              <option value="BSF">BSF</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicExtraInfo">
            <Form.Label>Extra Information</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Extra information"
              rows={4}
              value={extraInfo}
              onChange={(e) => setExtraInfo(e.target.value)}
              required
            />
          </Form.Group>

          <div className="justify-content-center d-flex">
            <Button variant="primary" type="submit" className="w-50">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default AdminSendStuData;
