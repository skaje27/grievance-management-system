import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import "bootstrap/dist/css/bootstrap.min.css";
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Status from './Status';

const Admin = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies(['authToken']);
  const [showStatusDialog, setShowStatusDialog] = useState(false);
  const [complaints, setComplaints] = useState([]);
  const [adminDepartment, setAdminDepartment] = useState(null); 
  const [currentComplaint, setCurrentComplaint] = useState(null)

  const handleShowStatusDialog = (id) => {
    setCurrentComplaint(id)
    setShowStatusDialog(true);
  };

  const handleHideStatusDialog = () => {
    setShowStatusDialog(false);
  };

  
  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.authToken) {
        navigate('/login');
      }
      const authToken = cookies.authToken;

      try {
        const { data } = await axios.post(
          'http://localhost:4000',
          {},
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },            
            withCredentials: 'include'
          }
        );

        if (data.status) {
          // User is authenticated, continue with the admin page
          console.log(data);
          const decodedToken = data.decodeToken;
          const adminEmail = decodedToken.email;
          const departmentAbbreviation = adminEmail.split('@')[1].split('.')[0];

          // Define a mapping of department abbreviations to department names
          const departmentMapping = {
            mcc: 'Municipal Corporation',
            health: 'Health Department',
            pwd: 'Public Works Department',
            edu: 'Education Department',
            water: 'Water Resource Department',
            elec: 'Electricity Department',
          };

          // Determine the admin's department based on the abbreviation
          const adminDepartment = departmentMapping[departmentAbbreviation];
          setAdminDepartment(adminDepartment);

          // Fetch complaints for the admin's department
          const departmentBasedComplaints = await axios.get(
            `http://localhost:4000/complaints/department?department=${adminDepartment}`,
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
              withCredentials: 'include'              
            }
          );

          setComplaints(departmentBasedComplaints.data);
        } else {
          removeCookie('authToken');
          navigate('/login');
        }
      } catch (error) {
        console.error('Error verifying user:', error);
        // removeCookie('authToken');
        // navigate('/login');
      }
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  const Logout = () => {
    removeCookie('authToken');
    navigate('/login');
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-primary" style={{ backgroundColor: '#1293e4' }}>
        <div className="container-fluid">
        <Link to="/admin" className="navbar-brand">
      Dashboard
    </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="/admin">
                  Home
                </a>
              </li>
            </ul>
            <ul className="d-flex align-items-center" style={{ listStyle: 'none' }}>
              <li>
                <Link to="/login" className="btn btn-danger btn-md" onClick={Logout} style={{ padding: '10px 20px', fontSize: '1.2rem' }}>
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <br></br>
        <h3>Your Department: {adminDepartment}</h3>
      <div className="">

        <table className="table">
          <thead>
            <tr>
              <th>Complaint Text</th>
              <th>Date</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Uploaded File</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint) => (
              <tr key={complaint.id}>
                <td>{complaint.complaintText}</td>
                <td>{new Date(complaint.date).toLocaleDateString()}</td>
                <td>{complaint.location.latitude}</td>
                <td>{complaint.location.longitude}</td>
                <td>
                  {
                    <img src={`http://localhost:4000/${complaint.attachment}`} alt=" " style={{ maxWidth: '100px' }} />
                  }
                </td>
                <td key={complaint.id + '-status-button'}>
                  <Button variant="danger" onClick={() => handleShowStatusDialog(complaint._id)} style={{ padding: '10px 20px', fontSize: '1.2rem' }}>
                    Update
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <footer className="footer">
        <div className="row" style={{ backgroundColor: '#1293e4' }}>
          <h3>Contact Us</h3>
          <ul>
            <li>SCEM</li>
            <li>Adyar, Mangalore</li>
            <li>Phone: 9876543210</li>
            <li>Email: gms@gmail.com</li>
          </ul>
        </div>
      </footer>
      <ToastContainer />
      <Status show={showStatusDialog} onHide={handleHideStatusDialog} currentComplaint={currentComplaint}/> {/* Add Status component here */}
    </>
  );
};

export default Admin;