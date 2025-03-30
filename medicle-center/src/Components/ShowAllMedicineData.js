import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function StudentMedicineInfo() {
  const [fetchData, setFetchData] = useState([]); // Store fetched data
  const [selectedStudent, setSelectedStudent] = useState(null); // Store selected student for modal

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchDataFromAPI = async () => {
      try {
        const response = await axios.get(`http://localhost:3005/api/users/pharmacist2`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("API Response:", response.data.medicines);
        setFetchData(response.data.medicines.reverse());
      } catch (error) {
        console.error(
          "Error fetching student data:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchDataFromAPI();
  }, []);

  const handleRowClick = (student) => {
    setSelectedStudent(student); // Set the selected student for the modal
    const modal = new window.bootstrap.Modal(document.getElementById("studentModal"));
    modal.show();
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Students Medicle Details</h2>
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Registration No</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {fetchData.length > 0 ? (
            fetchData.map((student, index) => (
              <tr key={student._id || index}>
                <td>{student.regNO}</td>
                <td>{student.studentName}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleRowClick(student)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">
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
                  `${selectedStudent.studentName} (${selectedStudent.regNO})`
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
              {selectedStudent && selectedStudent.medicines ? (
                // Check if medicines is an array or a single object
                Array.isArray(selectedStudent.medicines) ? (
                  <ul>
                    {selectedStudent.medicines.map((medicine, index) => (
                      <li key={index}>{medicine}</li>
                    ))}
                  </ul>
                ) : (
                  <p>{selectedStudent.medicines || "No Medicines Assigned"}</p>
                )
              ) : (
                <p>No Medicines Assigned</p>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentMedicineInfo;
