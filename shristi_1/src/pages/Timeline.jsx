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
    const fetchEvents = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/events');
        setEvents(res.data);
      } catch (err) {
        console.error(err);
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
        <section className="max-w-3xl mx-auto py-10">
          <div className="border-l-4 border-yellow-500 pl-6 space-y-8">
            {events.map((item, index) => (
              <div key={index} className="relative">
                <div className="absolute -left-6 top-1 w-4 h-4 bg-yellow-500 rounded-full"></div>
                <h3 className="text-2xl font-bold">{item.event}</h3>
                <p className="text-gray-400">{item.time}</p>
                <p className="text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Timeline;
