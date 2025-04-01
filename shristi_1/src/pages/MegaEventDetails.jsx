import { useParams } from "react-router-dom";
import { useEffect } from "react"; // Added useEffect import

const eventDetails = {
  dronewars: {
    title: "Drone Wars",
    description: "Witness the clash of drones in an epic aerial battle for supremacy!",
    rules: [
      "Each team can have a maximum of 4 members.",
      "Drones must adhere to the specified size and weight limits.",
      "No external interference is allowed during the match.",
    ],
    prizes: ["1st Prize: $5000", "2nd Prize: $3000", "3rd Prize: $1000"],
  },
  scavengerhunt: {
    title: "Scavenger Hunt",
    description: "Embark on an adventurous quest to solve riddles and uncover hidden treasures!",
    rules: [
      "Teams can have up to 5 members.",
      "Clues must be solved in sequence.",
      "Use of mobile phones or external help is prohibited.",
    ],
    prizes: ["1st Prize: $2000", "2nd Prize: $1000", "3rd Prize: $500"],
  },
  hackshristi: {
    title: "Hack Shristi",
    description: "Showcase your coding prowess and build innovative solutions to real-world challenges.",
    rules: [
      "Teams can have up to 4 members.",
      "All code must be written during the event.",
      "Judging will be based on innovation, functionality, and presentation.",
    ],
    prizes: ["1st Prize: $7000", "2nd Prize: $4000", "3rd Prize: $2000"],
  },
  sumorobo: {
    title: "SUMO ROBO",
    description: "Watch robots battle it out in a thrilling sumo-style competition!",
    rules: [
      "Each team can have a maximum of 3 members.",
      "Robots must adhere to the specified size and weight limits.",
      "No external interference is allowed during the match.",
    ],
    prizes: ["1st Prize: $4000", "2nd Prize: $2000", "3rd Prize: $1000"],
  },
  cadit: {
    title: "CAD IT",
    description: "Unleash your creativity and design skills in this exciting CAD modeling contest.",
    rules: [
      "Participants must use the provided CAD software.",
      "Designs must adhere to the given theme.",
      "Judging will be based on creativity, accuracy, and presentation.",
    ],
    prizes: ["1st Prize: $3000", "2nd Prize: $1500", "3rd Prize: $750"],
  },
  wattathon: {
    title: "Watt-a-Thon",
    description: "Test your engineering skills in this electrifying competition of innovation and energy!",
    rules: [
      "Teams can have up to 4 members.",
      "Projects must be completed within the given time frame.",
      "Judging will be based on innovation, feasibility, and presentation.",
    ],
    prizes: ["1st Prize: $6000", "2nd Prize: $3000", "3rd Prize: $1500"],
  },
};

const MegaEventDetails = () => {
  const { eventId } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on component mount
  }, []);

  const event = eventDetails[eventId];

  if (!event) {
    return <h1 className="text-center text-white mt-10">Event not found!</h1>;
  }

  return (
    <div className="pt-16 transition-all duration-300 ease-in-out"> {/* Added smooth transition */}
      <div className=" pt-12 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white min-h-screen p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-yellow-500 mb-6">{event.title}</h1>
          <p className="text-lg text-gray-300 mb-6">{event.description}</p>
          <h2 className="text-3xl font-semibold text-purple-400 mb-4">Rules</h2>
          <ul className="list-disc list-inside text-gray-300 mb-6">
            {event.rules.map((rule, index) => (
              <li key={index}>{rule}</li>
            ))}
          </ul>
          <h2 className="text-3xl font-semibold text-green-400 mb-4">Prizes</h2>
          <ul className="list-disc list-inside text-gray-300">
            {event.prizes.map((prize, index) => (
              <li key={index}>{prize}</li>
            ))}
          </ul>
          <div className="mt-8 text-center">
            <button
              onClick={() => window.location.href = `/register/${eventId}`} // Dynamic registration link
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded transition-all duration-300"
            >
              Register Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaEventDetails;
