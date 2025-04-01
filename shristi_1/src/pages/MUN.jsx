import { useEffect } from "react";

const MUN = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on component mount
  }, []);

  return (
    <div className="pt-16 transition-all duration-300 ease-in-out"> {/* Added smooth transition */}
      <div className="pt-12 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white min-h-screen p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-yellow-500 mb-6">Model United Nations</h1>
          <p className="text-lg text-gray-300 mb-6">
            Step into the shoes of diplomats and engage in stimulating debates to solve global issues.
          </p>
          <h2 className="text-3xl font-semibold text-purple-400 mb-4">Details</h2>
          <ul className="list-disc list-inside text-gray-300 mb-6">
            <li>Participants will represent different countries.</li>
            <li>Debates will follow standard MUN procedures.</li>
            <li>Topics will be provided in advance.</li>
          </ul>

         
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <img
              src="/mun/1.jpg"
              alt="MUN Image 1"
              className="rounded-lg shadow-lg"
            />
            <img
              src="/mun/2.jpg"
              alt="MUN Image 2"
              className="rounded-lg shadow-lg"
            />
            <img
              src="/mun/3.jpg"
              alt="MUN Image 3"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="mt-8 text-center">
            <img
              src="/mun/b1.png"
              alt="MUN Brochure First Page"
              className="w-full h-auto border-2 border-gray-700 rounded-lg mb-4"
            />
            <a
              href="/mun/brochure.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-500 underline hover:text-yellow-600 transition-all duration-300"
            >
              Download Information Brochure (PDF)
            </a>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => window.location.href = "http://bit.ly/4bYaedZ"} // Registration link
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

export default MUN;
