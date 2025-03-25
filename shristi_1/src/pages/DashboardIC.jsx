import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    FaUser,
    FaCalendarAlt,
    FaBell,
    FaSignOutAlt,
    FaCog,
} from "react-icons/fa";
import axios from "axios";

const DashboardIC = () => {
    const [user, setUser] = useState(null);
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showEventForm, setShowEventForm] = useState(false);
    const [newEvent, setNewEvent] = useState({
        name: "",
        department: "",
        description: "",
        date: "",
        venue: "",
    });
    const [isEditing, setIsEditing] = useState(false);
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

                // Replace API call with dummy data
                const dummyEvents = [
                    { id: 1, name: "Tech Talk", date: "2023-11-01" },
                    { id: 2, name: "Workshop on AI", date: "2023-11-05" },
                    { id: 3, name: "Hackathon", date: "2023-11-10" },
                ];
                setEvents(dummyEvents);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, [navigate]);

    const handleEventClick = (eventId) => {
        // Replace API call with dummy data
        const dummyEventDetails = {
            id: eventId,
            name: `Event ${eventId}`,
            registeredUsers: [
                { id: 1, name: "John Doe", email: "john@example.com" },
                { id: 2, name: "Jane Smith", email: "jane@example.com" },
                { id: 3, name: "Alice Johnson", email: "alice@example.com" },
            ],
        };
        setSelectedEvent(dummyEventDetails);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEvent({ ...newEvent, [name]: value });
    };

    const handleSubmitEvent = () => {
        const eventToAdd = {
            ...newEvent,
            id: events.length + 1,
            registrations: [],
            notifications: [],
        };
        setEvents([...events, eventToAdd]);
        setShowEventForm(false);
        setNewEvent({
            name: "",
            department: "",
            description: "",
            date: "",
            venue: "",
        });
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
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
            venue: selectedEvent.venue,
        });
        setIsEditing(true);
    };

    const handleSaveEdit = () => {
        const updatedEvents = events.map((event) =>
            event.id === selectedEvent.id
                ? { ...event, ...newEvent }
                : event
        );
        setEvents(updatedEvents);
        setSelectedEvent({ ...selectedEvent, ...newEvent });
        setIsEditing(false);
    };

    const handleToggleRegistrations = () => {
        const updatedEvents = events.map((event) =>
            event.id === selectedEvent.id
                ? { ...event, registrationsClosed: !event.registrationsClosed }
                : event
        );
        setEvents(updatedEvents);
        setSelectedEvent({
            ...selectedEvent,
            registrationsClosed: !selectedEvent.registrationsClosed,
        });
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

    return (
        <div className="flex bg-gray-900 text-white min-h-screen pt-16">
            {/* Sidebar (sticky & Full Height) */}
            <aside className="w-64 bg-gray-800 p-6 space-y-6 sticky h-screen top-16">
                <h1 className="text-2xl font-bold text-yellow-500">
                    Shristi Dashboard
                </h1>
                <nav className="space-y-4">
                    <Link
                        to="/"
                        className="flex items-center space-x-2 hover:text-yellow-500"
                    >
                        <FaUser /> <span>Profile</span>
                    </Link>
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
                    <Link
                        to="/settings"
                        className="flex items-center space-x-2 hover:text-yellow-500"
                    >
                        <FaCog /> <span>Settings</span>
                    </Link>
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
                                        type="text"
                                        name="venue"
                                        placeholder="Venue"
                                        value={newEvent.venue}
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
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                            {events.map((event) => (
                                <div
                                    key={event.id}
                                    className="bg-gray-800 p-4 rounded-lg cursor-pointer hover:bg-gray-700"
                                    onClick={() => handleEventClick(event.id)}
                                >
                                    <h4 className="text-xl font-bold">
                                        {event.name}
                                    </h4>
                                    <p className="text-gray-400">
                                        {event.date}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Selected Event Details */}
                    {selectedEvent && (
                        <section className="mt-6">
                            <h3 className="text-2xl font-semibold text-yellow-500">
                                {selectedEvent.name} - Registered Users
                            </h3>
                            <p className="text-gray-400">
                                Total Registered:{" "}
                                {selectedEvent.registeredUsers.length}
                            </p>
                            <p className="text-gray-400">Department: {selectedEvent.department}</p>
                            <p className="text-gray-400">Description: {selectedEvent.description}</p>
                            <p className="text-gray-400">Date: {selectedEvent.date}</p>
                            <p className="text-gray-400">Venue: {selectedEvent.venue}</p>
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
                                            type="text"
                                            name="venue"
                                            placeholder="Venue"
                                            value={newEvent.venue}
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
                                {selectedEvent.registeredUsers.map((user) => (
                                    <li
                                        key={user.id}
                                        className="bg-gray-800 p-4 rounded-lg"
                                    >
                                        <p className="font-semibold">
                                            {user.name}
                                        </p>
                                        <p className="text-gray-400">
                                            {user.email}
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
