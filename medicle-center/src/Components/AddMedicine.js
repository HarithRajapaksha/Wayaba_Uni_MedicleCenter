import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

function AddMedicine() {
  
  const{id} = useParams();
  
  const [regNO, setRegNO] = useState('');
  const [studentName, setStudentName] = useState('');
  const [medicines, setMedicines] = useState('');
  const [studentId, setStudentId] = useState('');


   const token = localStorage.getItem('token');
   


  useEffect(() => {

     const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3005/api/users/pharmacist/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        setRegNO(response.data.FindUser.registrationNumber)
        setStudentName(response.data.FindUser.studentName)
        setStudentId(response.data.FindUser._id)
        console.log('API Response:', response.data.FindUser.registrationNumber);
        console.log('API Response:', response.data.FindUser.studentName);
        console.log('API Response:', response.data.FindUser._id);
  
      } catch (error) {
        console.error('Add Medicine Error:', error.response ? error.response.data : error.message);
      }
     }

      fetchData();
  }, [id]);


  const handleSubmit = async(e) => {
    e.preventDefault();

      const sendData={
        regNO,
        studentName,
        medicines
      }
    
      try {
        const response = await axios.post(`http://localhost:3005/api/users/pharmacist1`, sendData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

         Swal.fire({
                title: "Success!",
                text: "Medicine Data Added",
                icon: "success",
              }).then(() => {
                // Optional: Clear form or perform other actions
              }); 
      console.log('API Response:', response.data);
      } catch (error) {
         Swal.fire({
                title: "Error!",
                text: "Data added error",
                icon: "error",
              }).then(() => {
                // Optional: Clear form or perform other actions
              }); 
        console.error('Add Medicine Error:', error.response ? error.response.data : error.message);
      }
  };

 
  return (
    <div
    className="d-flex justify-content-center align-items-center vh-100"
    style={{ backgroundColor: "#f8f9fa" }}
  >
    <div
      className="p-4 border rounded shadow-sm bg-white"
      style={{ width: "600px" }}
    >
      <h4 className="text-center mb-4">Student Medical Form</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicStudentName">
          <Form.Label>Student Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Student Name"
            defaultValue={studentName}
            disabled
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicRegNo">
          <Form.Label>Student Registration Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Registration Number"
            defaultValue={regNO}
            disabled
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicMedicines">
          <Form.Label>Medicines</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter Medicines"
            rows={4}
            required
            onChange={(e) => setMedicines(e.target.value)}
          />
        </Form.Group>

        <div className="d-flex justify-content-around mt-4">
          <Button variant="primary" type="submit" className="w-25">
            Submit
          </Button>
          <Button
            variant="secondary"
            className="w-25"
          a href={`/add-mediclereport/${studentId}`}>
            Add Medical Report
          </Button>

          <Button variant="info" className="w-25" a href='/DoctorGetInfo'>
            Home
          </Button>
        </div>
      </Form>
    </div>
  </div>
  );
}

export default AddMedicine;
