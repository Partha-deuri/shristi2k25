import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for API calls

const departments = [
    {
        id: "Techno",
        name: "Techno",
        description: "Explore the world of algorithms, coding, and AI.",
        image: "/demo_2.jpg",
    },
    {
        id: "CSE",
        name: "Computer Science",
        description: "Explore the world of algorithms, coding, and AI.",
        image: "/demo_2.jpg",
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
        description:
            "Uncover the mysteries of power systems and electromagnetism.",
        image: "/demo_2.jpg",
    },
    {
        id: "AE",
        name: "Agricultural",
        description:
            "Soar into the world of aerodynamics and space exploration.",
        image: "/demo_2.jpg",
    },
    {
        id: "CE",
        name: "Civil",
        description:
            "Build the future with innovative infrastructure and design.",
        image: "/demo_2.jpg",
    },
    {
        id: "FO",
        name: "Forestry",
        description: "Delve into the science of food processing and safety.",
        image: "/demo_2.jpg",
    },
    {
        id: "MBA",
        name: "Management",
        description: "Master the art of business and leadership.",
        image: "/demo_2.jpg",
    },
];

const DepartmentEvents = () => {
    const { departmentId } = useParams();
    const navigate = useNavigate();
    const [departmentEvents, setDepartmentEvents] = useState([]);
    const department = departments.find((dept) => dept.id === departmentId);

    useEffect(() => {
        const fetchDepartmentEvents = async () => {
            try {
                const response = await axios.get(
                    `${
                        import.meta.env.VITE_API_URL ||
                        "http://localhost:5000/api"
                    }/events/dept/${departmentId}`
                );
                const filteredEvents = response.data.filter(
                    (event) => event.department === departmentId
                );
                setDepartmentEvents(filteredEvents);
            } catch (error) {
                console.error("Error fetching department events:", error);
            }
        };

        fetchDepartmentEvents();
    }, [departmentId]);

    return (
        <div className="bg-gray-900 text-white min-h-screen flex flex-col">
            <main className="flex-grow pt-16 px-6">
                {/* Header Section */}
                <section className="text-center py-10">
                    <h1 className="text-5xl font-bold mb-4">
                        {department ? department.name : "Department Events"}
                    </h1>
                    <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                        {department
                            ? department.description
                            : "Explore the exciting events hosted by this department."}
                    </p>
                </section>

                {/* Events Grid */}
                {departmentEvents.length > 0 ? (
                    <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto py-10">
                        {departmentEvents.map((event) => (
                            <div
                                key={event._id}
                                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer hover:scale-105 transition-transform"
                                onClick={() => navigate(`/event/${event._id}`)}
                            >
                                <img
                                    src={event.imagePath || "/default.jpg"}
                                    alt={event.name}
                                    className="w-full object-cover"
                                />
                                <div className="p-6">
                                    <h2 className="text-2xl font-bold mb-2">
                                        {event.name}
                                    </h2>
                                    <p className="text-gray-300">
                                        {new Date(
                                            `1970-01-01T${event.time}`
                                        ).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            hour12: true,
                                        })}{" "}
                                        {new Date(event.date).toLocaleString(
                                            "en-US",
                                            {
                                                weekday: "long",
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            }
                                        )}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </section>
                ) : (
                    <div className="flex flex-col justify-center items-center h-64 w-full">
                        <p className="text-center text-gray-400 text-2xl font-semibold bg-gray-800 px-6 py-4 rounded-lg shadow-lg mb-4">
                            Coming Soon
                        </p>
                        <button
                            onClick={() => navigate(-1)}
                            className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow-md transition-colors"
                        >
                            Go Back
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
};

export default DepartmentEvents;
