import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    // FaCalendarAlt,
    // FaBell,
    FaSignOutAlt,
    FaChevronDown,
} from "react-icons/fa";
import axios from "axios";

const AdminDash = () => {
    const [user, setUser] = useState(null);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showEventForm, setShowEventForm] = useState(false);
    const [newEvent, setNewEvent] = useState({
        name: "",
        department: "",
        description: "",
        date: "",
        time: "",
        venue: "",
        rules: "",
        prizes: "",
        imagePath: "",
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem("token");
                if (!token) navigate("/login");

                const userRes = await axios.get(
                    `${
                        import.meta.env.VITE_API_URL ||
                        "http://localhost:5000/api"
                    }/incharge/details`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setUser(userRes.data);
                if(userRes.data.department !== "admin"){
                    navigate("/ic/dashboard");
                }

                const eventsRes = await axios.get(
                    `${
                        import.meta.env.VITE_API_URL ||
                        "http://localhost:5000/api"
                    }/events`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setEvents(eventsRes.data);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch dashboard data.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [navigate]);

    // Group events by department
    const groupedEvents = events.reduce((acc, event) => {
        if (!acc[event.department]) {
            acc[event.department] = [];
        }
        acc[event.department].push(event);
        return acc;
    }, {});

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const handleEventClick = (eventId) => {
        navigate(`/ic/event/${eventId}`);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEvent({ ...newEvent, [name]: value });
    };

    const handleSubmitEvent = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) navigate("/login");

            const eventToAdd = {
                ...newEvent,
                imagePath: newEvent.imagePath || "/SHRISTI_w_border.png",
                registrations: [],
                notifications: [],
            };

            const res = await axios.post(
                `${
                    import.meta.env.VITE_API_URL || "http://localhost:5000/api"
                }/events`,
                eventToAdd,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            setEvents([...events, res.data]);
            setShowEventForm(false);
            setNewEvent({
                name: "",
                department: "",
                description: "",
                date: "",
                time: "",
                venue: "",
                rules: "",
                prizes: "",
                imagePath: "",
            });
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) {
        return (
            <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-2xl font-semibold">Loading dashboard...</p>
                    <div className="mt-4 animate-spin rounded-full h-12 w-12 border-t-4 border-yellow-500 border-solid"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-2xl font-semibold text-red-500">Error</p>
                    <p className="mt-2 text-gray-300">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex bg-gray-900 text-white min-h-screen pt-16">
            {/* Navbar for smaller devices */}
            <nav className="bg-gray-800 p-4 fixed top-16 left-0 w-full z-50 md:hidden flex justify-between items-center">
                <h1 className="text-xl font-bold text-yellow-500">Admin Dashboard</h1>
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="text-white focus:outline-none"
                >
                    <FaChevronDown size={24} />
                </button>
            </nav>

            {/* Sidebar */}
            <aside
                className={`w-64 bg-gray-800 p-6 space-y-6 fixed top-32 left-0 h-screen transform ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                } transition-transform duration-300 md:translate-x-0 md:sticky md:top-16`}
            >
                <h1 className="text-2xl font-bold text-yellow-500">Admin Dashboard</h1>
                <nav className="space-y-4">
                    <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 text-red-500 hover:text-red-700 w-full"
                    >
                        <FaSignOutAlt /> <span>Logout</span>
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 min-h-screen">
                <main className="p-8 mt-32 md:mt-0">
                    <h2 className="text-3xl font-bold">
                        Welcome, {user?.name} 👋
                    </h2>
                    <p className="text-gray-400">{user?.email}</p>

                    {/* Events Section */}
                    <section className="mt-6">
                        <h3 className="text-2xl font-semibold text-yellow-500">
                            All Events
                        </h3>
                        <button
                            onClick={() => setShowEventForm(true)}
                            className="mt-4 px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600"
                        >
                            Add New Event
                        </button>
                        {showEventForm && (
                            <div className="mt-4 bg-gray-800 p-6 rounded-lg">
                                <h4 className="text-xl font-bold text-yellow-500">New Event Form</h4>
                                <form className="space-y-4 mt-4">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Event Name"
                                        value={newEvent.name}
                                        onChange={handleInputChange}
                                        className="w-full p-2 rounded bg-gray-700 text-white"
                                    />
                                    <input
                                        type="text"
                                        name="department"
                                        placeholder="Department"
                                        value={newEvent.department}
                                        onChange={handleInputChange}
                                        className="w-full p-2 rounded bg-gray-700 text-white"
                                    />
                                    <textarea
                                        name="description"
                                        placeholder="Description"
                                        value={newEvent.description}
                                        onChange={handleInputChange}
                                        className="w-full p-2 rounded bg-gray-700 text-white"
                                    />
                                    <input
                                        type="date"
                                        name="date"
                                        value={newEvent.date}
                                        onChange={handleInputChange}
                                        className="w-full p-2 rounded bg-gray-700 text-white"
                                    />
                                    <input
                                        type="time"
                                        name="time"
                                        value={newEvent.time}
                                        onChange={handleInputChange}
                                        className="w-full p-2 rounded bg-gray-700 text-white"
                                    />
                                    <input
                                        type="text"
                                        name="venue"
                                        placeholder="Venue"
                                        value={newEvent.venue}
                                        onChange={handleInputChange}
                                        className="w-full p-2 rounded bg-gray-700 text-white"
                                    />
                                    <textarea
                                        name="rules"
                                        placeholder="Rules"
                                        value={newEvent.rules}
                                        onChange={handleInputChange}
                                        className="w-full p-2 rounded bg-gray-700 text-white"
                                    />
                                    <textarea
                                        name="prizes"
                                        placeholder="Prizes (one per line)"
                                        value={newEvent.prizes}
                                        onChange={handleInputChange}
                                        className="w-full p-2 rounded bg-gray-700 text-white"
                                    />
                                    <input
                                        type="text"
                                        name="imagePath"
                                        placeholder="Image Path"
                                        value={newEvent.imagePath}
                                        onChange={handleInputChange}
                                        className="w-full p-2 rounded bg-gray-700 text-white"
                                    />
                                    <div className="flex space-x-4">
                                        <button
                                            type="button"
                                            onClick={handleSubmitEvent}
                                            className="px-4 py-2 bg-green-500 text-black rounded-lg hover:bg-green-600"
                                        >
                                            Submit
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setShowEventForm(false)}
                                            className="px-4 py-2 bg-red-500 text-black rounded-lg hover:bg-red-600"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}
                        <p className="text-gray-400">Events grouped by department</p>
                        {Object.keys(groupedEvents).map((department) => (
                            <div key={department} className="mt-6">
                                <h4 className="text-xl font-bold text-yellow-500">
                                    {department} Department
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                                    {groupedEvents[department].map((event) => (
                                        <div
                                            key={event._id}
                                            className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                                            onClick={() => handleEventClick(event._id)}
                                        >
                                            <h4 className="text-xl font-bold text-yellow-500">
                                                {event.name}
                                            </h4>
                                            {event.imagePath && (
                                                <img
                                                    src={event.imagePath}
                                                    alt={event.name}
                                                    className="w-full h-40 object-cover rounded-lg mt-4"
                                                />
                                            )}
                                            <p className="text-gray-400 mt-2">
                                                <span className="font-semibold">Date:</span>{" "}
                                                {new Date(event.date).toLocaleDateString()}
                                            </p>
                                            <p className="text-gray-400">
                                                <span className="font-semibold">Time:</span>{" "}
                                                {new Date(`1970-01-01T${event.time}`).toLocaleTimeString([], {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                    hour12: true,
                                                })}
                                            </p>
                                            {event.registrationsClosed ? (
                                                <p className="text-red-500 font-bold mt-2">
                                                    Registrations Paused
                                                </p>
                                            ) : (
                                                <p className="text-green-500 font-bold mt-2">
                                                    Registrations Open
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </section>
                </main>
            </div>
        </div>
    );
};

export default AdminDash;
