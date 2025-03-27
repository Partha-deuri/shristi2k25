// import React from 'react';

const TedxNerist = () => {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white min-h-screen flex flex-col">
      {/* Prevent Navbar Overlap */}
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section id="hero" className="relative flex flex-col justify-center items-center text-center h-screen bg-cover bg-center bg-[url('/demo_2.jpg')]">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-70"></div>
          <div className="relative z-10 px-6 animate-fade-in">
            <h1 className="text-6xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
              Welcome to TEDxNerist
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl">Ideas worth spreading</p>
          </div>
        </section>

        {/* About Us Section */}
        <section id="about-us" className="py-16 px-6 text-center max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            About Us
          </h2>
          <img src="/demo_2.jpg" alt="About Us" className="w-32 h-32 object-cover rounded-full mx-auto mb-6" />
          <p className="text-lg text-gray-300">
            TEDxNerist is a local, self-organized event that brings people together to share a TED-like experience.
          </p>
        </section>

        {/* Speakers Section */}
        <section id="speakers" className="py-16 px-6 text-center max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            Speakers
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <li className="flex flex-col items-center">
              <img src="/demo_2.jpg" alt="Speaker 1" className="w-32 h-32 object-cover rounded-full mb-4" />
              <p className="text-lg text-gray-300">Speaker 1</p>
            </li>
            <li className="flex flex-col items-center">
              <img src="/demo_2.jpg" alt="Speaker 2" className="w-32 h-32 object-cover rounded-full mb-4" />
              <p className="text-lg text-gray-300">Speaker 2</p>
            </li>
            <li className="flex flex-col items-center">
              <img src="/demo_2.jpg" alt="Speaker 3" className="w-32 h-32 object-cover rounded-full mb-4" />
              <p className="text-lg text-gray-300">Speaker 3</p>
            </li>
          </ul>
        </section>

        {/* Partners Section */}
        <section id="partners" className="py-16 px-6 text-center max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            Partners
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <li className="flex flex-col items-center">
              <img src="/demo_2.jpg" alt="Partner 1" className="w-32 h-32 object-cover rounded-full mb-4" />
              <p className="text-lg text-gray-300">Partner 1</p>
            </li>
            <li className="flex flex-col items-center">
              <img src="/demo_2.jpg" alt="Partner 2" className="w-32 h-32 object-cover rounded-full mb-4" />
              <p className="text-lg text-gray-300">Partner 2</p>
            </li>
            <li className="flex flex-col items-center">
              <img src="/demo_2.jpg" alt="Partner 3" className="w-32 h-32 object-cover rounded-full mb-4" />
              <p className="text-lg text-gray-300">Partner 3</p>
            </li>
          </ul>
        </section>

        {/* Organisers Section */}
        <section id="organisers" className="py-16 px-6 text-center max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            Organisers
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <li className="flex flex-col items-center">
              <img src="/demo_2.jpg" alt="Organiser 1" className="w-32 h-32 object-cover rounded-full mb-4" />
              <p className="text-lg text-gray-300">Organiser 1</p>
            </li>
            <li className="flex flex-col items-center">
              <img src="/demo_2.jpg" alt="Organiser 2" className="w-32 h-32 object-cover rounded-full mb-4" />
              <p className="text-lg text-gray-300">Organiser 2</p>
            </li>
            <li className="flex flex-col items-center">
              <img src="/demo_2.jpg" alt="Organiser 3" className="w-32 h-32 object-cover rounded-full mb-4" />
              <p className="text-lg text-gray-300">Organiser 3</p>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default TedxNerist;
