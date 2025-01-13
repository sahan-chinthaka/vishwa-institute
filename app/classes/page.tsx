"use client";

import { useEffect, useState } from "react";
import Footer from "../../components/footer";
import Link from "next/link";
import ClassImage from "../../assets/class.png"; // Assuming class.png is placed in the assets folder

interface Class {
  id: number;
  subject: string;
  grade: string;
  image: string;
  detailsUrl: string;
}

async function fetchClasses(): Promise<Class[]> {
  return [
    { id: 1, subject: "Maths", grade: "6", image: ClassImage.src, detailsUrl: "/class/1" },
    { id: 2, subject: "Maths", grade: "7", image: ClassImage.src, detailsUrl: "/class/2" },
    { id: 3, subject: "Maths", grade: "8", image: ClassImage.src, detailsUrl: "/class/3" },
    { id: 4, subject: "Maths", grade: "9", image: ClassImage.src, detailsUrl: "/class/4" },
    { id: 5, subject: "Maths", grade: "10", image: ClassImage.src, detailsUrl: "/class/5" },
    { id: 6, subject: "Maths", grade: "11", image: ClassImage.src, detailsUrl: "/class/6" },
    { id: 7, subject: "Science", grade: "6", image: ClassImage.src, detailsUrl: "/class/7" },
    { id: 8, subject: "Science", grade: "7", image: ClassImage.src, detailsUrl: "/class/8" },
    { id: 9, subject: "Science", grade: "8", image: ClassImage.src, detailsUrl: "/class/9" },
    { id: 10, subject: "Science", grade: "9", image: ClassImage.src, detailsUrl: "/class/10" },
    { id: 11, subject: "Science", grade: "10", image: ClassImage.src, detailsUrl: "/class/11" },
    { id: 12, subject: "Science", grade: "11", image: ClassImage.src, detailsUrl: "/class/12" },
    { id: 13, subject: "English", grade: "6", image: ClassImage.src, detailsUrl: "/class/13" },
    { id: 14, subject: "English", grade: "7", image: ClassImage.src, detailsUrl: "/class/14" },
    { id: 15, subject: "English", grade: "8", image: ClassImage.src, detailsUrl: "/class/15" },
    { id: 16, subject: "English", grade: "9", image: ClassImage.src, detailsUrl: "/class/16" },
    { id: 17, subject: "English", grade: "10", image: ClassImage.src, detailsUrl: "/class/17" },
    { id: 18, subject: "English", grade: "11", image: ClassImage.src, detailsUrl: "/class/18" },
  ];
}

export default function ClassesPage() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [filteredClasses, setFilteredClasses] = useState<Class[]>([]);
  const [visibleRows, setVisibleRows] = useState(2);
  const [subjectFilter, setSubjectFilter] = useState(""); // Filter by subject
  const [gradeFilter, setGradeFilter] = useState(""); // Filter by grade

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

    // Filter classes by subject
    if (subjectFilter) {
      filtered = filtered.filter((classItem) =>
        classItem.subject.toLowerCase().includes(subjectFilter.toLowerCase())
      );
    }

    // Filter classes by grade
    if (gradeFilter) {
      filtered = filtered.filter((classItem) =>
        classItem.grade.toLowerCase().includes(gradeFilter.toLowerCase())
      );
    }

    setFilteredClasses(filtered);
  }, [subjectFilter, gradeFilter, classes]);

  const itemsPerRow = 4;

  const handleShowMore = () => {
    setVisibleRows((prev) => prev + 2);
  };

  const classesToShow = filteredClasses.slice(0, visibleRows * itemsPerRow);

  return (
    <div className="container mx-auto p-4">
      {/* Filters */}
      <div
        className="filters-container flex flex-col sm:flex-row justify-center mb-6"
        style={{ textAlign: "center" }}
      >
        <input
          type="text"
          placeholder="Filter by subject"
          value={subjectFilter}
          onChange={(e) => setSubjectFilter(e.target.value)}
          className="px-4 py-2 border rounded-md bg-white text-black mb-4 sm:mb-0 sm:mr-4"
        />
        <input
          type="text"
          placeholder="Filter by grade"
          value={gradeFilter}
          onChange={(e) => setGradeFilter(e.target.value)}
          className="px-4 py-2 border rounded-md bg-white text-black mb-4 sm:mb-0 sm:mr-4"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {classesToShow.map((classItem) => (
          <div
            key={classItem.id}
            className="border border-gray-300 rounded-lg overflow-hidden cursor-pointer bg-white transform hover:scale-105 hover:shadow-lg hover:bg-green-100 transition-all duration-300"
          >
            <Link href={`/class/${classItem.id}`}>
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

      {/* Show more button */}
      {filteredClasses.length > visibleRows * itemsPerRow && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleShowMore}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
          >
            See More
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
}
