import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginIncharge = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [backendError, setBackendError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        checkloggedin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const checkloggedin = async () => {
        try {
            const token = localStorage.getItem("token");
            if (token) navigate("/ic/dashboard");
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setBackendError(""); // Clear previous backend error
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/incharge/login`,
                { email, password }
            );
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("incharge", true);
            navigate("/ic/dashboard");
        } catch (err) {
            console.error(err);
            const errorMessage = err.response?.data?.message || "An error occurred. Please try again.";
            setBackendError(errorMessage);
            toast.error(errorMessage); // Show toast notification
        }
    };

    return (
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white min-h-screen flex items-center justify-center px-6 py-30">
            <div className="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-md transform transition duration-500 mt-12">
                <h2 className="text-4xl font-extrabold text-center mb-6 text-yellow-500">
                    Login to Shristi Incharges
                </h2>
                {backendError && (
                    <p className="text-red-500 text-center mb-4">{backendError}</p>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email Input */}
                    <div>
                        <label className="block text-gray-400 font-medium">Email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 mt-1 rounded-lg bg-gray-700 border border-gray-600 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500 outline-none text-gray-200 placeholder-gray-500"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                    </div>

                    {/* Password Input */}
                    <div>
                        <label className="block text-gray-400">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 mt-1 rounded-lg bg-gray-700 border border-gray-600 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500 outline-none"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                        )}
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg"
                    >
                        Incharge Login
                    </button>
                </form>

                {/* Signup Link */}
                <p className="text-center text-gray-400 mt-6">
                    {"Don't have an account? "}
                    <Link
                        to="/ic/signup"
                        className="text-yellow-500 hover:underline font-medium"
                    >
                        Sign up here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginIncharge;
