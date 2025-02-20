"use client";

import { useState, useEffect } from "react";
import ClassImage from "@/assets/class.png"; // Placeholder image
import { useParams } from "next/navigation";

interface ClassDetails {
  id: number;
  subject: string;
  grade: string;
  description: string;
  schedule: string;
  image: string;
}

async function fetchClassDetails(classId: string): Promise<ClassDetails> {
  const classes = [
    {
      id: 1,
      subject: "Math",
      grade: "Grade 6",
      description: "Fundamentals of algebra, geometry, and basic arithmetic.",
      schedule: "Mon-Fri: 10 AM - 12 PM",
      image: ClassImage.src,
    },
    {
      id: 2,
      subject: "Math",
      grade: "Grade 7",
      description: "Building on algebra, geometry, and introducing fractions.",
      schedule: "Mon-Fri: 1 PM - 3 PM",
      image: ClassImage.src,
    },
    {
      id: 3,
      subject: "Math",
      grade: "Grade 8",
      description: "Advanced algebra, geometry, and an introduction to statistics.",
      schedule: "Mon-Wed: 9 AM - 11 AM",
      image: ClassImage.src,
    },
    {
      id: 4,
      subject: "Math",
      grade: "Grade 9",
      description: "Algebra, linear equations, and introduction to quadratic functions.",
      schedule: "Tue-Thu: 11 AM - 1 PM",
      image: ClassImage.src,
    },
    {
      id: 5,
      subject: "Math",
      grade: "Grade 10",
      description: "Exploring trigonometry, algebraic expressions, and quadratic functions.",
      schedule: "Mon-Fri: 2 PM - 4 PM",
      image: ClassImage.src,
    },
    {
      id: 6,
      subject: "Math",
      grade: "Grade 11",
      description: "Calculus, advanced algebra, and geometry problems.",
      schedule: "Mon-Fri: 10 AM - 12 PM",
      image: ClassImage.src,
    },
    {
      id: 7,
      subject: "Science",
      grade: "Grade 6",
      description: "Introduction to biology, chemistry, and basic physics concepts.",
      schedule: "Mon-Wed: 3 PM - 5 PM",
      image: ClassImage.src,
    },
    {
      id: 8,
      subject: "Science",
      grade: "Grade 7",
      description: "Understanding basic chemistry, biology, and physics principles.",
      schedule: "Mon-Fri: 9 AM - 11 AM",
      image: ClassImage.src,
    },
    {
      id: 9,
      subject: "Science",
      grade: "Grade 8",
      description: "Advanced biology and chemistry concepts with introductory physics.",
      schedule: "Tue-Thu: 12 PM - 2 PM",
      image: ClassImage.src,
    },
    {
      id: 10,
      subject: "Science",
      grade: "Grade 9",
      description: "Learning biology, chemistry, physics, and environmental science.",
      schedule: "Mon-Fri: 1 PM - 3 PM",
      image: ClassImage.src,
    },
    {
      id: 11,
      subject: "Science",
      grade: "Grade 10",
      description: "Deep dive into chemistry and physics with practical experiments.",
      schedule: "Mon-Wed: 2 PM - 4 PM",
      image: ClassImage.src,
    },
    {
      id: 12,
      subject: "Science",
      grade: "Grade 11",
      description: "Exploring organic chemistry, advanced biology, and physics.",
      schedule: "Tue-Thu: 10 AM - 12 PM",
      image: ClassImage.src,
    },
    {
      id: 13,
      subject: "English",
      grade: "Grade 6",
      description: "Basic grammar, reading, writing skills, and comprehension exercises.",
      schedule: "Mon-Fri: 8 AM - 10 AM",
      image: ClassImage.src,
    },
    {
      id: 14,
      subject: "English",
      grade: "Grade 7",
      description: "Improved writing, advanced grammar, and vocabulary exercises.",
      schedule: "Mon-Wed: 1 PM - 3 PM",
      image: ClassImage.src,
    },
    {
      id: 15,
      subject: "English",
      grade: "Grade 8",
      description: "Advanced writing skills, literature analysis, and grammar.",
      schedule: "Tue-Thu: 9 AM - 11 AM",
      image: ClassImage.src,
    },
    {
      id: 16,
      subject: "English",
      grade: "Grade 9",
      description: "Literary analysis, essay writing, and comprehension skills.",
      schedule: "Mon-Fri: 12 PM - 2 PM",
      image: ClassImage.src,
    },
    {
      id: 17,
      subject: "English",
      grade: "Grade 10",
      description: "Critical thinking, literature studies, and essay writing.",
      schedule: "Mon-Wed: 8 AM - 10 AM",
      image: ClassImage.src,
    },
    {
      id: 18,
      subject: "English",
      grade: "Grade 11",
      description: "Advanced literary analysis, research papers, and language skills.",
      schedule: "Tue-Thu: 3 PM - 5 PM",
      image: ClassImage.src,
    },
  ];
  return classes.find((classItem) => classItem.id === parseInt(classId))!;
}

export default function ClassDetailsPage() {
  const params = useParams<{classId: string}>();
  
  const [classDetails, setClassDetails] = useState<ClassDetails | null>(null);

  useEffect(() => {
    async function loadClassDetails() {
      const data = await fetchClassDetails(params.classId);
      setClassDetails(data);
    }
    loadClassDetails();
  }, [params.classId]);

  if (!classDetails) {
    return <div>Class not found!</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      {/* Class Header Section */}
      <section>
        <div className="flex flex-col md:flex-row items-center md:mb-20 sm:mb-10">
          {/* Class Image Section */}
          <div className="flex-1">
            <img
              src={classDetails.image}
              alt={classDetails.subject}
              style={{
                width: "100%",
                height: "300px",
                borderRadius: "10px",
                objectFit: "cover",
              }}
            />
          </div>

          {/* Class Content Section */}
          <div className="md:w-1/2 bg-green-100 p-4 text-black rounded-lg md:ml-5">
            <h1 className="text-4xl font-bold">{classDetails.subject}</h1>
            <p><strong>Grade:</strong> {classDetails.grade}</p>
            <p><strong>Description:</strong> {classDetails.description}</p>
            <p><strong>Schedule:</strong> {classDetails.schedule}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
