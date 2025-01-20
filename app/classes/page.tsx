"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ClassImage from "../../assets/class.png"; // Placeholder image

interface Class {
  id: number;
  subject: string;
  grade: string;
  image: string;
}

async function fetchClasses(): Promise<Class[]> {
  return [
    { id: 1, subject: "Math", grade: "Grade 6", image: ClassImage.src },
    { id: 2, subject: "Math", grade: "Grade 7", image: ClassImage.src },
    { id: 3, subject: "Math", grade: "Grade 8", image: ClassImage.src },
    { id: 4, subject: "Math", grade: "Grade 9", image: ClassImage.src },
    { id: 5, subject: "Math", grade: "Grade 10", image: ClassImage.src },
    { id: 6, subject: "Math", grade: "Grade 11", image: ClassImage.src },
    { id: 7, subject: "Science", grade: "Grade 6", image: ClassImage.src },
    { id: 8, subject: "Science", grade: "Grade 7", image: ClassImage.src },
    { id: 9, subject: "Science", grade: "Grade 8", image: ClassImage.src },
    { id: 10, subject: "Science", grade: "Grade 9", image: ClassImage.src },
    { id: 11, subject: "Science", grade: "Grade 10", image: ClassImage.src },
    { id: 12, subject: "Science", grade: "Grade 11", image: ClassImage.src },
    { id: 13, subject: "English", grade: "Grade 6", image: ClassImage.src },
    { id: 14, subject: "English", grade: "Grade 7", image: ClassImage.src },
    { id: 15, subject: "English", grade: "Grade 8", image: ClassImage.src },
    { id: 16, subject: "English", grade: "Grade 9", image: ClassImage.src },
    { id: 17, subject: "English", grade: "Grade 10", image: ClassImage.src },
    { id: 18, subject: "English", grade: "Grade 11", image: ClassImage.src },
    // Add more classes as needed
  ];
}

export default function ClassesPage() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [filteredClasses, setFilteredClasses] = useState<Class[]>([]);
  const [visibleClasses, setVisibleClasses] = useState<number>(8); // Default to showing 2 rows (4 classes per row)

  const [nameFilter, setNameFilter] = useState("");
  const [gradeFilter, setGradeFilter] = useState("");

  useEffect(() => {
    async function loadClasses() {
      const data = await fetchClasses();
      setClasses(data);
      setFilteredClasses(data);
    }
    loadClasses();
  }, []);

  useEffect(() => {
    let filtered = classes;

    if (nameFilter) {
      filtered = filtered.filter((classItem) =>
        classItem.subject.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }

    if (gradeFilter) {
      filtered = filtered.filter((classItem) =>
        classItem.grade.toLowerCase().includes(gradeFilter.toLowerCase())
      );
    }

    setFilteredClasses(filtered);
  }, [nameFilter, gradeFilter, classes]);

  const handleSeeMore = () => {
    setVisibleClasses((prev) => prev + 8); // Show 2 more rows
  };

  return (
    <div style={{ padding: "20px" }}>
      <div
        className="filters-container text-center mb-5"
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          placeholder="Filter by subject"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          className="filter-input px-4 py-2 border rounded-md bg-white text-black"
          style={{ minWidth: "250px" }}
        />
        <input
          type="text"
          placeholder="Filter by grade"
          value={gradeFilter}
          onChange={(e) => setGradeFilter(e.target.value)}
          className="filter-input px-4 py-2 border rounded-md bg-white text-black"
          style={{ minWidth: "250px" }}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredClasses.slice(0, visibleClasses).map((classItem) => (
          <div
            key={classItem.id}
            className="border border-gray-300 rounded-lg overflow-hidden cursor-pointer bg-white transform hover:scale-105 hover:shadow-lg hover:bg-green-100 transition-all duration-300"
          >
            <Link href={`/classes/${classItem.id}`}>
              <img
                src={classItem.image}
                alt={classItem.subject}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <p>
                  <strong>Subject:</strong> {classItem.subject}
                </p>
                <p>
                  <strong>Grade:</strong> {classItem.grade}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {visibleClasses < filteredClasses.length && (
        <div className="text-center mt-5">
          <button
            onClick={handleSeeMore}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
          >
            See More
          </button>
        </div>
      )}
    </div>
  );
}
