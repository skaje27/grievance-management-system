import React from 'react';
import './AboutUsPage.css';
import sannidhiImage from './sannidhi.jpg';
import { Link } from 'react-router-dom';
import surakshaImage from './suraksha.jpg';
import soujanyaImage from './soujanya.jpg';
import anaghaImage from './anagha.jpg';

const AboutUsPage = () => {
  return (
    <div className="about-us-page">
      <nav className="navbar navbar-expand-lg bg-body-primary" style={{ backgroundColor: '#1293e4' }}>
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
                <a className="nav-link" href="/AboutUs">
                  About Us
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  Home
                </a>
              </li>
              
              
            </ul>
            <Link to="/login" className="btn btn-danger btn-lg">
              Logout
            </Link>
          </div>
        </div>
      </nav>
      <br></br>
<h1 color="Blue">About Us</h1>
      <p>
        Welcome to Grievance Management Sytsem.
      </p>
      <p>
        Register Complaint or Update Complaint Status through the Portal. Respective government departments will get back to you with the updates of action taken regarding your Complaints.
      </p>
      <h2>Our Mission</h2>
      <p>
        Our mission is to help the public connect with the officials and lodge their grievances in a single web platform.
      </p>
      <h2>Our Team</h2>

<div className="team-section" >
  <div className="team-members">
  <div className="team-member" style={{ backgroundColor: 'rgba(173, 216, 230, 0.7)' }}>
      <img src={anaghaImage} alt="Anagha D S" />
      <h3>Anagha D S
      <a
          href="https://www.linkedin.com/in/anagha-d-s-7849b9228/"
          target="_blank"
          rel="noopener noreferrer"
        ><br></br>
          <i className="fab fa-linkedin"></i>
        </a>
        &nbsp;&nbsp;
        <a
      href="https://github.com/AnaghaDala"
      target="_blank"
      rel="noopener noreferrer"
    >
      <i className="fab fa-github"></i>
    </a>
      </h3>
    </div>
    <div className="team-member" style={{ backgroundColor: 'rgba(173, 216, 230, 0.7)' }}>
      <img src={sannidhiImage} alt="Sannidhi Kaje"  />
      <h3>Sannidhi Kaje
      <a
          href="https://www.linkedin.com/in/sannidhi-kaje-596440214/"
          target="_blank"
          rel="noopener noreferrer"
        ><br></br>
          <i className="fab fa-linkedin"></i>
        </a>
        &nbsp;&nbsp;
        <a
      href="https://github.com/skaje27"
      target="_blank"
      rel="noopener noreferrer"
    >
      <i className="fab fa-github"></i>
    </a>
      </h3>
    </div>
   
    <div className="team-member" style={{ backgroundColor: 'rgba(173, 216, 230, 0.7)' }}>
      <img src={soujanyaImage} alt="Soujanya P Sharma" />
      <h3>Soujanya P Sharma  
        <a
          href="https://www.linkedin.com/in/soujanya-sharma-6989a7228/"
          target="_blank"
          rel="noopener noreferrer"
        ><br></br>
          <i className="fab fa-linkedin"></i>
        </a>
        &nbsp;&nbsp;
        <a
      href="https://github.com/Soujanyasharma11"
      target="_blank"
      rel="noopener noreferrer"
    >
      <i className="fab fa-github"></i>
    </a></h3>
    </div>
    <div className="team-member" style={{ backgroundColor: 'rgba(173, 216, 230, 0.7)' }}> 
      <img src={surakshaImage} alt="Suraksha S Salian" />
      <h3>
        Suraksha S Salian
        <a
          href="https://www.linkedin.com/in/suraksha-s-salian-5b6288230/"
          target="_blank"
          rel="noopener noreferrer"
        ><br></br>
          <i className="fab fa-linkedin"></i>
        </a>&nbsp;&nbsp;
        <a
      href="https://github.com/suraksha0244"
      target="_blank"
      rel="noopener noreferrer"
    >
      <i className="fab fa-github"></i>
    </a>
      </h3>
     
    </div>
   
  </div>
</div>


<br></br>


      <footer className="footer"  style={{ backgroundColor: '#1293e4' }}>
        <div className="row" >
        <h4>
  Contact Us&nbsp;
  {/* <a href="https://sahyadri.edu.in/Home" class="btn btn-secondary">
    <i class="fas fa-link"></i> Sahyadri College Of Engineering and Management, Adyar, Mangalore-575007
  </a> */}
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
  <a href="tel:+919876543210" class="btn btn-secondary">&nbsp;+91 9876543210</a>
</li>

     
                       
                       
                       
                   
      </ul>
        </div>
      </footer>
    </div>
  );
};

export default AboutUsPage;