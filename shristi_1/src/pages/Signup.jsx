import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [whatsappNumber, setWhatsappNumber] = useState("");
    const [isNeristian, setIsNeristian] = useState(false);
    const [department, setDepartment] = useState("");
    const [rollNumber, setRollNumber] = useState("");
    const [year, setYear] = useState("");
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
        if (whatsappNumber.length < 10) {
            alert("WhatsApp number must be at least 10 digits!");
            return;
        }

        // Set default values for non-NERISTIAN users
        const finalDepartment = isNeristian ? department : "N/A";
        const finalRollNumber = isNeristian ? rollNumber : "N/A";
        const finalYear = isNeristian ? year : "N/A";

        console.log(
            "Signing up with:",
            name,
            email,
            password,
            whatsappNumber,
            isNeristian ? { department: finalDepartment, rollNumber: finalRollNumber, year: finalYear } : {}
        );

        try {
            const res = await axios.post(
                `${
                    import.meta.env.VITE_API_URL || "http://localhost:5000/api"
                }/auth/signup`,
                {
                    name,
                    email,
                    password,
                    whatsappNumber,
                    isNeristian,
                    department: finalDepartment,
                    rollNumber: finalRollNumber,
                    year: finalYear,
                }
            );
            localStorage.setItem("token", res.data.token);
            navigate("/dashboard");
        } catch (err) {
            console.error(err);
        }
        // Add authentication logic here
    };

    return (
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white min-h-screen flex items-center justify-center px-6 py-30">
            <div className="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-md transform transition duration-500">
                <h2 className="text-4xl font-extrabold text-center mb-6 text-yellow-500">
                    Create an Account
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Password Input */}
                        <div>
                            <label className="block text-gray-400 font-medium">
                                Password
                            </label>
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
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                required
                            />
                        </div>
                    </div>

                    {/* WhatsApp Number Input */}
                    <div>
                        <label className="block text-gray-400 font-medium">
                            WhatsApp Number
                        </label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 mt-1 rounded-lg bg-gray-700 border border-gray-600 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500 outline-none text-gray-200 placeholder-gray-500"
                            placeholder="Enter your WhatsApp number"
                            value={whatsappNumber}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (/^\d*$/.test(value)) {
                                    setWhatsappNumber(value);
                                }
                            }}
                            required
                        />
                        {whatsappNumber && whatsappNumber.length != 10 && (
                            <p className="text-red-500 text-sm mt-1">
                                WhatsApp number must be 10 digits.
                            </p>
                        )}
                    </div>

                    {/* NERISTIAN Slide Toggle */}
                    <div className="flex items-center justify-between">
                        <label className="block text-gray-400 font-medium">Are you a NERISTIAN?</label>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={isNeristian}
                                onChange={(e) => setIsNeristian(e.target.checked)}
                            />
                            <div className="w-11 h-6 bg-gray-700 rounded-full peer-focus:ring-2 peer-focus:ring-yellow-500 peer-checked:bg-yellow-500 transition-colors">
                                <span
                                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                                        isNeristian ? "translate-x-5" : ""
                                    }`}
                                ></span>
                            </div>
                        </label>
                    </div>

                    {/* Additional Fields for NERISTIAN */}
                    {isNeristian && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-400 font-medium">
                                    Department
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 mt-1 rounded-lg bg-gray-700 border border-gray-600 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500 outline-none text-gray-200 placeholder-gray-500"
                                    placeholder="Enter your department"
                                    value={department}
                                    onChange={(e) =>
                                        setDepartment(e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 font-medium">
                                    Roll Number
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 mt-1 rounded-lg bg-gray-700 border border-gray-600 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500 outline-none text-gray-200 placeholder-gray-500"
                                    placeholder="Enter your roll number"
                                    value={rollNumber}
                                    onChange={(e) =>
                                        setRollNumber(e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 font-medium">
                                    Year
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 mt-1 rounded-lg bg-gray-700 border border-gray-600 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500 outline-none text-gray-200 placeholder-gray-500"
                                    placeholder="Enter your year"
                                    value={year}
                                    onChange={(e) => setYear(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    )}

                    {/* Signup Button */}
                    <button
                        type="submit"
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg"
                    >
                        Sign Up
                    </button>
                </form>

                {/* Login Link */}
                <p className="text-center text-gray-400 mt-6">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-yellow-500 hover:underline font-medium"
                    >
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
