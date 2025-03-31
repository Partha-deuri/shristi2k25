import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ThreeScene from "../components/ThreeScene";

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

  return (
    <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white min-h-screen flex flex-col max-w-full overflow-hidden">
      {/* Three.js Scene */}
      <div className="fixed inset-0 z-0">
        <ThreeScene /> {/* Render Three.js animation as a sticky background */}
      </div>

      {/* Main Hero Section */}
      <main className="relative z-10 flex-grow pt-16 max-w-full overflow-hidden">
        <section className="relative flex flex-col justify-center items-center text-center h-screen max-w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-70"></div>
          <div className="relative z-10 px-6 animate-fade-in">
            <h1 className="text-6xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
              Shristi Tech Fest
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              The biggest tech fest of NERIST is here! Get ready for an exciting journey of innovation, competition, and networking.
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

        {/* Event Sections */}
        {/* Robo War */}
        <section className="relative flex flex-col justify-center items-center text-center h-screen bg-cover bg-center bg-[url('/path-to-robowar-image.jpg')] max-w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-70"></div>
          <div className="relative z-10 px-6 animate-slide-up">
            <h2 className="text-5xl font-bold text-yellow-500 mb-4">Robo War</h2>
            <p className="text-lg text-gray-300 max-w-2xl">
              Witness the clash of metal warriors as teams battle it out in the ultimate robotic showdown!
            </p>
            <Link to="/events/robowar" className="mt-4 px-6 py-3 bg-gradient-to-r from-red-600 to-pink-500 rounded-lg text-lg font-semibold hover:shadow-lg hover:scale-105 transition-transform">
              Learn More
            </Link>
          </div>
        </section>

        {/* Treasure Hunt */}
        <section className="relative flex flex-col justify-center items-center text-center h-screen bg-cover bg-center bg-[url('/path-to-treasurehunt-image.jpg')] max-w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-70"></div>
          <div className="relative z-10 px-6 animate-slide-up">
            <h2 className="text-5xl font-bold text-yellow-500 mb-4">Treasure Hunt</h2>
            <p className="text-lg text-gray-300 max-w-2xl">
              Follow the clues, solve the mysteries, and race against time to find the hidden treasure!
            </p>
            <Link to="/events/treasurehunt" className="mt-4 px-6 py-3 bg-gradient-to-r from-green-600 to-teal-500 rounded-lg text-lg font-semibold hover:shadow-lg hover:scale-105 transition-transform">
              Learn More
            </Link>
          </div>
        </section>

        {/* Hackathon */}
        <section className="relative flex flex-col justify-center items-center text-center h-screen bg-cover bg-center bg-[url('/path-to-hackathon-image.jpg')] max-w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-70"></div>
          <div className="relative z-10 px-6 animate-slide-up">
            <h2 className="text-5xl font-bold text-yellow-500 mb-4">Hackathon</h2>
            <p className="text-lg text-gray-300 max-w-2xl">
              Bring your coding skills to the test! Collaborate, innovate, and develop solutions for real-world problems.
            </p>
            <Link to="/events/hackathon" className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg text-lg font-semibold hover:shadow-lg hover:scale-105 transition-transform">
              Learn More
            </Link>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 px-6 text-center max-w-5xl mx-auto overflow-hidden">
          <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            About Shristi
          </h2>
          <p className="text-lg text-gray-300">
            Shristi is the annual technical fest of NERIST, bringing together the best minds in technology, creativity, and innovation.
          </p>
        </section>

      </main>
    </div>
  );
};

export default Home;
