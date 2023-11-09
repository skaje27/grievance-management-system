import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import Dashboard from "./pages/UserDashboard";
import Complaint from "./pages/Complaint";
import NoPage from "./pages/NoPage";
import AboutUs from "./pages/AboutUs";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { CookiesProvider } from "react-cookie"; // Import CookiesProvider
import Layout from "./pages/Layout";
import Admin from "./pages/Admin";
import AdminDashboard from "./pages/AdminDashboard";
import Status from "./pages/Status";
function App() {
  return (
    <CookiesProvider> 
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route index element={<Home />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/complaint" element={<Complaint />} />
          <Route path="/status" element={<Status />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/welcome/user" element={<Welcome isAdmin={false} />} />
          <Route path="/welcome/admin" element={<Welcome isAdmin={true} />} />
          <Route path="*" element={<NoPage />} />
          <Route path="/Admin" element={<Admin/>} />
          <Route path="/Admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </div>
    </CookiesProvider>
  );
}

export default App;