import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
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
import IcEventDetails from "./pages/IcEventDetails.jsx";
import ErrorPage from "./pages/ErrorPage";
import MUN from "./pages/MUN"; // Import MUN page

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught an error", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong. Please try again later.</h1>;
        }
        // eslint-disable-next-line react/prop-types
        return this.props.children;
    }
}

const App = () => {
    return (
        <ErrorBoundary>
            <Router>
                <ToastContainer 
                    position="top-right" 
                    autoClose={5000} 
                    hideProgressBar={false} 
                    newestOnTop={false} 
                    closeOnClick 
                    rtl={false} 
                    pauseOnFocusLoss 
                    draggable 
                    pauseOnHover 
                    theme="dark" 
                /> {/* Updated ToastContainer */}
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
                    <Route path="/ic/event/:id" element={<IcEventDetails />} />
                    <Route path="/mun" element={<MUN />} /> {/* Add MUN route */}
                    <Route path="/*" element={<ErrorPage />} />
                </Routes>
                <Footer />
            </Router>
        </ErrorBoundary>
    );
};

export default App;
