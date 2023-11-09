import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import "bootstrap/dist/css/bootstrap.min.css";
import './Home.css'

const Admin = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies(['authToken']);

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.authToken) {
        navigate('/login');
      }
      const authToken = cookies.authToken;

      const { data } = await axios.post(
        'http://localhost:4000', 
        {},
        { 
          headers: {
            Authorization: `Bearer ${authToken}`, // Use backticks for template string
          },
          withCredentials: true
        }
      );

      if (data.status) {
        // User is authenticated, continue with admin page
      } else {
        removeCookie('authToken');
        navigate('/login');
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
          <a className="navbar-brand" href="/admin">
            Grievance Portal
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
                <a className="nav-link active" aria-current="page" href="/admin">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/admin/dashboard">
                  Dashboard
                </a>
              </li>
            </ul>
            <ul className="d-flex align-items-center" style={{ listStyle: 'none' }}>
              <li>
                <a href="/login" className="btn btn-danger btn-md" onClick={Logout} style={{ padding: '10px 20px', fontSize: '1.2rem' }}>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <br></br>
      <p>
        Click on Dashboard to view all the complaints pertaining to your department or update action status of particular complaints! 
      </p>
      <div className="container">
     <div id="carouselExampleCaptions" className="carousel slide">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJpJ_HYRoiBoV3JtVap9WHa6Wr3xERsbcpgl9LJuU5A__h6_dWFUb3lzfG4tjorGJyW18&usqp=CAU" className="d-block w-100" width="500" height="550" alt="..."/>
      <div className="carousel-caption-box">
        <div className="carousel-caption d-none d-md-block">
        <h5>Welcome!</h5>
        <h6>You can now manage the grievances of the public in a single platform!</h6>
      </div>
      </div>
    </div>
    <div className="carousel-item">
      <img src="https://www.callcentrehelper.com/images/stories/2017/01/computer-dashboard-760.jpg" className="d-block w-100" alt="..." width="500" height="550"/>
      <div className="carousel-caption-box">
         <div className="carousel-caption d-none d-md-block">
        <h5>Easy Access to Complaints</h5>
        <h6>Find all the complaints of your department from the public in your admin dashboard.</h6>
      </div>
      </div>
    </div>
    <div className="carousel-item">
      <img src="https://niftypm.com/blog/wp-content/uploads/2022/03/Status-Updates-Cover.png"  width="500" height="550"className="d-block w-100" alt="..."/>
      <div className="carousel-caption-box">
        <div className="carousel-caption d-none d-md-block">
        <h5>Update Progress Status</h5>
        <h6>Update the status of the actions taken on the grievances of the citizens with respective photos!</h6>
      </div>
      </div>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
</div>
<footer className="footer"  style={{ backgroundColor: '#1293e4' }}>
        <div className="row" >
        <h4>
  Contact Us&nbsp;
  
</h4>

        
      <h6>We'd love to hear from you! If you have any questions, suggestions, or feedback, please feel free to get in touch with us.</h6>
      <hr></hr>
      <h6>Contact Information</h6>
      <ul>
      <li>&nbsp;&nbsp;
  <i class="fas fa-envelope"></i>&nbsp;&nbsp;
  <a href="mailto:gms@sahyadri.edu.in" class="btn btn-secondary">gms@sahyadri.edu.in</a>
</li>
<br></br>
<li>&nbsp;&nbsp;
 <i class="fas fa-phone"></i>&nbsp;&nbsp;
  <a href="tel:+919876543210" class="btn btn-secondary">+91 9876543210</a>
</li>              
      </ul>
        </div>
      </footer>
      <ToastContainer />
    </>
  );
};

export default Admin;