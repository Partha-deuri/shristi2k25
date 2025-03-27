import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const DepartmentEvents = () => {
  const { departmentId } = useParams();
  const navigate = useNavigate();
  const [departmentEvents, setDepartmentEvents] = useState([]);

  // Dummy data for department events
  const allEvents = [
    {
      id: 1,
      departmentId: 1,
      name: "Coder's Showdown",
      description: "A competitive coding event to showcase your skills.",
      image: "/demo_2.jpg",
    },
    {
      id: 2,
      departmentId: 1,
      name: "Tech Talk",
      image: "/demo_2.jpg",
    },
    {
      id: 3,
      departmentId: 2,
      name: "Circuit Design Challenge",
      description: "Design and test your own circuits.",
      image: "/demo_2.jpg",
    },
    {
      id: 4,
      departmentId: 3,
      name: "Mechanical Marvels",
      description: "Showcase your mechanical innovations.",
      image: "/demo_2.jpg",
    },
  ];

  useEffect(() => {
    // Ensure departmentId is parsed as an integer
    const filteredEvents = allEvents.filter(
      (event) => event.departmentId === Number(departmentId)
    );
    setDepartmentEvents(filteredEvents);
  }, [departmentId]);

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <main className="flex-grow pt-16 px-6">
        {/* Header Section */}
        <section className="text-center py-10">
          <h1 className="text-5xl font-bold mb-4">Department Events</h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Explore the exciting events hosted by this department.
          </p>
        </section>

        {/* Events Grid */}
        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto py-10">
          {departmentEvents.map((event) => (
            <div
              key={event.id}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer hover:scale-105 transition-transform"
              onClick={() => navigate(`/event/${event.id}`)}
            >
              <img src={event.image} alt={event.name} className="w-full object-cover" />
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{event.name}</h2>
                <p className="text-gray-300">{event.description}</p>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default DepartmentEvents;
