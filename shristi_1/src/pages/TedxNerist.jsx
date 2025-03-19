// import React from 'react';

const TedxNerist = () => {
  return (
    <div className="font-sans text-gray-800 leading-relaxed">
      {/* Hero Section */}
      <section id="hero" className="text-center py-12 bg-gray-100">
        <img src="/images/hero.jpg" alt="Hero" className="w-full max-h-96 object-cover" />
        <h1 className="text-4xl font-bold mt-4">Welcome to TEDxNerist</h1>
        <p className="text-xl mt-2">Ideas worth spreading</p>
      </section>

      {/* About Us Section */}
      <section id="about-us" className="py-12 px-4">
        <h2 className="text-3xl font-semibold mb-4">About Us</h2>
        <img src="/images/about-us.jpg" alt="About Us" className="w-24 h-24 object-cover rounded-full mb-4" />
        <p>TEDxNerist is a local, self-organized event that brings people together to share a TED-like experience.</p>
      </section>

      {/* Speakers Section */}
      <section id="speakers" className="py-12 px-4">
        <h2 className="text-3xl font-semibold mb-4">Speakers</h2>
        <ul className="list-none p-0">
          <li className="flex items-center mb-4">
            <img src="/images/speaker1.jpg" alt="Speaker 1" className="w-24 h-24 object-cover rounded-full mr-4" />
            Speaker 1
          </li>
          <li className="flex items-center mb-4">
            <img src="/images/speaker2.jpg" alt="Speaker 2" className="w-24 h-24 object-cover rounded-full mr-4" />
            Speaker 2
          </li>
          <li className="flex items-center mb-4">
            <img src="/images/speaker3.jpg" alt="Speaker 3" className="w-24 h-24 object-cover rounded-full mr-4" />
            Speaker 3
          </li>
        </ul>
      </section>

      {/* Partners Section */}
      <section id="partners" className="py-12 px-4">
        <h2 className="text-3xl font-semibold mb-4">Partners</h2>
        <ul className="list-none p-0">
          <li className="flex items-center mb-4">
            <img src="/images/partner1.jpg" alt="Partner 1" className="w-24 h-24 object-cover rounded-full mr-4" />
            Partner 1
          </li>
          <li className="flex items-center mb-4">
            <img src="/images/partner2.jpg" alt="Partner 2" className="w-24 h-24 object-cover rounded-full mr-4" />
            Partner 2
          </li>
          <li className="flex items-center mb-4">
            <img src="/images/partner3.jpg" alt="Partner 3" className="w-24 h-24 object-cover rounded-full mr-4" />
            Partner 3
          </li>
        </ul>
      </section>

      {/* Organisers Section */}
      <section id="organisers" className="py-12 px-4">
        <h2 className="text-3xl font-semibold mb-4">Organisers</h2>
        <ul className="list-none p-0">
          <li className="flex items-center mb-4">
            <img src="/images/organiser1.jpg" alt="Organiser 1" className="w-24 h-24 object-cover rounded-full mr-4" />
            Organiser 1
          </li>
          <li className="flex items-center mb-4">
            <img src="/images/organiser2.jpg" alt="Organiser 2" className="w-24 h-24 object-cover rounded-full mr-4" />
            Organiser 2
          </li>
          <li className="flex items-center mb-4">
            <img src="/images/organiser3.jpg" alt="Organiser 3" className="w-24 h-24 object-cover rounded-full mr-4" />
            Organiser 3
          </li>
        </ul>
      </section>
    </div>
  );
};

export default TedxNerist;
