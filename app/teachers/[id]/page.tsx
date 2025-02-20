"use client";

import { useState, useEffect } from "react";
import Girl from "@/assets/girl.jpeg";
import Footer from "@/components/footer";
import { useParams } from "next/navigation";

export default function TeacherDetails() {
  const params = useParams<{id: string}>();
  const teacherId = params.id;

  // Simulated data fetch (replace with actual API calls)
  const teachers = [
    {
      id: 1,
      name: "John Doe",
      subject: "Math",
      stream: "Physical Science",
      medium: "Sinhala",
      experience: "27 years",
      photo: Girl.src,
      classes: [
        { year: 2026, type: "Theory" },
        { year: 2025, type: "Theory, Revision" },
        { year: 2024, type: "Paper" },
        { year: 2026, type: "Theory" },
        { year: 2025, type: "Theory, Revision" },
        { year: 2024, type: "Paper" },
      ],
      About: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.",

      education: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.",
    },
  ];

  const teacher = teachers.find((t) => t.id === parseInt(teacherId));

  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size and set mobile flag
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 718) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Check on initial load

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!teacher) {
    return <div>Teacher not found!</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      {/* Header Section */}
      <section>
        <div
          className={`flex ${isMobile ? "flex-col" : "flex-row"} md:items-center md:mb-20 sm:mb-10`}
          style={{
            height: isMobile ? "auto" : "600px",
          }}
        >
          {/* Photo Section */}
          <div className="flex-1">
            <img
              src={teacher.photo}
              alt={teacher.name}
              style={{
                width: "100%",
                height: isMobile ? "300px" : "90%",
                borderRadius: "10px",
                objectFit: "cover",
              }}
            />
          </div>

          {/* Content Section */}
          <div
            className={`${
              isMobile ? "w-full" : "md:w-1/2"
            } bg-green-100 p-4 text-black rounded-lg md:ml-5 md:mr-20 flex flex-col justify-between`}
            style={{
              height: isMobile ? "auto" : "70%",
            }}
          >
            <h1 className="text-4xl font-bold">{teacher.name}</h1>
            <p>
              <strong>Subject:</strong> {teacher.subject}
            </p>
            <p>
              <strong>Stream:</strong> {teacher.stream}
            </p>
            <p>
              <strong>Medium:</strong> {teacher.medium}
            </p>
            <p>
              <strong>Experience:</strong> {teacher.experience}
            </p>
            <p>
              <strong>Classes:</strong>
              {teacher.classes.map((c, index) => (
                <span key={index} style={{ display: "block" }}>
                  {c.year} - {c.type}
                </span>
              ))}
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className={`mt-5 mb-10 ${isMobile ? "sm:mt-5" : "md:mt-10"}`}>
        <h1 className="font-bold mb-2 text-4xl text-center">About</h1>
        <br />
        <br />
        <p className="text-justify">{teacher.About}</p>
      </section>

      {/* Education Section */}
      <section className={`mb-10 ${isMobile ? "sm:mt-5" : "md:mt-10"}`}>
        <h2 className="font-bold mb-2 text-4xl text-center">Education</h2>
        <br />
        <br />
        <p className="text-justify">{teacher.education}</p>
      </section>

      <Footer />
    </div>
  );
}
