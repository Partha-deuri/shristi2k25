import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import logo from "/logo_circle.png"; // Import the logo

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);
    // const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            checkloggedin();
        }, 5000);

        return () => clearInterval(interval); // Cleanup on unmount
         
    }, []);

    const checkloggedin = async () => {
        try {
            const token = localStorage.getItem("token");
            if (token) {
                const userRes = await axios.get(
                    `${
                        import.meta.env.VITE_API_URL ||
                        "http://localhost:5000/api"
                    }/dashboard/userpic`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setUser(userRes.data);
            } else {
                setUser(null); // Clear user if no token
            }
        } catch (err) {
            console.error(err);
            if (err.response && err.response.status === 400) {
                setUser(null); // Clear user on unauthorized error
                localStorage.removeItem("token");
            }
            // navigate("/login"); // Redirect to login on error
        }
    };
    return (
        <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-indigo-800 via-purple-700 to-indigo-800 text-white shadow-lg z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
                <Link to="/" className="flex items-center text-2xl font-bold">
                    <img src={logo} alt="Shristi Logo" className="h-10 mr-2" />{" "}
                    {/* Add logo */}
                    Shristi
                </Link>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden"
                >
                    ☰
                </button>

                {/* Navigation Links */}
                <div
                    className={`absolute md:static 0 md:flex space-x-6 top-16 left-0 w-full md:w-auto transition-all font-bold ${
                        isOpen ? "block" : "hidden"
                    }`}
                >
                    <Link
                        to="/"
                        className="block py-2 px-4 bg-transparent rounded-lg hover:bg-indigo-600 hover:scale-105 transition-transform"
                    >
                        Home
                    </Link>
                    <Link
                        to="/events"
                        className="block py-2 px-4 bg-transparent rounded-lg hover:bg-indigo-600 hover:scale-105 transition-transform"
                    >
                        Events
                    </Link>
                    <Link
                        to="/timeline"
                        className="block py-2 px-4 bg-transparent rounded-lg hover:bg-indigo-600 hover:scale-105 transition-transform"
                    >
                        Timeline
                    </Link>
                    <Link
                        to="/photos"
                        className="block py-2 px-4 bg-transparent rounded-lg hover:bg-indigo-600 hover:scale-105 transition-transform"
                    >
                        Photos
                    </Link>
                    <Link
                        to="/sponsors"
                        className="block py-2 px-4 bg-transparent rounded-lg hover:bg-indigo-600 hover:scale-105 transition-transform"
                    >
                        Sponsors
                    </Link>
                    <Link
                        to="/developers"
                        className="block py-2 px-4 bg-transparent rounded-lg hover:bg-indigo-600 hover:scale-105 transition-transform"
                    >
                        Developers
                    </Link>
                    <Link
                        to="https://tedxnerist.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block py-2 px-4 bg-transparent rounded-lg border-2 border-red-600 hover:bg-red-500 hover:scale-105 transition-transform"
                    >
                        TEDxNERIST
                    </Link>

                    {!user && (
                        <Link
                            to="/login"
                            className="block py-2 px-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold rounded-lg shadow-md hover:from-yellow-500 hover:to-yellow-600 hover:scale-105 transition-transform"
                        >
                            Login
                        </Link>
                    )}
                    {user != null && (
                        <Link
                            to="/dashboard"
                            className="text-2xl font-extrabold flex justify-center items-center py-1 px-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black rounded-full shadow-md hover:from-yellow-500 hover:to-yellow-600 hover:scale-105 transition-transform"
                        >
                            {user?.trim()[0]}
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
