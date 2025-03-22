import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const [user, setUser] = useState(null);

    useEffect(() => {
        checkloggedin();
    }, []);

    const checkloggedin = async () => {
        try {
            const token = localStorage.getItem("token");
            if (token) {
                const userRes = await axios.get(
                    `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/dashboard/userpic`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setUser(userRes.data);
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <nav className="fixed top-0 left-0 w-full bg-indigo-700 text-white shadow-lg z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
                <Link to="/" className="text-2xl font-bold">
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
                    className={`absolute md:static bg-indigo-700 md:flex space-x-6 top-16 left-0 w-full md:w-auto transition-all ${
                        isOpen ? "block" : "hidden"
                    }`}
                >
                    <Link
                        to="/"
                        className="block py-2 px-4 hover:bg-indigo-600"
                    >
                        Home
                    </Link>
                    <Link
                        to="/events"
                        className="block py-2 px-4 hover:bg-indigo-600"
                    >
                        Events
                    </Link>
                    <Link
                        to="/timeline"
                        className="block py-2 px-4 hover:bg-indigo-600"
                    >
                        Timeline
                    </Link>
                    <Link
                        to="/photos"
                        className="block py-2 px-4 hover:bg-indigo-600"
                    >
                        Photos
                    </Link>
                    <Link
                        to="/sponsors"
                        className="block py-2 px-4 hover:bg-indigo-600"
                    >
                        Sponsors
                    </Link>
                    <Link
                        to="/developers"
                        className="block py-2 px-4 hover:bg-indigo-600"
                    >
                        Developers
                    </Link>

                    {!user && (
                        <Link
                            to="/login"
                            className="block py-2 px-4 bg-yellow-500 rounded-lg hover:bg-yellow-400"
                        >
                            Login
                        </Link>
                    )}
                    {user && (
                        <Link
                            to="/dashboard"
                            className="text-2xl font-extrabold flex justify-center items-center py-1 px-3 bg-yellow-500 rounded-full hover:bg-yellow-400"
                        >{user.trim()[0]}</Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
