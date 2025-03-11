const developers = [
  {
    name: "Parthapratim Deuri",
    role: "Full Stack Developer",
    image: "/images/partha.jpg",
    github: "https://github.com/yourgithub",
    linkedin: "https://linkedin.com/in/yourlinkedin",
  },
  {
    name: "John Doe",
    role: "UI/UX Designer",
    image: "/images/john.jpg",
    github: "https://github.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
  },
  {
    name: "Jane Smith",
    role: "Backend Developer",
    image: "/images/jane.jpg",
    github: "https://github.com/janesmith",
    linkedin: "https://linkedin.com/in/janesmith",
  },
];

const Developers = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <main className="flex-grow pt-16 px-6">
        {/* Header Section */}
        <section className="text-center py-10">
          <h1 className="text-5xl font-bold mb-4">Meet the Developers</h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            The amazing team behind Shristi Tech Fest website.
          </p>
        </section>

        {/* Developers Grid */}
        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto py-10">
          {developers.map((dev, index) => (
            <div key={index} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg text-center p-6">
              <img src={dev.image} alt={dev.name} className="w-32 h-32 mx-auto rounded-full object-cover" />
              <h2 className="text-2xl font-bold mt-4">{dev.name}</h2>
              <p className="text-gray-400">{dev.role}</p>
              <div className="flex justify-center gap-4 mt-4">
                <a href={dev.github} target="_blank" rel="noopener noreferrer">
                  <img src="/icons/github.svg" alt="GitHub" className="w-6 h-6" />
                </a>
                <a href={dev.linkedin} target="_blank" rel="noopener noreferrer">
                  <img src="/icons/linkedin.svg" alt="LinkedIn" className="w-6 h-6" />
                </a>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Developers;
