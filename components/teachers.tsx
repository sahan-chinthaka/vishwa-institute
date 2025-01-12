'use client';

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
    name: "John Doe",
    description: "Experienced teacher with a passion for teaching science and technology.",
    image: "/john_doe.jpg", 
  },
  
];

export default function Teachers() {
  return (
    <section className="py-16 min-h-screen flex items-center justify-center"> {/* Centering the content vertically and horizontally */}
      <div className="w-full h-full flex flex-col justify-center items-center px-60">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Our Teachers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full">
          {teachers.map((teacher, index) => (
            <div
              key={index}
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
