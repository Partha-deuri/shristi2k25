import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    FaCalendarAlt,
    FaBell,
    FaSignOutAlt,
    FaChevronDown,
} from "react-icons/fa";
import axios from "axios";

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to toggle sidebar visibility
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) navigate("/login");
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
                    }/dashboard/user`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setUser(userRes.data);

                const notificationsRes = await axios.get(
                    `${
                        import.meta.env.VITE_API_URL ||
                        "http://localhost:5000/api"
                    }/dashboard/notifications`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setNotifications(notificationsRes.data);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch dashboard data.");
            } finally {
                const ic = localStorage.getItem("incharge");
                if (ic) {
                    navigate("/ic/dashboard");
                } // Redirect to login page on error
                setLoading(false);
            }
        };

        fetchData();
    }, [navigate]);
    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove token from localStorage
        navigate("/login"); // Redirect to login page
    };

    if (loading) {
        return (
            <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-2xl font-semibold">
                        Loading dashboard...
                    </p>
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
                <h1 className="text-xl font-bold text-yellow-500">Shristi Dashboard</h1>
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="text-white focus:outline-none"
                >
                    <FaChevronDown size={24} />
                </button>
            </nav>

            {/* Sidebar (hidden on smaller devices) */}
            <aside
                className={`w-64 bg-gray-800 p-6 space-y-6 fixed top-32 left-0 h-screen transform ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                } transition-transform duration-300 md:translate-x-0 md:sticky md:top-16`}
            >
                <h1 className="text-2xl font-bold text-yellow-500">Shristi Dashboard</h1>
                <nav className="space-y-4">
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
                    <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 text-red-500 hover:text-red-700 w-full"
                    >
                        <FaSignOutAlt /> <span>Logout</span>
                    </button>
                </nav>
            </aside>

            {/* Main Content Wrapper */}
            <div className="flex-1 min-h-screen">
                <main className="p-8 mt-32 md:mt-0">
                    <h2 className="text-3xl font-bold">
                        Welcome, {user?.name} 👋
                    </h2>
                    <p className="text-gray-400">{user?.email}</p>

                    {/* Registered Events Section */}
                    <section className="mt-6">
                        <h3 className="text-2xl font-semibold text-yellow-500">
                            Registered Events
                        </h3>
                        {user?.registeredEvents?.length > 0 ? (
                            <ul className="mt-3 space-y-2">
                                {user?.registeredEvents?.map((event) => (
                                    <li
                                        key={event._id}
                                        className="bg-gray-800 p-4 rounded-lg cursor-pointer hover:bg-gray-700"
                                        onClick={() =>
                                            navigate(`/event/${event._id}`)
                                        } // Navigate to event details page
                                    >
                                        <p className="font-semibold">
                                            {event.name}
                                        </p>
                                        <p className="text-gray-400">
                                            <strong>Date:</strong>{" "}
                                            {new Date(
                                                event.date
                                            ).toLocaleDateString()}
                                        </p>
                                        <p className="text-gray-400">
                                            <strong>Time:</strong>{" "}
                                            {new Date(
                                                `1970-01-01T${event.time}`
                                            ).toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                                hour12: true,
                                            })}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-400 mt-2">
                                {"You haven't registered for any events yet."}
                            </p>
                        )}
                    </section>

                    {/* Notifications Section */}
                    <section className="mt-6">
                        <h3 className="text-2xl font-semibold text-yellow-500">
                            Notifications
                        </h3>
                        {notifications.length > 0 ? (
                            <ul className="mt-3 space-y-2">
                                {notifications?.map((notification, index) => (
                                    <li
                                        key={index}
                                        className="bg-gray-800 p-4 rounded-lg"
                                    >
                                        {notification}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-400 mt-2">
                                No new notifications.
                            </p>
                        )}
                    </section>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
