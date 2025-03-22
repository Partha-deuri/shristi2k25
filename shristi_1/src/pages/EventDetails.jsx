import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

// const eventData = {
//   "1": {
//     title: "Hackathon",
//     image: "/images/hackathon.jpg",
//     description: "A 24-hour coding challenge to solve real-world problems using technology.",
//     date: "March 10, 2025",
//     time: "10:00 AM - 10:00 PM",
//     venue: "Main Auditorium",
//     rules: [
//       "Team size: 2-4 members",
//       "No plagiarism; originality is a must",
//       "Judging based on innovation, execution, and impact",
//     ],
//     prizes: "₹50,000 cash prize + goodies",
//   },
//   "2": {
//     title: "Robotics Challenge",
//     image: "/images/robotics.jpg",
//     description: "A battle of autonomous and manual robots to complete various challenges.",
//     date: "March 11, 2025",
//     time: "12:00 PM - 4:00 PM",
//     venue: "Tech Arena",
//     rules: [
//       "Robots must fit within size constraints",
//       "No external human interference allowed",
//       "Scoring based on speed, accuracy, and efficiency",
//     ],
//     prizes: "₹30,000 cash prize + certificates",
//   },
// };

const EventDetails = () => {
  // const { id } = useParams();
  // const [event, setEvent] = useState(null);

  // useEffect(() => {
  //   if (eventData[id]) {
  //     setEvent(eventData[id]);
  //   }
  // }, [id]);

  // if (!event) {
  //   return (
  //     <div className="text-white text-center mt-20 text-2xl">
  //       Event not found. Please check the event list.
  //     </div>
  //   );
  // }
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`${import.meta.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/events/${id}`);
        setEvent(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEvent();
  }, [id]);

  if (!event) return <div>Loading...</div>;

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center px-6 py-10">
      <div className="max-w-4xl bg-gray-800 p-6 rounded-lg shadow-lg">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
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
    </div>
  );
};

export default EventDetails;
