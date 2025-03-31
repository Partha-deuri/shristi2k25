import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for API calls

const DepartmentEvents = () => {
    const { departmentId } = useParams();
    const navigate = useNavigate();
    const [departmentEvents, setDepartmentEvents] = useState([]);

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
                        Department Events
                    </h1>
                    <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                        Explore the exciting events hosted by this department.
                    </p>
                </section>

                {/* Events Grid */}
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
                                    {event.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </section>
            </main>
        </div>
    );
};

export default DepartmentEvents;
