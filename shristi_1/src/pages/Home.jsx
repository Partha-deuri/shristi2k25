import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const targetDate = new Date("2025-04-09T00:00:00");
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = +targetDate - +new Date();
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const events = [
    {
      title: "Drone Wars",
      description: "Witness the clash of drones in an epic aerial battle for supremacy!",
      link: "/event/67ec1d9d8fe39419ab64e83b",
      bgImage: "/path-to-robowar-image.jpg",
      buttonColor: "from-red-600 to-pink-500",
    },
    {
      title: "Scavenger Hunt",
      description: "Embark on an adventurous quest to solve riddles and uncover hidden treasures!",
      link: "/event/67eade8d42a70ee0928a8825",
      bgImage: "/path-to-treasurehunt-image.jpg",
      buttonColor: "from-green-600 to-teal-500",
    },
    {
      title: "Hack Shristi",
      description: "Showcase your coding prowess and build innovative solutions to real-world challenges.",
      link: "/event/67eac7ece2d67841f5d4cbac",
      bgImage: "/path-to-hackathon-image.jpg",
      buttonColor: "from-blue-600 to-cyan-500",
    },
    {
      title: "SUMO ROBO",
      description: "Watch robots battle it out in a thrilling sumo-style competition!",
      link: "/event/67ec1a898fe39419ab64dea6",
      bgImage: "/path-to-sumorobo-image.jpg",
      buttonColor: "from-purple-600 to-indigo-500",
    },
    {
      title: "CAD IT",
      description: "Unleash your creativity and design skills in this exciting CAD modeling contest.",
      link: "/event/67eb96e58fe39419ab647bbd",
      bgImage: "/path-to-cadit-image.jpg",
      buttonColor: "from-orange-600 to-yellow-500",
    },
    {
      title: "Watt-a-Thon",
      description: "Test your engineering skills in this electrifying competition of innovation and energy!",
      link: "/megaevents/wattathon",
      bgImage: "/path-to-wattathon-image.jpg",
      buttonColor: "from-pink-600 to-red-500",
    },
  ];

  return (
    <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white min-h-screen flex flex-col max-w-full overflow-hidden">
      {/* Video Background */}
      <div className="fixed inset-0 z-0">
        <video
          className="w-full h-full object-cover"
          src="\bg\bg_4.mp4"
          autoPlay
          loop
          muted
        ></video>
      </div>

      {/* Main Hero Section */}
      <main
        className="relative z-10 flex-grow pt-16 max-w-full h-auto scrollbar-hide"
        style={{
          height: "auto",
        }}
      >
        {/* Add the following CSS to hide the scrollbar */}
        <style>
          {`
            .scrollbar-hide {
              -ms-overflow-style: none; /* Internet Explorer 10+ */
              scrollbar-width: none; /* Firefox */
            }
            .scrollbar-hide::-webkit-scrollbar {
              display: none; /* WebKit */
            }
          `}
        </style>
        <section
          className="relative flex flex-col justify-center items-center text-center h-screen max-w-full overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-70"></div>
          <div className="relative z-10 px-6 animate-fade-in">
            <h1 className="text-6xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
              Shristi 2k25
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl">
            Welcome to SHRISTI – where innovation, technology, and creativity come alive! 🚀
            </p>
            {/* Countdown Timer */}
            <div className="mt-6 flex justify-center gap-6 text-3xl font-semibold text-white">
              <div className="p-4 w-24 bg-black bg-opacity-50 rounded-lg shadow-lg border-2 border-white text-center">
                {timeLeft.days}d
              </div>
              <div className="p-4 w-24 bg-black bg-opacity-50 rounded-lg shadow-lg border-2 border-white text-center">
                {timeLeft.hours}h
              </div>
              <div className="p-4 w-24 bg-black bg-opacity-50 rounded-lg shadow-lg border-2 border-white text-center">
                {timeLeft.minutes}m
              </div>
              <div className="p-4 w-24 bg-black bg-opacity-50 rounded-lg shadow-lg border-2 border-white text-center">
                {timeLeft.seconds}s
              </div>
            </div>
            <div className="mt-6 flex justify-center gap-4">
              <Link to="/events" className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg text-lg font-semibold hover:shadow-lg hover:scale-105 transition-transform">
                Explore Events
              </Link>
              <Link to="/game" className="hidden lg:block px-6 py-3 bg-gradient-to-r from-green-500 to-lime-500 rounded-lg text-lg font-semibold hover:shadow-lg hover:scale-105 transition-transform">
                Play Game
              </Link>
              <Link to="/signup" className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-lg text-lg font-semibold hover:shadow-lg hover:scale-105 transition-transform">
                Register Now
              </Link>
            </div>
          </div>
        </section>

        {/* Dynamic Event Sections */}
        {events.map((event, index) => (
          <section
            key={index}
            className="relative flex flex-col justify-center items-center text-center h-screen"
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${event.bgImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-70"></div>
            <div className="relative z-10 px-6 animate-slide-up">
              <h2 className="text-5xl font-bold text-yellow-500 mb-4">{event.title}</h2>
              <p className="text-lg text-gray-300 max-w-2xl">{event.description}</p>
              <div className="mt-8">
                <Link
                  to={event.link}
                  className={`px-6 py-3 bg-gradient-to-r ${event.buttonColor} rounded-lg text-lg font-semibold hover:shadow-lg hover:scale-105 transition-transform`}
                >
                  Learn More
                </Link>
              </div>
            </div>
          </section>
        ))}

        {/* About Section */}
        <section
          className="relative flex flex-col justify-center items-center text-center h-screen"
          style={{
            backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/path-to-about-image.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-70"></div>
          <div className="relative z-10 px-6 animate-slide-up">
            <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              About Shristi
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl">
              Shristi is the annual technical fest of NERIST, bringing together the best minds in technology, creativity, and innovation.
            </p>
          </div>
        </section>

      </main>
    </div>
  );
};

export default Home;
