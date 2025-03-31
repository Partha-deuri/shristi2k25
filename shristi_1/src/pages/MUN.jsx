// import React from "react";
// import "./MUN.css"; // Optional: Add custom styles for MUN page

const MUN = () => {
    return (
        <div className="mun-page">
            <header className="mun-header">
                <h1>Model United Nations</h1>
                <p>Welcome to the Shristi 2k25 Model United Nations Conference</p>
            </header>
            <section className="mun-intro">
                <h2>About MUN</h2>
                <p>
                    Model United Nations (MUN) is a simulation of the United Nations where students 
                    act as delegates to discuss and solve global issues. Join us to experience diplomacy, 
                    debate, and collaboration.
                </p>
            </section>
            <section className="mun-details">
                <h2>Event Details</h2>
                <ul>
                    <li><strong>Date:</strong> [Insert Date]</li>
                    <li><strong>Venue:</strong> [Insert Venue]</li>
                    <li><strong>Committees:</strong> [Insert Committees]</li>
                </ul>
            </section>
            <section className="mun-registration">
                <h2>Register Now</h2>
                <p>
                    Be a part of this prestigious event. Showcase your skills in diplomacy and 
                    problem-solving. Click below to register.
                </p>
                <button className="register-button">Register</button>
            </section>
        </div>
    );
};

export default MUN;
