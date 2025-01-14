'use client';

import { useEffect, useState } from 'react';

interface Class {
  name: string;
  description: string;
  image: string;
}

const classes: Class[] = [
  {
    name: "Mathematics",
    description: "Comprehensive classes covering algebra, geometry, and calculus.",
    image: "/mathematics.jpg",
  },
  {
    name: "Science",
    description: "Explore the world of physics, chemistry, and biology.",
    image: "/science.jpg",
  },
  {
    name: "English Literature",
    description: "Dive into classical and modern literature with expert guidance.",
    image: "/english_literature.jpg",
  },
];

export default function Classes() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Will run only on client-side
  }, []);

  if (!isClient) {
    return null; // Prevents SSR mismatch during initial render
  }

  return (
    <section className="py-16 min-h-screen flex items-center justify-center bg-white">
      <div className="w-full h-full flex flex-col justify-center items-center px-4 md:px-60">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Classes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {classes.map((classItem) => (
            <div
              key={classItem.name}
              className="bg-white shadow-xl rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl max-w-xs mx-auto"
            >
              <div className="relative">
                <img
                  src={classItem.image}
                  alt={classItem.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition">
                  <p className="text-white font-semibold">Click to Learn More</p>
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{classItem.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{classItem.description}</p>
                <button className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow-md transform hover:scale-105">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
