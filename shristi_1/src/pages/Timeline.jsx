import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Added import for navigation

const Timeline = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/events`
        );
        const sortedEvents = response.data.sort((a, b) => {
          const dateTimeA = new Date(`${a.date}T${a.time}`);
          const dateTimeB = new Date(`${b.date}T${b.time}`);
          return dateTimeA - dateTimeB;
        }); // Sort events by combined date and time
        setEvents(sortedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <main className="flex-grow pt-16 px-6">
        {/* Header Section */}
        <section className="text-center py-10">
          <h1 className="text-5xl font-bold mb-4">Event Timeline</h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Stay updated with the schedule of Shristi Tech Fest.
          </p>
        </section>

        {/* Timeline Section */}
        <section className="max-w-3xl mx-auto py-10 relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full">
            {events.map((item, index) => {
              const isPast = new Date(item.time) < new Date();
              return (
                <div
                  key={index}
                  className={`border-l-4 ${
                    isPast ? "border-green-500" : "border-yellow-500"
                  }`}
                  style={{
                    height: "10rem", // Adjust height for each segment
                    position: "absolute",
                    top: `${index * 10}rem`, // Position each segment dynamically
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                ></div>
              );
            })}
          </div>
          <div className="space-y-8">
            {events.map((item, index) => {
              const isPast = new Date(item.time) < new Date();
              return (
                <div
                  key={index}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? "justify-start" : "justify-end"
                  }`}
                  onClick={() => navigate(`/event/${item._id}`)} // Added click handler
                  style={{ cursor: "pointer" }} // Added pointer cursor
                >
                  <div
                    className={`w-1/2 ${
                      index % 2 === 0 ? "pr-6" : "pl-6"
                    }`}
                  >
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                      <h3 className="text-2xl font-bold">{item.name}</h3>
                      <p className="text-gray-400">
                        {new Date(`1970-01-01T${item.time}`).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true, // Use 12-hour format
                        })}
                      </p>
                      <p className="text-gray-400">
                        {new Date(item.date).toLocaleString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`absolute w-4 h-4 rounded-full left-1/2 transform -translate-x-1/2 ${
                      isPast ? "bg-green-500" : "bg-yellow-500"
                    }`}
                  ></div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Timeline;
