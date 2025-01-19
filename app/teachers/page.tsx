"use client";

import { useEffect, useState } from "react";
import Footer from "../../components/footer";
import Link from "next/link";
import Girl from "../../assets/girl.jpeg";
import Boy from "../../assets/boy.jpeg";

interface Teacher {
  id: number;
  name: string;
  subject: string;
  photo: string;
  detailsUrl: string;
}

async function fetchTeachers(): Promise<Teacher[]> {
  return [
    { id: 1, name: "John Doe", subject: "Math", photo: Girl.src, detailsUrl: "/teacher/1" },
    { id: 2, name: "Jane Smith", subject: "Science", photo: Boy.src, detailsUrl: "/teacher/2" },
    { id: 3, name: "Alice Johnson", subject: "English", photo: Girl.src, detailsUrl: "/teacher/3" },
    { id: 4, name: "Robert Brown", subject: "History", photo: Boy.src, detailsUrl: "/teacher/4" },
    { id: 5, name: "Emily Davis", subject: "Art", photo: Girl.src, detailsUrl: "/teacher/5" },
    { id: 6, name: "David Lee", subject: "Geography", photo: Boy.src, detailsUrl: "/teacher/6" },
    { id: 7, name: "Sarah Williams", subject: "Physics", photo: Girl.src, detailsUrl: "/teacher/7" },
    { id: 8, name: "Mark Thompson", subject: "Chemistry", photo: Boy.src, detailsUrl: "/teacher/8" },
    { id: 9, name: "Sophia Turner", subject: "Biology", photo: Girl.src, detailsUrl: "/teacher/9" },
    { id: 10, name: "Daniel Scott", subject: "Computer Science", photo: Boy.src, detailsUrl: "/teacher/10" },
  ];
}

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [filteredTeachers, setFilteredTeachers] = useState<Teacher[]>([]);
  const [visibleRows, setVisibleRows] = useState(2);
  const [showAll] = useState(false);
  const [nameFilter, setNameFilter] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");

  useEffect(() => {
    async function loadTeachers() {
      const data = await fetchTeachers();
      setTeachers(data);
      setFilteredTeachers(data);
    }
    loadTeachers();
  }, []);

  useEffect(() => {
    let filtered = teachers;

    if (nameFilter) {
      filtered = filtered.filter((teacher) =>
        teacher.name.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }

    if (subjectFilter) {
      filtered = filtered.filter((teacher) =>
        teacher.subject.toLowerCase().includes(subjectFilter.toLowerCase())
      );
    }

    setFilteredTeachers(filtered);
  }, [nameFilter, subjectFilter, teachers]);

  const itemsPerRow = 4;

  const handleShowMore = () => {
    setVisibleRows((prev) => prev + 2);
  };

  const teachersToShow = showAll
    ? filteredTeachers
    : filteredTeachers.slice(0, visibleRows * itemsPerRow);

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
          placeholder="Filter by name"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          className="filter-input px-4 py-2 border rounded-md bg-white text-black"
          style={{ minWidth: "250px" }} 
        />
        <input
          type="text"
          placeholder="Filter by subject"
          value={subjectFilter}
          onChange={(e) => setSubjectFilter(e.target.value)}
          className="filter-input px-4 py-2 border rounded-md bg-white text-black"
          style={{ minWidth: "250px" }} 
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {teachersToShow.map((teacher) => (
          <div
            key={teacher.id}
            className="border border-gray-300 rounded-lg overflow-hidden cursor-pointer bg-white transform hover:scale-105 hover:shadow-lg hover:bg-green-100 transition-all duration-300"
          >
            <Link href={`/teacher/${teacher.id}`}>
              <img
                src={teacher.photo}
                alt={teacher.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <p>
                  <strong>Name:</strong> {teacher.name}
                </p>
                <p>
                  <strong>Subject:</strong> {teacher.subject}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {!showAll && visibleRows * itemsPerRow < filteredTeachers.length && (
        <div className="text-center mt-5">
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