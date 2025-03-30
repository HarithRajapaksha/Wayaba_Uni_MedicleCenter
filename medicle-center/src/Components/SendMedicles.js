import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

function SendMedicles() {
  const [regNO, setRegNO] = useState("");
  const [studentName, setStudentName] = useState("");
  const [faculty, setFaculty] = useState(""); // Updated to control faculty dropdown
  const [departments, setDepartments] = useState([]); // For departments dropdown
  const [extraInfo, setExtraInfo] = useState(""); // Extra information
  const [department, setDepartment] = useState(""); // Selected department
  const { id } = useParams();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3005/api/users/pharmacist/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const fetchedFaculty = response.data.FindUser.faculty;

        setRegNO(response.data.FindUser.registrationNumber);
        setStudentName(response.data.FindUser.studentName);
        setFaculty(fetchedFaculty); // Set faculty from the API response

        // Automatically update departments based on the fetched faculty
        updateDepartments(fetchedFaculty);

        console.log("API Response:", response.data.FindUser);
      } catch (error) {
        console.error(
          "Add Medicine Error:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchData();
  }, [id, token]);

  // Function to update departments based on the faculty
  const updateDepartments = (selectedFaculty) => {
    if (selectedFaculty === "Applied") {
      setDepartments(["Mathematics", "Electronics", "CMIS"]);
    } else if (selectedFaculty === "Technology") {
      setDepartments(["Department Of Construction Technology", "Department of Electrotechnology","Department of Mechanical and Manufacturing Technology","Department of Nano Science Technology"]);
    } else if (selectedFaculty === "BSF") {
      setDepartments(["Department of Accountancy", "Department of Banking & Finance", "DEPARTMENT OF BUSINESS MANAGEMENT","Department of Insurance & Valuation","Department of English Language Teaching"]);
    } else {
      setDepartments([]);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const sendData = {
      regNO,
      studentName,
      faculty,
      department,
      extraInfo
    };

    try {
      const response = await axios.post(
        `http://localhost:3005/api/users/MedicleReports`,
        sendData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

       Swal.fire({
                      title: "Success!",
                      text: "Medicle Send Success",
                      icon: "success",
                    }).then(() => {
                      // Optional: Clear form or perform other actions
                    }); 

      console.log("Registration Success", response.data);
      console.log("Student Name:", studentName);
      console.log("Registration Number:", regNO);
    } catch (error) {

      Swal.fire({
        title: "error!",
        text: "Medicle Send Fail",
        icon: "error",
      }).then(() => {
        // Optional: Clear form or perform other actions
      }); 
      console.error(
        "Students data sending fail",
        error.response ? error.response.data : error.message
      );
    }
  }

  // Handle faculty change and update departments dynamically
  const handleFacultyChange = (event) => {
    const selectedFaculty = event.target.value;
    setFaculty(selectedFaculty);
    updateDepartments(selectedFaculty); // Update departments based on the selection
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
        <h4 className="text-center mb-4">Medicle Data send to Departments</h4>
        <Form >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Student Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={studentName}
              disabled
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicRegNo">
            <Form.Label>Student Registration Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Registration Number"
              value={regNO}
              disabled
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Faculty</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Registration Number"
              value={faculty}
              disabled
            />
          </Form.Group>

          {faculty && (
  <Form.Group className="mb-3">
    <Form.Label>Departments</Form.Label>
    <Form.Select
      aria-label="Select Student Department"
      onChange={(e) => setDepartment(e.target.value)} // Set state on change
    >
      <option>Select Department</option>
      {departments.map((department, index) => (
        <option key={index} value={department}>
          {department}
        </option>
      ))}
    </Form.Select>
  </Form.Group>
)}


          <Form.Group className="mb-3" controlId="formBasicExtraInfo">
            <Form.Label>Extra Information</Form.Label>
            <Form.Control as="textarea" placeholder="Extra information" rows={4} onChange={(e)=>{setExtraInfo(e.target.value)}}/>
          </Form.Group>

          <div className="justify-content-center d-flex">
            <Button variant="primary" type="submit" className="w-50" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default SendMedicles;
