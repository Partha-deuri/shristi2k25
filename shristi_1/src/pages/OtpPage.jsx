import { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify"; // Import toast

const OtpPage = () => {
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const inputRefs = useRef([]);
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email;

    const handleChange = (e, index) => {
        const value = e.target.value;
        if (/^[0-9]?$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Move to the next input field
            if (value && index < 5) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const otpValue = otp.join("");
        if (otpValue.length === 6) {
            const otpId = location.state?.otpId;
            if (!otpId) {
                alert("OTP ID not found. Please try again.");
                return;
            }
            try {
                // Verify OTP
                const otpRes = await axios.post(
                    `${
                        import.meta.env.VITE_API_URL ||
                        "http://localhost:5000/api"
                    }/mail/otp`,
                    { email, otpId, otp: otpValue }
                );
                if (otpRes.status !== 200) {
                    alert("Invalid OTP. Please try again.");
                    return;
                }
                toast.success("OTP verified successfully!"); // Show success toast
                // Create user after OTP verification
                const userData = location.state?.userData;
                if (userData.role === "incharge") {
                    const icRes = await axios.post(
                        `${
                            import.meta.env.VITE_API_URL ||
                            "http://localhost:5000/api"
                        }/ic/signup`,
                        userData
                    );
                    localStorage.setItem("token", icRes.data.token);
                    localStorage.setItem("incharge", true);

                    // alert("Account created successfully!");
                    navigate("/ic/dashboard");
                } else {
                    const userRes = await axios.post(
                        `${
                            import.meta.env.VITE_API_URL ||
                            "http://localhost:5000/api"
                        }/auth/signup`,
                        userData
                    );

                    localStorage.setItem("token", userRes.data.token);
                    // alert("Account created successfully!");
                    navigate("/dashboard");
                }
            } catch (err) {
                console.error(err);
                alert(err?.response?.data?.msg || "An error occurred. Please try again.");
                if(err?.response?.data?.msg === 'otp expired')
                  navigate('/signup')
            }
        } else {
            alert("Please enter a 6-character OTP.");
        }
    };

    return (
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white min-h-screen flex items-center justify-center px-6">
            <div className="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-md">
                <h2 className="text-4xl font-extrabold text-center mb-6 text-yellow-500">
                    Enter OTP
                </h2>
                <p className="text-center text-gray-400 mb-6">
                    Please enter the 6-digit OTP sent to your email
                </p>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex justify-center space-x-2">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                type="text"
                                value={digit}
                                onChange={(e) => handleChange(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                maxLength="1"
                                ref={(el) => (inputRefs.current[index] = el)}
                                className="w-12 h-12 text-center text-xl font-bold rounded-lg bg-gray-700 border border-gray-600 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500 outline-none text-gray-200 placeholder-gray-500"
                            />
                        ))}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default OtpPage;
