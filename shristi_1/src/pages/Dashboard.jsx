import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaCalendarAlt, FaBell, FaSignOutAlt, FaCog } from "react-icons/fa";
import axios from "axios";

const Dashboard = () => {
  // const [user] = useState({
  //   name: "John Doe",
  //   email: "john.doe@example.com",
  //   registeredEvents: [
  //     { id: 1, name: "Hackathon", date: "March 10, 2025" },
  //     { id: 2, name: "Robotics Challenge", date: "March 11, 2025" },
  //   ],
  //   notifications: ["Hackathon registration confirmed!", "New event added: AI Workshop!"],
  // });
  const [user,setUser] = useState(null);
  // const [events, setEvents] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) navigate('/login');

        const userRes = await axios.get('http://localhost:5000/api/dashboard/user', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(userRes.data);

        // const eventsRes = await axios.get('http://localhost:5000/api/dashboard/events', {
        //   headers: { Authorization: `Bearer ${token}` },
        // });
        // setEvents(eventsRes.data);

        const notificationsRes = await axios.get('http://localhost:5000/api/dashboard/notifications', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotifications(notificationsRes.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [navigate]);
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="flex bg-gray-900 text-white min-h-screen pt-16">
      {/* Sidebar (sticky & Full Height) */}
      <aside className="w-64 bg-gray-800 p-6 space-y-6 sticky h-screen top-16">
        <h1 className="text-2xl font-bold text-yellow-500">Shristi Dashboard</h1>
        <nav className="space-y-4">
          <Link to="/" className="flex items-center space-x-2 hover:text-yellow-500">
            <FaUser /> <span>Profile</span>
          </Link>
          <Link to="/events" className="flex items-center space-x-2 hover:text-yellow-500">
            <FaCalendarAlt /> <span>Events</span>
          </Link>
          <Link to="/timeline" className="flex items-center space-x-2 hover:text-yellow-500">
            <FaBell /> <span>Timeline</span>
          </Link>
          <Link to="/settings" className="flex items-center space-x-2 hover:text-yellow-500">
            <FaCog /> <span>Settings</span>
          </Link>
          <button onClick={handleLogout} className="flex items-center space-x-2 text-red-500 hover:text-red-700 w-full">
            <FaSignOutAlt /> <span>Logout</span>
          </button>
        </nav>
      </aside>

      {/* Main Content Wrapper (No More Overlap) */}
      <div className="flex-1 min-h-screen ">
        <main className="p-8">
          <h2 className="text-3xl font-bold">Welcome, {user?.name} 👋</h2>
          <p className="text-gray-400">{user?.email}</p>

          {/* Registered Events Section */}
          <section className="mt-6">
            <h3 className="text-2xl font-semibold text-yellow-500">Registered Events</h3>
            {user?.registeredEvents?.length > 0 ? (
              <ul className="mt-3 space-y-2">
                {user?.registeredEvents?.map((event) => (
                  <li key={event.id} className="bg-gray-800 p-4 rounded-lg">
                    <p className="font-semibold">{event.name}</p>
                    <p className="text-gray-400">{event.date}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400 mt-2">{"You haven't registered for any events yet."}</p>
            )}
          </section>

          {/* Notifications Section */}
          <section className="mt-6">
            <h3 className="text-2xl font-semibold text-yellow-500">Notifications</h3>
            {notifications.length > 0 ? (
              <ul className="mt-3 space-y-2">
                {notifications.map((notification, index) => (
                  <li key={index} className="bg-gray-800 p-4 rounded-lg">{notification}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400 mt-2">No new notifications.</p>
            )}
          </section>
        </main>

      </div>
    </div>
  );
};

export default Dashboard;
