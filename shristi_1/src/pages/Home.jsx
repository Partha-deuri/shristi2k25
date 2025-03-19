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

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      {/* Prevent Navbar Overlap */}
      <main className="flex-grow pt-16">

        {/* Main Hero Section */}
        <section className="relative flex flex-col justify-center items-center text-center h-screen bg-cover bg-center bg-[url('/path-to-main-image.jpg')]">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 px-6">
            <h1 className="text-6xl font-bold mb-4">Shristi Tech Fest</h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              The biggest tech fest of NERIST is here! Get ready for an exciting journey of innovation, competition, and networking.
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <Link to="/events" className="px-6 py-3 bg-yellow-500 rounded-lg text-lg font-semibold hover:bg-yellow-400 transition">
                Explore Events
              </Link>
              <Link to="/signup" className="px-6 py-3 bg-indigo-600 rounded-lg text-lg font-semibold hover:bg-indigo-500 transition">
                Register Now
              </Link>
            </div>
          </div>
        </section>

        {/* Countdown Timer */}
        <section className="py-10 bg-indigo-800 text-center">
          <h2 className="text-4xl font-bold mb-4">Countdown to Shristi</h2>
          <div className="flex justify-center gap-6 text-3xl font-semibold">
            <div>{timeLeft.days}d</div>
            <div>{timeLeft.hours}h</div>
            <div>{timeLeft.minutes}m</div>
            <div>{timeLeft.seconds}s</div>
          </div>
        </section>

        {/* Event Sections */}

        {/* Robo War */}
        <section className="relative flex flex-col justify-center items-center text-center h-screen bg-cover bg-center bg-[url('/path-to-robowar-image.jpg')]">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 px-6">
            <h2 className="text-5xl font-bold text-yellow-500 mb-4">Robo War</h2>
            <p className="text-lg text-gray-300 max-w-2xl">
              Witness the clash of metal warriors as teams battle it out in the ultimate robotic showdown!
            </p>
            <Link to="/events/robowar" className="mt-4 px-6 py-3 bg-red-600 rounded-lg text-lg font-semibold hover:bg-red-500 transition">
              Learn More
            </Link>
          </div>
        </section>

        {/* Treasure Hunt */}
        <section className="relative flex flex-col justify-center items-center text-center h-screen bg-cover bg-center bg-[url('/path-to-treasurehunt-image.jpg')]">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 px-6">
            <h2 className="text-5xl font-bold text-yellow-500 mb-4">Treasure Hunt</h2>
            <p className="text-lg text-gray-300 max-w-2xl">
              Follow the clues, solve the mysteries, and race against time to find the hidden treasure!
            </p>
            <Link to="/events/treasurehunt" className="mt-4 px-6 py-3 bg-green-600 rounded-lg text-lg font-semibold hover:bg-green-500 transition">
              Learn More
            </Link>
          </div>
        </section>

        {/* Hackathon */}
        <section className="relative flex flex-col justify-center items-center text-center h-screen bg-cover bg-center bg-[url('/path-to-hackathon-image.jpg')]">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 px-6">
            <h2 className="text-5xl font-bold text-yellow-500 mb-4">Hackathon</h2>
            <p className="text-lg text-gray-300 max-w-2xl">
              Bring your coding skills to the test! Collaborate, innovate, and develop solutions for real-world problems.
            </p>
            <Link to="/events/hackathon" className="mt-4 px-6 py-3 bg-blue-600 rounded-lg text-lg font-semibold hover:bg-blue-500 transition">
              Learn More
            </Link>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 px-6 text-center max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">About Shristi</h2>
          <p className="text-lg text-gray-300">
            Shristi is the annual technical fest of NERIST, bringing together the best minds in technology, creativity, and innovation.
          </p>
        </section>

      </main>
    </div>
  );
};

export default Home;
