"use client";

import { useState } from "react";

const TextCarousel = () => {
  const slides = [
    {
      id: 1, // Added unique 'id'
      title: "2025/2026 A/L Biology classes have begun !",
      description:
        "New tuition classes have begun! Join us now for expert guidance, interactive lessons, and exam-focused learning to achieve your academic goals.",
    },
    {
      id: 2,
      title: "Boost Your Grades with Expert Tutoring!",
      description:
        "Our latest tuition sessions are now open for enrollment! Join us for focused learning, exam preparation, and a supportive study environment to help you excel in your subjects.",
    },
    {
      id: 3,
      title: "Enroll Now..New Science Classes Open!",
      description:
        "Exciting new tuition classes have started! Don't miss the chance to learn from expert tutors with personalized guidance and interactive lessons. Secure your spot today",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState<number>(0); // Ensure type is number

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex !== null ? (prevIndex + 1) % slides.length : 0));
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex !== null ? (prevIndex - 1 + slides.length) % slides.length : slides.length - 1)
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-10 px-4 sm:px-6 md:px-8">
      <h2 className="text-center text-3xl font-bold mb-4 text-black">
        Announcements
      </h2>
      <div className="relative bg-card p-6 shadow-md rounded-md">
        <h3 className="text-lg font-semibold mb-2 text-secondary-foreground">
          {slides[currentIndex].title}
        </h3>
        <p className="text-muted-foreground">{slides[currentIndex].description}</p>

        {/* Navigation */}
        <button
          onClick={handlePrev}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-primary-50 hover:bg-primary-green-600 text-primary-gray-700 rounded-full p-2 transition"
        >
          &#8249;
        </button>
        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-50 hover:bg-primary-green-600 text-primary-gray-700 rounded-full p-2 transition"
        >
          &#8250;
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {slides.map((slide) => (
          <span
            key={slide.id}
            className={`w-3 h-3 rounded-full transition-all ${
              slide.id === slides[currentIndex].id
                ? "bg-primary-green-600"
                : "bg-primary-gray-300"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default TextCarousel;
