"use client";

import { useState } from "react";

const TextCarousel = () => {
  const slides = [
    {
      id: 1, // Added unique 'id'
      title: "What is Lorem Ipsum?",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    },
    {
      id: 2,
      title: "Why do we use it?",
      description:
        "It is a long-established fact that a reader will be distracted by the readable content of a page when looking at its layout. Lorem Ipsum is used because it provides a natural distribution of letters.",
    },
    {
      id: 3,
      title: "Where can I get some?",
      description:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words.",
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
