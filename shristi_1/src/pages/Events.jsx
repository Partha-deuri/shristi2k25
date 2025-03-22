import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

// const eventsDa [
//   {
//     id: 1,
//     name: "Coding Challenge",
//     description: "Showcase your programming skills in an intense coding battle.",
//     image: "/images/coding.jpg",
//   },
//   {
//     id: 2,
//     name: "Robotics Competition",
//     description: "Build and battle robots in an exciting competition.",
//     image: "/images/robotics.jpg",
//   },
//   {
//     id: 3,
//     name: "Hackathon",
//     description: "Solve real-world problems in a 24-hour hackathon.",
//     image: "/images/hackathon.jpg",
//   },
//   {
//     id: 4,
//     name: "AI & ML Workshop",
//     description: "Learn cutting-edge AI & ML techniques from experts.",
//     image: "/images/ai-ml.jpg",
//   },
// ];

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/events`);
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
          <h1 className="text-5xl font-bold mb-4">Explore Our Events</h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Join a variety of events at Shristi Tech Fest, from coding to robotics and workshops.  
          </p>
        </section>

        {/* Events Grid */}
        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto py-10">
          {events.map((event) => (
            <div key={event.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
              <img src={event.image} alt={event.name} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{event.name}</h2>
                <p className="text-gray-300 mb-4">{event.description}</p>
                <Link
                  to={`/event/${event.id}`}
                  className="px-4 py-2 bg-yellow-500 rounded-lg text-lg font-semibold hover:bg-yellow-400 transition"
                >
                  Learn More
                </Link>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Events;
