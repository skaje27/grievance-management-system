import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Complaint from './Complaint';
//import { FaSearch } from "react-icons/fa";
import "./Login.css";

const Dashboard = () => {
  const [complaints, setComplaints] = useState([]);
  // const [searchQuery, setSearchQuery] = useState("");
  // const [filteredComplaints, setFilteredComplaints] = useState([]);
  const navigate = useNavigate();
  const [showComplaintDialog, setShowComplaintDialog] = useState(false);
  const [actions, setActions] = useState([]);

  const [cookies, removeCookie] = useCookies(['authToken']);
  const authToken = cookies.authToken;

  const handleShowComplaintDialog = () => {
    setShowComplaintDialog(true);
  };

  const handleHideComplaintDialog = () => {
    setShowComplaintDialog(false);
  };

  useEffect(() => {
    const verifyCookie = async () => {
      if (!authToken) {
        navigate('/login');
      }

      try {
        const { data } = await axios.post(
          'http://localhost:4000', 
          {},
          { 
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
           }
        );
  
        console.log(data);
  
        if (data.status) {
        } else {
          removeCookie('authToken');
          navigate('/login');
        }
      } catch (error) {
        console.error('Error verifying user:', error);
        removeCookie('authToken');
        navigate('/login');
      }
    };
    verifyCookie();
  }, [authToken, navigate, removeCookie]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const complaintsResponse = await axios.get("http://localhost:4000/complaints/complaints", {
          withCredentials: "include",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        const complaintsData = complaintsResponse.data;
        setComplaints(complaintsData);

        const actionRequests = complaintsData.map(async (data) => {
          const actionResponse = await axios.get("http://localhost:4000/actions/get/" + data._id, {
            withCredentials: "include",
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });
          return actionResponse;
        })

        const actionResponses = await Promise.all(actionRequests);

        // Process action responses, for example, store in a state variable
        const statuses = actionResponses.map((response) => response.data);
        setActions(statuses);

        // loading.current.classList.add("hidden");
    } catch (error) {
      console.error('Error loading complaints:', error);
    }
  };

    fetchComplaints();
  }, [authToken]);
  
  const Logout = () => {
    removeCookie('token');
    navigate('/login');
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-primary" style={{ backgroundColor: '#1293e4' }}>
        <div className="container-fluid">
          <a className="navbar-brand" href="/dashboard">
            Dashboard
          </a>
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
                <a className="nav-link active" aria-current="page" href="/">
                  Home
                </a>
              </li>
            </ul>
            <ul className="d-flex align-items-center" style={{ listStyle: 'none' }}>
              <li style={{ marginRight: '10px' }}>
                <Button variant="danger" onClick={handleShowComplaintDialog} style={{ padding: '10px 20px', fontSize: '1.2rem' }}>
                  Register Complaint
                </Button>
              </li>
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
        <h3 className="text mt-4 mb-3" style={{ color: "#000000", fontWeight: "bold", fontSize: "24px" }}>
          Complaints
        </h3>
        
    {console.log(complaints, actions)}
        <table className="table">
  <thead>
    <tr>
      <th scope="col">Complaint Text</th>
      <th scope="col">Department Assigned</th>
      <th scope="col">Action Description</th>
      <th scope="col">Status</th>
      <th scope="col">Uploaded File</th>
      <th scope="col">Date</th>
    </tr>
  </thead>
  <tbody>
  {complaints.map((complaint, i) => (
    <tr key={complaint._id}>
      <td>{complaint.complaintText}</td>
      <td>{complaint.department}</td>
      <td>{actions[i]?.actions[0]?.actionDescription || "-" }</td>
      <td>{actions[i]?.actions[0]?.status || "-" }</td>
      <td><img src={`http://localhost:4000/${actions[i]?.actions[0]?.attachment}` } alt=" " style={{ maxWidth: '100px' }} /></td>
      <td>{new Date(complaint.date).toLocaleDateString()}</td>
    </tr>
  ))}
</tbody>

</table>
      <div>
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
      </div>
      <ToastContainer />
      <Complaint show={showComplaintDialog} onHide={handleHideComplaintDialog} />
    </>
  );
};

export default Dashboard;
