// import { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
// import axios from 'axios';

const Events = () => {
  const navigate = useNavigate();

  // Dummy data for departments
  const departments = [
    {
      id: "Techno",
      name: "Techno",
      description: "",
      image: "/demo_2.jpg",
    },
    {
      id: "CSE",
      name: "Computer Science",
      description: "Explore the world of algorithms, coding, and AI.",
      image: "/cse/cse.png",
    },
    {
      id: "ECE",
      name: "Electronics",
      description: "Dive into circuits, microcontrollers, and IoT.",
      image: "/demo_2.jpg",
    },
    {
      id: "ME",
      name: "Mechanical",
      description: "Discover the art of machines and robotics.",
      image: "/demo_2.jpg",
    },
    {
      id: "EE",
      name: "Electrical",
      description: "Uncover the mysteries of power systems and electromagnetism.",
      image: "/demo_2.jpg",
    },
    {
      id: "AE",
      name: "Agricultural",
      description: "Soar into the world of aerodynamics and space exploration.",
      image: "/demo_2.jpg",
    },
    {
      id: "CE",
      name: "Civil",
      description: "Build the future with innovative infrastructure and design.",
      image: "/demo_2.jpg",
    },
    {
      id: "FO",
      name: "Forestry",
      description: "Delve into the science of food processing and safety.",
      image: "/demo_2.jpg",
    },
    {
      id: "CMS",
      name: "Center of Management Studies",
      description: "Master the art of business and leadership.",
      image: "/demo_2.jpg",
    },
  ];

  const handleDepartmentClick = (departmentId) => {
    navigate(`/events/${departmentId}`);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <main className="flex-grow pt-16 px-6">
        {/* Header Section */}
        <section className="text-center py-10">
          <h1 className="text-5xl font-bold mb-4">Explore Our Departments and Their Events</h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Discover the exciting events and activities hosted by each department at Shristi Tech Fest.
          </p>
        </section>

        {/* Departments Section */}
        <section className="text-center py-10">
          <h2 className="text-4xl font-bold mb-6">Our Departments</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {departments.map((department) => (
              <div
                key={department.id}
                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
                onClick={() => handleDepartmentClick(department.id)}
              >
                <img src={department.image} alt={department.name} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{department.name}</h3>
                  <p className="text-gray-300">{department.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Events;
