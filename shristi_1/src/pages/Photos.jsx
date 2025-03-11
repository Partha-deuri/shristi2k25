import { useState } from "react";

const photos = [
  "/images/photo1.jpg",
  "/images/photo2.jpg",
  "/images/photo3.jpg",
  "/images/photo4.jpg",
  "/images/photo5.jpg",
  "/images/photo6.jpg",
  "/images/photo7.jpg",
  "/images/photo8.jpg",
];

const Photos = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="bg-gray-900 text-white min-h-screen py-16 px-6">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold">Event Gallery</h1>
        <p className="text-gray-400 text-lg mt-2">
          Explore some of the best moments from Shristi Tech Fest!
        </p>
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo, index) => (
          <div
            key={index}
            className="relative group overflow-hidden rounded-lg cursor-pointer"
            onClick={() => setSelectedImage(photo)}
          >
            <img
              src={photo}
              alt={`Event ${index + 1}`}
              className="w-full h-64 object-cover transform group-hover:scale-105 transition duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-300">
              <p className="text-white text-lg font-semibold">View Image</p>
            </div>
          </div>
        ))}
      </div>

      {/* Image Popup Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
          <div className="relative max-w-3xl w-full p-4">
            <button
              className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full text-xl"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>
            <img
              src={selectedImage}
              alt="Selected"
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Photos;
