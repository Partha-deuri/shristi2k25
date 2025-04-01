import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const IcEventDetails = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        date: "",
        time: "",
        venue: "",
        prizes: "",
        rules: "",
    });
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const [registrationsClosed, setRegistrationsClosed] = useState(false); // State for registration pause

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem("token");
                if (!token) navigate("/login");

                const res = await axios.get(
                    `${
                        import.meta.env.VITE_API_URL ||
                        "http://localhost:5000/api" 
                    }/events/ic/${id}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setEvent(res.data);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch event details.");
            } finally {
                setLoading(false);
            }
        };

        fetchEventDetails();
    }, [id, navigate]);

    useEffect(() => {
        if (event) {
            setFormData({
                name: event.name,
                description: event.description,
                date: event.date.split("T")[0], // Format date to YYYY-MM-DD
                time: event.time,
                venue: event.venue,
                prizes: event.prizes,
                rules: event.rules,
            });
        }
    }, [event]);

    useEffect(() => {
        if (event) {
            const eventDateTime = new Date(`${event.date}T${event.time}`);
            const now = new Date();
            if (now > eventDateTime) {
                setRegistrationsClosed(true); // Automatically pause registrations after event date and time
            }
        }
    }, [event]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) navigate("/login");

            await axios.put(
                `${
                    import.meta.env.VITE_API_URL || "http://localhost:5000/api"
                }/events/${id}`,
                formData,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setIsEditing(false);
            alert("Event updated successfully!");
            window.location.reload();
        } catch (err) {
            console.error(err);
            alert("Failed to update the event. Please try again.");
        }
    };

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) navigate("/login");

            await axios.delete(
                `${
                    import.meta.env.VITE_API_URL || "http://localhost:5000/api"
                }/events/${id}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            navigate("/ic/dashboard"); // Redirect to events list after deletion
        } catch (err) {
            console.error(err);
            alert("Failed to delete the event. Please try again.");
        }
    };

    const toggleRegistration = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) navigate("/login");

            await axios.put(
                `${
                    import.meta.env.VITE_API_URL || "http://localhost:5000/api"
                }/events/${id}`,
                { registrationsClosed: !registrationsClosed },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setRegistrationsClosed(!registrationsClosed);
            alert(
                `Registrations have been ${
                    registrationsClosed ? "resumed" : "paused"
                } successfully!`
            );
        } catch (err) {
            console.error(err);
            alert("Failed to update registration status. Please try again.");
        }
    };

    if (loading) {
        return (
            <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-2xl font-semibold">
                        Loading event details...
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

    if (!event) {
        return (
            <div className="text-white text-center mt-20 text-2xl">
                Event not found. Please check the event list.
            </div>
        );
    }

    return (
        <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center px-6 py-10 mt-16">
            <div className="max-w-6xl bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col lg:flex-row">
                <div className="lg:w-1/2 lg:pr-6">
                    <h1 className="text-4xl font-bold">{event.name}</h1>
                    <p className="text-gray-300 mt-3">{event.description}</p>

                    <div className="mt-5">
                        <p>
                            <strong>Date:</strong>{" "}
                            {new Date(event.date).toLocaleDateString()}
                        </p>
                        <p>
                            <strong>Time:</strong>{" "}
                            {new Date(
                                `1970-01-01T${event.time}`
                            ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                            })}
                        </p>
                        <p>
                            <strong>Venue:</strong> {event.venue}
                        </p>
                        <p>
                            <strong>Department:</strong>{" "}
                            {event.department || "N/A"}
                        </p>{" "}
                        {/* Display department */}
                    </div>

                    <div className="mt-5">
                        <h2 className="text-2xl font-semibold">Rules</h2>
                        <ul className="list-disc list-inside text-gray-300">
                            {event?.rules[0] 
                                ? event.rules[0].split("\n").map((rule, index) => (
                                    <li key={index}>{rule}</li>
                                  ))
                                : <li>No rules available</li>}
                        </ul>
                    </div>

                    <div className="text-lg mt-5">
                        <strong>Prizes:</strong>{" "}
                        {event.prizes && typeof event.prizes === "string" ? (
                            <ul className="list-disc list-inside text-gray-300">
                                {event.prizes
                                    .split("\n")
                                    .map((prize, index) => (
                                        <li key={index}>{prize}</li>
                                    ))}
                            </ul>
                        ) : (
                            "No prizes available"
                        )}
                    </div>

                    <div className="mt-5 flex gap-4">
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                        >
                            {isEditing ? "Cancel" : "Edit Event"}
                        </button>
                        <button
                            onClick={handleDelete}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                        >
                            Delete Event
                        </button>
                        <button
                            onClick={toggleRegistration}
                            className={`${
                                registrationsClosed
                                    ? "bg-yellow-500"
                                    : "bg-green-500"
                            } text-white px-4 py-2 rounded hover:${
                                registrationsClosed
                                    ? "bg-yellow-600"
                                    : "bg-green-600"
                            } transition`}
                        >
                            {registrationsClosed
                                ? "Resume Registrations"
                                : "Pause Registrations"}
                        </button>
                    </div>

                    {isEditing && (
                        <div className="mt-5 bg-gray-800 p-6 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-semibold mb-4">
                                Edit Event
                            </h2>
                            <form>
                                <div className="mb-4">
                                    <label className="block text-gray-300">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full p-2 rounded bg-gray-700 text-white"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-300">
                                        Description
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        className="w-full p-2 rounded bg-gray-700 text-white"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-300">
                                        Date
                                    </label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleInputChange}
                                        className="w-full p-2 rounded bg-gray-700 text-white"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-300">
                                        Time
                                    </label>
                                    <input
                                        type="time"
                                        name="time"
                                        value={formData.time}
                                        onChange={handleInputChange}
                                        className="w-full p-2 rounded bg-gray-700 text-white"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-300">
                                        Venue
                                    </label>
                                    <input
                                        type="text"
                                        name="venue"
                                        value={formData.venue}
                                        onChange={handleInputChange}
                                        className="w-full p-2 rounded bg-gray-700 text-white"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-300">
                                        Prizes
                                    </label>
                                    <textarea
                                        name="prizes"
                                        value={formData.prizes}
                                        onChange={handleInputChange}
                                        placeholder="Prizes (one per line)"
                                        className="w-full p-2 rounded bg-gray-700 text-white"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-300">
                                        Rules
                                    </label>
                                    <textarea
                                        name="rules"
                                        value={formData.rules}
                                        onChange={handleInputChange}
                                        className="w-full p-2 rounded bg-gray-700 text-white"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={handleSave}
                                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                                >
                                    Save Changes
                                </button>
                            </form>
                        </div>
                    )}
                </div>
                <div className="lg:w-1/2 lg:pl-6 mt-6 lg:mt-0">
                    {event.imagePath && (
                        <img
                            src={event.imagePath}
                            alt={event.name}
                            className="w-full object-contain rounded-lg cursor-pointer"
                            onClick={() => setSelectedImage(event.imagePath)}
                        />
                    )}
                </div>
            </div>

            <div className="w-full bg-gray-800 p-6 rounded-lg shadow-lg mt-10 flex flex-col">
                <h2 className="text-2xl font-semibold mb-4">
                    Registered Users
                </h2>
                {event?.registrations?.length > 0 ? (
                    <div>
                        <p className="text-lg mb-4">
                            Total Registered Users:{" "}
                            <strong>{event?.registrations?.length || 0}</strong>
                        </p>
                        <ul className="list-disc list-inside text-gray-300">
                            {event?.registrations?.map((user, index) => (
                                <li key={index}>
                                    {user.name} ({user.email}){" - "}
                                    {user.whatsappNumber || "N/A"}
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p className="text-gray-300">
                        No users have registered for this event yet.
                    </p>
                )}
            </div>

            {selectedImage && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
                    <div className="relative max-w-3xl w-full p-4">
                        <button
                            className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full text-xl flex items-center justify-center w-10 h-10 hover:bg-red-600 transition duration-300 cursor-pointer"
                            onClick={() => setSelectedImage(null)}
                        >
                            ✕
                        </button>
                        <img
                            src={selectedImage}
                            alt="Selected"
                            className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default IcEventDetails;
