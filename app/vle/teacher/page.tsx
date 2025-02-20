"use client";
import { useEffect, useState } from "react";
import { logWithTimestamp, fetchData } from "@/lib/utils";
import Link from 'next/link';
import Footer from "@/components/footer";
import Mathematics from "@/assets/mathematics.jpg";
import Science from "@/assets/science.jpeg";
import English from "@/assets/english.png";

const TeacherClassInfo = () => {
  const [classData, setClassData] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showAllClasses, setShowAllClasses] = useState(false);

  const dummyClasses = [
    { className: "Mathematics", grade: "Grade 10", image: Mathematics.src },
    { className: "Science", grade: "Grade 9", image: Science.src },
    { className: "English", grade: "Grade 8", image: English.src },
    { className: "Mathematics", grade: "Grade 10", image: Mathematics.src },
    { className: "Science", grade: "Grade 9", image: Science.src },
    { className: "English", grade: "Grade 8", image: English.src },
    { className: "Mathematics", grade: "Grade 10", image: Mathematics.src },
    { className: "Science", grade: "Grade 9", image: Science.src },
  ];

  const teacherId = 1;

  useEffect(() => {
    logWithTimestamp("Fetching teacher's class data...");

    fetchData(`/api/vle/teacher?teacherId=${teacherId}`)
      .then((data) => {
        if (data.message) {
          setErrorMessage(data.message);
        } else {
          setClassData(data.classes || []);
        }
      })
      .catch((error) => {
        logWithTimestamp("Error: " + error.message);
        setErrorMessage("No classes assigned yet.");
      });
  }, [teacherId]);

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
                  href={`/vle/teacher/${dummyClass.className.toLowerCase()}`} // Redirecting to the class-specific page
                  passHref
                >
                  <div
                    className="border border-gray-300 rounded-lg overflow-hidden cursor-pointer bg-white transform hover:scale-105 hover:shadow-lg hover:bg-green-100 transition-all duration-300"
                  >
                    
                    <div className="h-40 overflow-hidden">
                      <img
                        src={dummyClass.image}
                        alt={dummyClass.className}
                        className="w-full h-full object-cover"
                      />
                    </div>

                
                    <div className="p-4 bg-green-100">
                      <h2 className="text-lg font-bold">{dummyClass.className}</h2>
                      <p className="text-sm">Grade: {dummyClass.grade}</p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
          
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
        classData.length > 0 && (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {classData
                .slice(0, showAllClasses ? classData.length : 4)
                .map((classItem, index) => (
                  <Link
                    key={index}
                    href={`/vle/teacher/${classItem.className.toLowerCase()}`} 
                    passHref
                  >
                    <div
                      className="border border-gray-300 rounded-lg overflow-hidden cursor-pointer bg-white transform hover:scale-105 hover:shadow-lg hover:bg-green-100 transition-all duration-300"
                    >
                      
                      <div className="h-40 overflow-hidden">
                        <img
                          src={classItem.image || Mathematics.src} 
                          alt={classItem.className}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      
                      <div className="p-4 bg-green-100">
                        <h2 className="text-lg font-bold">{classItem.className}</h2>
                        <p className="text-sm">Grade: {classItem.grade}</p>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
            
            <div className="mt-6 text-center">
              <button
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                onClick={() => setShowAllClasses(!showAllClasses)}
              >
                {showAllClasses ? "Show Less" : "See More"}
              </button>
            </div>
          </div>
        )
      )}
      <Footer />
    </div>
  );
};

export default TeacherClassInfo;
