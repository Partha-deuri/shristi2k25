const sponsors = [
  {
    name: "Google",
    logo: "/images/google.png",
    website: "https://www.google.com",
  },
];

const Sponsors = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <main className="flex-grow pt-16 px-6">
        {/* Header Section */}
        <section className="text-center py-10">
          <h1 className="text-5xl font-bold mb-4">Our Sponsors</h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            We are grateful to our sponsors for their invaluable support in making Shristi Tech Fest a success.
          </p>
        </section>

        {/* Sponsors Grid */}
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto py-10">
          {sponsors.map((sponsor, index) => (
            <a
              key={index}
              href={sponsor.website}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center transition hover:scale-105"
            >
              <img src={sponsor.logo} alt={sponsor.name} className="w-32 h-32 object-contain" />
              <h2 className="text-xl font-semibold mt-4">{sponsor.name}</h2>
            </a>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Sponsors;
