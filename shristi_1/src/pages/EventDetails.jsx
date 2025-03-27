import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

// Dummy event data
const eventData = {
  "1": {
    title: "Hackathon",
    image: "/demo_2.jpg", // Updated poster
    description: "A 24-hour coding challenge to solve real-world problems using technology.",
    date: "March 10, 2025",
    time: "10:00 AM - 10:00 PM",
    venue: "Main Auditorium",
    rules: [
      "Team size: 2-4 members",
      "No plagiarism; originality is a must",
      "Judging based on innovation, execution, and impact",
    ],
    prizes: "₹50,000 cash prize + goodies",
  },
  "2": {
    title: "Robotics Challenge",
    image: "/demo_2.jpg", // Updated poster
    description: "A battle of autonomous and manual robots to complete various challenges.",
    date: "March 11, 2025",
    time: "12:00 PM - 4:00 PM",
    venue: "Tech Arena",
    rules: [
      "Robots must fit within size constraints",
      "No external human interference allowed",
      "Scoring based on speed, accuracy, and efficiency",
    ],
    prizes: "₹30,000 cash prize + certificates",
  },
};

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // State for full-screen image

  useEffect(() => {
    if (eventData[id]) {
      setEvent(eventData[id]);
    }
  }, [id]);

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
          <h1 className="text-4xl font-bold">{event.title}</h1>
          <p className="text-gray-300 mt-3">{event.description}</p>

          <div className="mt-5">
            <p><strong>Date:</strong> {event.date}</p>
            <p><strong>Time:</strong> {event.time}</p>
            <p><strong>Venue:</strong> {event.venue}</p>
          </div>

          <div className="mt-5">
            <h2 className="text-2xl font-semibold">Rules</h2>
            <ul className="list-disc list-inside text-gray-300">
              {event.rules.map((rule, index) => (
                <li key={index}>{rule}</li>
              ))}
            </ul>
          </div>

          <p className="text-lg mt-5"><strong>Prizes:</strong> {event.prizes}</p>

          <button className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-6 rounded-lg transition">
            Register Now
          </button>
        </div>
        <div className="lg:w-1/2 lg:pl-6 mt-6 lg:mt-0">
          <img
            src={event.image}
            alt={event.title}
            className="w-full object-contain rounded-lg cursor-pointer"
            onClick={() => setSelectedImage(event.image)} // Set image for full screen
          />
        </div>
      </div>

      {/* Full-Screen Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
          <div className="relative max-w-3xl w-full p-4">
            <button
              className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full text-xl flex items-center justify-center w-10 h-10 hover:bg-red-600 transition duration-300 cursor-pointer"
              onClick={() => setSelectedImage(null)} // Close modal
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

export default EventDetails;
