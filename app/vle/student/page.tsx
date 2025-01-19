"use client";
import { useEffect, useState } from "react";
import { logWithTimestamp, fetchData } from "@/lib/utils";
import Link from 'next/link';
import English from "@/assets/english.png";
import Science from "@/assets/science.jpeg";
import Mathematics from "@/assets/mathematics.jpg";
import Footer from "@/components/footer";

const StudentClassInfo = ({ studentId }: { studentId: string }) => {
  const [studentData, setStudentData] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showAllClasses, setShowAllClasses] = useState(false);

  const dummyClasses = [
    {
      className: "Mathematics",
      grade: "Grade 10",
      teacher: "Siripala",
      image: Mathematics.src,
    },
    {
      className: "Science",
      grade: "Grade 9",
      teacher: "Kumari",
      image: Science.src,
    },
    {
      className: "English",
      grade: "Grade 8",
      teacher: "Fernando",
      image: English.src,
    },
    {
        className: "Mathematics",
        grade: "Grade 10",
        teacher: "Siripala",
        image: Mathematics.src,
      },
      {
        className: "Science",
        grade: "Grade 9",
        teacher: "Kumari",
        image: Science.src,
      },
      {
        className: "English",
        grade: "Grade 8",
        teacher: "Fernando",
        image: English.src,
      },
      {
        className: "Mathematics",
        grade: "Grade 10",
        teacher: "Siripala",
        image: Mathematics.src,
      },
      {
        className: "Science",
        grade: "Grade 9",
        teacher: "Kumari",
        image: Science.src,
      },
      {
        className: "English",
        grade: "Grade 8",
        teacher: "Fernando",
        image: English.src,
      },
      {
        className: "Mathematics",
        grade: "Grade 10",
        teacher: "Siripala",
        image: Mathematics.src,
      },
      {
        className: "Science",
        grade: "Grade 9",
        teacher: "Kumari",
        image: Science.src,
      },
      {
        className: "English",
        grade: "Grade 8",
        teacher: "Fernando",
        image: English.src,
      },
  ];

  useEffect(() => {
    logWithTimestamp("Fetching student data...");

    fetchData(`/api/vle/student?studentId=${studentId}`)
      .then((data) => {
        if (data.message) {
          setErrorMessage(data.message);
        } else {
          setStudentData(data);
        }
      })
      .catch((error) => {
        logWithTimestamp("Error: " + error.message);
        setErrorMessage("You are not assigned to any class");
      });
  }, [studentId]);

  return (
    <div>
      {errorMessage ? (
        <div>
          <div className="text-red-500 mb-4">{errorMessage}</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {dummyClasses
              .slice(0, showAllClasses ? dummyClasses.length : 4)
              .map((dummyClass, index) => (
                <Link
                  key={index}
                  href={`/vle/student/${dummyClass.className.toLowerCase()}`} // Redirecting to the class-specific page
                  passHref
                >
                  <div
                    className="border border-gray-300 rounded-lg overflow-hidden cursor-pointer bg-white transform hover:scale-105 hover:shadow-lg hover:bg-green-100 transition-all duration-300"
                  >
                    {/* Upper Part: Class Photo */}
                    <div className="h-40 overflow-hidden">
                      <img
                        src={dummyClass.image}
                        alt={dummyClass.className}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Lower Part: Class Info */}
                    <div className="p-4 bg-green-100">
                      <h2 className="text-lg font-bold">{dummyClass.className}</h2>
                      <p className="text-sm">Grade: {dummyClass.grade}</p>
                      <p className="text-sm">Teacher: {dummyClass.teacher}</p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
          {/* See More Button */}
          <div className="mt-6 text-center">
            <button
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={() => setShowAllClasses(!showAllClasses)}
            >
              {showAllClasses ? "Show Less" : "See More"}
            </button>
          </div>
        </div>
      ) : (
        studentData && (
          <div>
            <h1>{studentData.name}</h1>
            <p>Assigned to class: {studentData.classAssignment}</p>
          </div>
        )
      )}
      <Footer />
    </div>
  );
};

export default StudentClassInfo;
