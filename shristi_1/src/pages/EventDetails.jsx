import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import styles for toast

const EventDetails = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null); // State for full-screen image
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const [isRegistered, setIsRegistered] = useState(false); // State to track registration status
    const [registrationClosed, setRegistrationClosed] = useState(false); // State for registration status
    const navigate = useNavigate(); // Hook to navigate to different routes
    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `${
                        import.meta.env.VITE_API_URL ||
                        "http://localhost:5000/api"
                    }/events/${id}`
                );
                setEvent(response.data);
                setRegistrationClosed(response.data.registrationsClosed); // Set registration status

                // Check if user is already registered
                const token = localStorage.getItem("token");
                if (token) {
                    const registrationResponse = await axios.get(
                        `${
                            import.meta.env.VITE_API_URL ||
                            "http://localhost:5000/api"
                        }/events/${id}/is-registered`,
                        { headers: { Authorization: `Bearer ${token}` } }
                    );
                    setIsRegistered(registrationResponse.data.isRegistered);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEventDetails();

        window.scrollTo(0, 0); // Scroll to the top when the component is mounted
    }, [id]);

    const handleRegister = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                toast.warn("Please log in to register for the event."); // Replace alert
                navigate("/login"); // Redirect to login page
                return;
            }
            const response = await axios.post(
                `${
                    import.meta.env.VITE_API_URL || "http://localhost:5000/api"
                }/events/${id}/register`,
                {}, // Empty body
                { headers: { Authorization: `Bearer ${token}` } } // Include token
            );
            console.log(response);
            if (response.status === 200) {
                toast.success("Registered successfully!"); // Replace alert
                setIsRegistered(true); // Update registration status
            } else {
                toast.error("Registration failed. Please try again."); // Replace alert
            }
        } catch (err) {
            toast.error("Registration failed. Please try again."); // Replace alert
            console.log(err); 
        }
    };

    if (loading) {
        return (
            <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-2xl font-semibold">Loading event details...</p>
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
        <div className="pt-16 transition-all duration-300 ease-in-out"> {/* Added smooth transition */}
            <div className="pt-12 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white min-h-screen p-6">
                <div className="max-w-6xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col lg:flex-row">
                    <div className="lg:w-1/2 lg:pr-6">
                        <h1 className="text-5xl font-bold text-yellow-500">{event.name}</h1>
                        <p className="text-lg text-gray-300 mt-3">{event.description}</p>

                        <div className="mt-5">
                            <p>
                                <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
                            </p>
                            <p>
                                <strong>Time:</strong>{" "}
                                {new Date(`1970-01-01T${event.time}`).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true,
                                })}
                            </p>
                            <p>
                                <strong>Venue:</strong> {event.venue}
                            </p>
                        </div>

                        <div className="mt-5">
                            <h2 className="text-3xl font-semibold text-purple-400">Rules</h2>
                            <ul className="list-disc list-inside text-gray-300">
                                {event?.rules[0]
                                    ? event.rules[0].split("\n").map((rule, index) => (
                                        <li key={index}>{rule}</li>
                                      ))
                                    : <li>No rules available</li>}
                            </ul>
                        </div>

                        <div className="text-lg mt-5">
                            <h2 className="text-3xl font-semibold text-green-400">Prizes</h2>
                            {event.prizes && typeof event.prizes === "string" ? (
                                <ul className="list-disc list-inside text-gray-300">
                                    {event.prizes.split("\n").map((prize, index) => (
                                        <li key={index}>{prize}</li>
                                    ))}
                                </ul>
                            ) : (
                                "No prizes available"
                            )}
                        </div>

                        <div className="mt-8 text-center">
                            <button
                                className={`${
                                    registrationClosed
                                        ? "bg-gray-500 cursor-not-allowed"
                                        : isRegistered
                                        ? "bg-gray-500 cursor-not-allowed"
                                        : "bg-yellow-500 hover:bg-yellow-600"
                                } text-black font-bold py-2 px-6 rounded-lg transition-all duration-300`}
                                onClick={registrationClosed ? null : handleRegister}
                                disabled={registrationClosed || isRegistered}
                            >
                                {registrationClosed
                                    ? "Registrations Closed"
                                    : isRegistered
                                    ? "Already Registered"
                                    : "Register Now"}
                            </button>
                        </div>
                    </div>
                    <div className="lg:w-1/2 lg:pl-6 mt-6 lg:mt-0">
                        <img
                            src={event.imagePath}
                            alt={event.title}
                            className="w-full object-contain rounded-lg cursor-pointer"
                            onClick={() => setSelectedImage(event.imagePath)} // Ensure correct image path is set
                        />
                    </div>
                </div>

                {/* Full-Screen Image Modal */}
                {selectedImage && (
                    <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50">
                        <div className="relative w-full h-full flex justify-center items-center">
                            <button
                                className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full text-xl flex items-center justify-center w-10 h-10 hover:bg-red-600 transition duration-300 cursor-pointer"
                                onClick={() => setSelectedImage(null)} // Close modal
                            >
                                ✕
                            </button>
                            <img
                                src={selectedImage}
                                alt="Selected"
                                className="w-auto h-auto max-w-full max-h-full object-contain rounded-lg"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventDetails;
