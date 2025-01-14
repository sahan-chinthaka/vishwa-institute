'use client';

import { useEffect, useState } from 'react';

interface Teacher {
  name: string;
  description: string;
  image: string;
}

const teachers: Teacher[] = [
  {
    name: "Uresha Dulashan",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus.",
    image: "/uresha.jpg",
  },
  {
    name: "John Doe",
    description: "Experienced teacher with a passion for teaching science and technology.",
    image: "/john_doe.jpg",
  },
  {
    name: "Jane Doe",
    description: "Skilled in teaching mathematics and problem-solving techniques.",
    image: "/jane_doe.jpg",
  },
];

export default function Teachers() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Will run only on client-side
  }, []);

  if (!isClient) {
    return null; // Prevents SSR mismatch during initial render
  }

  return (
    <section className="py-16 min-h-screen flex items-center justify-center">
      <div className="w-full h-full flex flex-col justify-center items-center px-4 md:px-60">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Teachers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {teachers.map((teacher) => (
            <div
              key={teacher.name}
              className="bg-white shadow-lg rounded-lg overflow-hidden transition transform hover:scale-105 max-w-xs mx-auto"
            >
              <img
                src={teacher.image}
                alt={teacher.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold text-gray-900">{teacher.name}</h3>
                <p className="text-gray-600 text-sm mt-2">{teacher.description}</p>
                <button className="mt-4 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
