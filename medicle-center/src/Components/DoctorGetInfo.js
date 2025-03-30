import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useNavigate } from "react-router-dom"; // Ensure you're using react-router-dom for navigation

function DoctorGetInfo() {
  const [fetchData, setFetchData] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchDataFromAPI = async () => {
      try {
        const response = await axios.get(`http://localhost:3005/api/users/Nurse1`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("API Response:", response.data);

        if (response.data && Array.isArray(response.data.students)) {
          setFetchData(response.data.students.reverse());
        } else {
          console.error("Unexpected API response structure");
        }
      } catch (error) {
        console.error("DoctorGetInfo Error", error.response ? error.response.data : error.message);
      }
    };

    fetchDataFromAPI();
  }, []);

  const handleRowClick = (student) => {
    setSelectedStudent(student);
    const modal = new window.bootstrap.Modal(document.getElementById("studentModal"));
    modal.show();
  };

  const handleMedicalReport = () => {
    if (selectedStudent) {
      console.log("Selected Student:", selectedStudent._id);
      navigate(`/AddMedicine/${selectedStudent._id}`);
      window.location.reload();
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">All Student Information</h2>
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Registration No</th>
            <th>Name</th>
            <th>Faculty</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {fetchData.length > 0 ? (
            fetchData.map((student, index) => (
              <tr key={student.id || index}>
                <td>{student.registrationNumber}</td>
                <td>{student.studentName}</td>
                <td>{student.faculty}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleRowClick(student)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Bootstrap Modal */}
      <div
        className="modal fade"
        id="studentModal"
        tabIndex="-1"
        aria-labelledby="studentModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="studentModalLabel">
                {selectedStudent ? (
                  <div>
                    <p>
                      {selectedStudent.studentName} (
                      {selectedStudent.registrationNumber})
                    </p>
                  </div>
                ) : (
                  "No Student Selected"
                )}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {selectedStudent && (
                <div>
                  <p>
                    <strong>Info:</strong> {selectedStudent.extraInfo}
                  </p>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={handleMedicalReport}
              >
                Add Medicine
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorGetInfo;
