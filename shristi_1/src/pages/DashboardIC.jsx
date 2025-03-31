import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    FaCalendarAlt,
    FaBell,
    FaSignOutAlt
} from "react-icons/fa";
import axios from "axios";

const DashboardIC = () => {
    const [user, setUser] = useState(null);
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showEventForm, setShowEventForm] = useState(false);
    const [newEvent, setNewEvent] = useState({
        name: "",
        department: user?.department,
        description: "",
        date: "",
        time: "",
        venue: "",
        rules: "",
        prizes: "",
        imagePath: "", // New field for image path
    });
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const incharge = localStorage.getItem("incharge");
        if (!token || !incharge) navigate("/login");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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

                const eventsRes = await axios.get(
                    `${
                        import.meta.env.VITE_API_URL ||
                        "http://localhost:5000/api"
                    }/events/department`,
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

    useEffect(() => {
        if (user) {
            setNewEvent((prevEvent) => ({
                ...prevEvent,
                department: user.department,
            }));
        }
    }, [user]);

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
                imagePath: newEvent.imagePath || "/SHRISTI_w_border.png", // Default image path
                registrations: [],
                notifications: [],
            };

            const res = await axios.post(
                `${
                    import.meta.env.VITE_API_URL ||
                    "http://localhost:5000/api"
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
                department: user?.department,
                description: "",
                date: "",
                time: "",
                venue: "",
                rules: "",
                prizes: "",
                imagePath: "", // New field for image path
            });
        } catch (err) {
            console.error(err);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("incharge");
        navigate("/login");
    };

    const getEventStatistics = () => {
        let totalRegistrations = 0;
        let maxRegistrations = 0;
        let mostPopularEvent = null;
    
        events.forEach((event) => {
            const registrationsCount = event.registrations?.length || 0;
            totalRegistrations += registrationsCount;
            if (registrationsCount > maxRegistrations) {
                maxRegistrations = registrationsCount;
                mostPopularEvent = event;
            }
        });
    
        return { totalRegistrations, mostPopularEvent, maxRegistrations };
    };

    const { totalRegistrations, mostPopularEvent, maxRegistrations } = getEventStatistics();

    const handleEditEvent = () => {
        setNewEvent({
            name: selectedEvent.name,
            department: selectedEvent.department,
            description: selectedEvent.description,
            date: selectedEvent.date,
            time: selectedEvent.time,
            venue: selectedEvent.venue,
            rules: selectedEvent.rules,
            prizes: selectedEvent.prizes,
            imagePath: selectedEvent.imagePath, // New field for image path
        });
        setIsEditing(true);
    };

    const handleSaveEdit = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) navigate("/login");

            const updatedEvent = {
                ...newEvent,
                imagePath: newEvent.imagePath || "/SHRISTI_w_border.png", // Default image path
            };

            const res = await axios.put(
                `${
                    import.meta.env.VITE_API_URL ||
                    "http://localhost:5000/api"
                }/events/${selectedEvent._id}`,
                updatedEvent,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            const updatedEvents = events.map((event) =>
                event._id === selectedEvent._id ? res.data : event
            );
            setEvents(updatedEvents);
            setSelectedEvent(res.data);
            setIsEditing(false);
        } catch (err) {
            console.error(err);
        }
    };

    const handleToggleRegistrations = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) navigate("/login");

            const updatedEvent = {
                ...selectedEvent,
                registrationsClosed: !selectedEvent.registrationsClosed,
            };

            const res = await axios.put(
                `${
                    import.meta.env.VITE_API_URL ||
                    "http://localhost:5000/api"
                }/events/${selectedEvent._id}`,
                updatedEvent,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            const updatedEvents = events.map((event) =>
                event._id === selectedEvent._id ? res.data : event
            );
            setEvents(updatedEvents);
            setSelectedEvent(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (selectedEvent) {
            const eventDate = new Date(selectedEvent.date);
            const currentDate = new Date();
            if (currentDate > eventDate && !selectedEvent.registrationsClosed) {
                handleToggleRegistrations();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedEvent]);

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
            {/* Sidebar (sticky & Full Height) */}
            <aside className="w-64 bg-gray-800 p-6 space-y-6 sticky h-screen top-16">
                <h1 className="text-2xl font-bold text-yellow-500">
                    Shristi Dashboard
                </h1>
                <nav className="space-y-4">
                    {/* <Link
                        to="/"
                        className="flex items-center space-x-2 hover:text-yellow-500"
                    >
                        <FaUser /> <span>Profile</span>
                    </Link> */}
                    <Link
                        to="/events"
                        className="flex items-center space-x-2 hover:text-yellow-500"
                    >
                        <FaCalendarAlt /> <span>Events</span>
                    </Link>
                    <Link
                        to="/timeline"
                        className="flex items-center space-x-2 hover:text-yellow-500"
                    >
                        <FaBell /> <span>Timeline</span>
                    </Link>
                    {/* <Link
                        to="/settings"
                        className="flex items-center space-x-2 hover:text-yellow-500"
                    >
                        <FaCog /> <span>Settings</span>
                    </Link> */}
                    <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 text-red-500 hover:text-red-700 w-full"
                    >
                        <FaSignOutAlt /> <span>Logout</span>
                    </button>
                </nav>
            </aside>

            {/* Main Content Wrapper (No More Overlap) */}
            <div className="flex-1 min-h-screen ">
                <main className="p-8">
                    {/* Summary Section */}
                    <section className="mb-6 bg-gray-800 p-6 rounded-lg">
                        <h3 className="text-2xl font-semibold text-yellow-500">Event Statistics</h3>
                        <p className="text-gray-400 mt-2">
                            Total Users Registered: <span className="font-bold">{totalRegistrations}</span>
                        </p>
                        {mostPopularEvent && (
                            <p className="text-gray-400 mt-2">
                                Most Popular Event:{" "}
                                <span className="font-bold">{mostPopularEvent.name}</span> with{" "}
                                <span className="font-bold">{maxRegistrations}</span> registrations
                            </p>
                        )}
                    </section>
                    <h2 className="text-3xl font-bold">
                        Welcome, {user?.name} 👋
                    </h2>
                    <p className="text-gray-400">{user?.email}</p>

                    {/* Events Section */}
                    <section className="mt-6">
                        <h3 className="text-2xl font-semibold text-yellow-500">
                            Department Events
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
                                        value={user.department}
                                        className="w-full p-2 rounded bg-gray-700 text-white cursor-not-allowed"
                                        disabled
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
                                        className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    />
                                    <input
                                        type="time"
                                        name="time"
                                        value={newEvent.time}
                                        onChange={handleInputChange}
                                        className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
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
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                            {events.map((event) => (
                                <div
                                    key={event._id}
                                    className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                                    onClick={() => handleEventClick(event._id)}
                                >
                                    <h4 className="text-xl font-bold text-yellow-500">{event.name}</h4>
                                    {event.imagePath && (
                                        <img
                                            src={event.imagePath}
                                            alt={event.name}
                                            className="w-full h-40 object-cover rounded-lg mt-4"
                                        />
                                    )}
                                    <p className="text-gray-400 mt-2">
                                        <span className="font-semibold">Date:</span> {new Date(event.date).toLocaleDateString()}
                                    </p>
                                    <p className="text-gray-400">
                                        <span className="font-semibold">Time:</span> {new Date(`1970-01-01T${event.time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Selected Event Details */}
                    {selectedEvent && (
                        <section className="mt-8 bg-gray-800 p-8 rounded-lg shadow-lg">
                            <h3 className="text-2xl font-semibold text-yellow-500">
                                {selectedEvent.name} - Registered Users
                            </h3>
                            <p className="text-gray-400 mt-2">
                                <span className="font-semibold">Date:</span> {new Date(selectedEvent.date).toLocaleDateString()}
                            </p>
                            <p className="text-gray-400">
                                <span className="font-semibold">Time:</span> {new Date(`1970-01-01T${selectedEvent.time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                            </p>
                            <p className="text-gray-400">
                                <span className="font-semibold">Venue:</span> {selectedEvent.venue}
                            </p>
                            <p className="text-gray-400">
                                <span className="font-semibold">Description:</span> {selectedEvent.description}
                            </p>
                            {selectedEvent.imagePath && (
                                <img
                                    src={selectedEvent.imagePath}
                                    alt={selectedEvent.name}
                                    className="w-full h-48 object-cover rounded-lg mt-4"
                                />
                            )}
                            {selectedEvent.prizes && typeof selectedEvent.prizes === "string" ? (
                                <ul className="list-disc list-inside">
                                    {selectedEvent.prizes.split("\n").map((prize, index) => (
                                        <li key={index}>{prize}</li>
                                    ))}
                                </ul>
                            ) : (
                                "No prizes available"
                            )}
                            {selectedEvent.registrationsClosed && (
                                <p className="text-red-500 font-bold mt-2">
                                    Registrations are closed for this event.
                                </p>
                            )}
                            <div className="flex space-x-4 mt-4">
                                <button
                                    onClick={handleEditEvent}
                                    className="px-4 py-2 bg-blue-500 text-black rounded-lg hover:bg-blue-600"
                                >
                                    Edit Event
                                </button>
                                {!selectedEvent.registrationsClosed && new Date(selectedEvent.date) > new Date() && (
                                    <button
                                        onClick={handleToggleRegistrations}
                                        className="px-4 py-2 bg-red-500 text-black rounded-lg hover:bg-red-600"
                                    >
                                        Stop Registrations
                                    </button>
                                )}
                                {selectedEvent.registrationsClosed && (
                                    <button
                                        onClick={handleToggleRegistrations}
                                        className="px-4 py-2 bg-green-500 text-black rounded-lg hover:bg-green-600"
                                    >
                                        Resume Registrations
                                    </button>
                                )}
                            </div>
                            {isEditing && (
                                <div className="mt-4 bg-gray-800 p-6 rounded-lg">
                                    <h4 className="text-xl font-bold text-yellow-500">Edit Event</h4>
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
                                            className="w-full p-2 rounded bg-gray-700 text-white cursor-not-allowed"
                                            disabled
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
                                            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                        />
                                        <input
                                            type="time"
                                            name="time"
                                            value={newEvent.time}
                                            onChange={handleInputChange}
                                            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
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
                                                onClick={handleSaveEdit}
                                                className="px-4 py-2 bg-green-500 text-black rounded-lg hover:bg-green-600"
                                            >
                                                Save
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setIsEditing(false)}
                                                className="px-4 py-2 bg-red-500 text-black rounded-lg hover:bg-red-600"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}
                            <ul className="mt-3 space-y-2">
                                {selectedEvent.registeredUsers?.map((users) => (
                                    <li
                                        key={users._id} // Ensure the key is unique
                                        className="bg-gray-800 p-4 rounded-lg"
                                    >
                                        <p className="font-semibold">
                                            {users.name}
                                        </p>
                                        <p className="text-gray-400">
                                            {users.email}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}
                </main>
            </div>
        </div>
    );
};

export default DashboardIC;
