import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignupIncharge = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [department, setDepartment] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
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
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        console.log("Signing up with:", name, email, password, department, phoneNumber);
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/incharge/signup`,
                { name, email, password, department, phoneNumber, role: "incharge" }
            );
            localStorage.setItem("token", res.data.token); localStorage.setItem("incharge", true);
            navigate("/ic/dashboard");
        } catch (err) {
            console.error(err);
        }
        // Add authentication logic here
    };

    return (
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white min-h-screen flex items-center justify-center px-6 py-30">
            <div className="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-md transform transition duration-500">
                <h2 className="text-4xl font-extrabold text-center mb-6 text-yellow-500">
                    Create a Shristi Incharge Account
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Name Input */}
                        <div>
                            <label className="block text-gray-400 font-medium">Full Name</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 mt-1 rounded-lg bg-gray-700 border border-gray-600 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500 outline-none text-gray-200 placeholder-gray-500"
                                placeholder="Enter your full name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

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
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Password Input */}
                        <div>
                            <label className="block text-gray-400 font-medium">Password</label>
                            <input
                                type="password"
                                className="w-full px-4 py-2 mt-1 rounded-lg bg-gray-700 border border-gray-600 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500 outline-none text-gray-200 placeholder-gray-500"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        {/* Confirm Password Input */}
                        <div>
                            <label className="block text-gray-400 font-medium">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                className="w-full px-4 py-2 mt-1 rounded-lg bg-gray-700 border border-gray-600 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500 outline-none text-gray-200 placeholder-gray-500"
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* Department Input */}
                    <div>
                        <label className="block text-gray-400 font-medium">Department</label>
                        <select
                            className="w-full px-4 py-2 mt-1 pr-8 rounded-lg bg-gray-700 border border-gray-600 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500 outline-none appearance-none text-gray-200"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            required
                        >
                            <option value="" disabled>Select your department</option>
                            <option value="CSE">CSE</option>
                            <option value="ECE">ECE</option>
                            <option value="EE">EE</option>
                            <option value="AE">AE</option>
                            <option value="ME">ME</option>
                            <option value="CE">CE</option>
                        </select>
                    </div>

                    {/* Phone Number Input */}
                    <div>
                        <label className="block text-gray-400 font-medium">Phone Number</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 mt-1 rounded-lg bg-gray-700 border border-gray-600 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500 outline-none text-gray-200 placeholder-gray-500"
                            placeholder="Enter your phone number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                        />
                    </div>

                    {/* Signup Button */}
                    <button
                        type="submit"
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg"
                    >
                        Incharge Sign Up
                    </button>
                </form>

                {/* Login Link */}
                <p className="text-center text-gray-400 mt-6">
                    Already have an account?{" "}
                    <Link
                        to="/ic/login"
                        className="text-yellow-500 hover:underline font-medium"
                    >
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignupIncharge;
