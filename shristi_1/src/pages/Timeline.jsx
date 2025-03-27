import axios from "axios";
import { useEffect, useState } from "react";

// const timelineData = [
//   { time: "10:00 AM", event: "Inauguration Ceremony", description: "Official opening of Shristi Tech Fest." },
//   { time: "11:00 AM", event: "Coding Challenge", description: "Intense competitive programming contest begins." },
//   { time: "2:00 PM", event: "Robotics Battle", description: "Watch the robots battle it out!" },
//   { time: "4:00 PM", event: "Tech Talk on AI", description: "A discussion on the future of AI & ML." },
//   { time: "6:00 PM", event: "Hackathon Kickoff", description: "Start of the 24-hour hackathon." },
//   { time: "9:00 AM (Day 2)", event: "Final Hackathon Pitches", description: "Teams present their projects." },
//   { time: "12:00 PM", event: "Closing Ceremony & Awards", description: "Winners announced and event concludes." },
// ];

const Timeline = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Dummy data to simulate past and future events
    const dummyEvents = [
      { time: "2023-10-01T10:00:00", event: "Inauguration Ceremony", description: "Official opening of Shristi Tech Fest." },
      { time: "2023-10-01T11:00:00", event: "Coding Challenge", description: "Intense competitive programming contest begins." },
      { time: "2023-10-01T14:00:00", event: "Robotics Battle", description: "Watch the robots battle it out!" },
      { time: "2023-10-01T16:00:00", event: "Tech Talk on AI", description: "A discussion on the future of AI & ML." },
      { time: "2023-10-01T18:00:00", event: "Hackathon Kickoff", description: "Start of the 24-hour hackathon." },
      { time: "2023-10-02T09:00:00", event: "Final Hackathon Pitches", description: "Teams present their projects." },
      { time: "2025-10-02T12:00:00", event: "Closing Ceremony & Awards", description: "Winners announced and event concludes." },
      { time: "2025-10-03T10:00:00", event: "Future Event 1", description: "A glimpse into the future of technology." }, // Future event
      { time: "2025-10-03T14:00:00", event: "Future Event 2", description: "Panel discussion on emerging trends." }, // Future event
      { time: "2025-10-03T18:00:00", event: "Future Event 3", description: "Networking session with industry leaders." }, // Future event
    ];
    setEvents(dummyEvents);
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
                >
                  <div
                    className={`w-1/2 ${
                      index % 2 === 0 ? "pr-6" : "pl-6"
                    }`}
                  >
                    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                      <h3 className="text-2xl font-bold">{item.event}</h3>
                      <p className="text-gray-400">{item.time}</p>
                      <p className="text-gray-300">{item.description}</p>
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
