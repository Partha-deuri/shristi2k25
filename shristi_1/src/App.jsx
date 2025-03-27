// import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import Timeline from "./pages/Timeline";
import Game from "./pages/Game";
import Sponsors from "./pages/Sponsors";
import Photos from "./pages/Photos";
import Developers from "./pages/Developers";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import SignupIncharge from "./pages/SignupIncharge";
import LoginIncharge from "./pages/LoginIncharge";
import DashboardIC from "./pages/DashboardIC.jsx";
import TedxNerist from "./pages/TedxNerist.jsx";
import DepartmentEvents from "./pages/DepartmentEvents.jsx";
import OtpPage from "./pages/OtpPage.jsx";

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/events" element={<Events />} />
                <Route
                    path="/events/:departmentId"
                    element={<DepartmentEvents />}
                />
                <Route path="/event/:id" element={<EventDetails />} />
                <Route path="/timeline" element={<Timeline />} />
                <Route path="/game" element={<Game />} />
                <Route path="/sponsors" element={<Sponsors />} />
                <Route path="/photos" element={<Photos />} />
                <Route path="/developers" element={<Developers />} />
                <Route path="/verify/otp" element={<OtpPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<Dashboard />} />
                {/* TEDxNERIST  */}
                <Route path="/tedxnerist" element={<TedxNerist />} />
                {/* Incharge Paths */}
                <Route path="/ic/signup" element={<SignupIncharge />} />
                <Route path="/ic/login" element={<LoginIncharge />} />
                <Route path="/ic/dashboard" element={<DashboardIC />} />
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;
