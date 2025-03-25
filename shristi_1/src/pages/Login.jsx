import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");

    // const handleSubmit = (e) => {
    //   e.preventDefault();
    //   console.log("Logging in with:", email, password);
    //   // Add authentication logic here
    // };
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        checkloggedin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const checkloggedin = async () => {
        try {
            const token = localStorage.getItem("token");
            if (token) navigate("/dashboard");
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/auth/login`,
                { email, password }
            );
            // console.log(res.data);
            localStorage.setItem("token", res.data.token);
            navigate("/dashboard");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center px-6">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-center mb-6">
                    Login to Shristi
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email Input */}
                    <div>
                        <label className="block text-gray-400">Email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 mt-1 rounded-lg bg-gray-700 border border-gray-600 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500 outline-none"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
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
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 rounded-lg transition"
                    >
                        Login
                    </button>
                </form>

                {/* Signup Link */}
                <p className="text-center text-gray-400 mt-4">
                    {"Don't have an account? "}
                    <Link
                        to="/signup"
                        className="text-yellow-500 hover:underline"
                    >
                        Sign up here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
