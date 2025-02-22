'use client';

import { useState, useEffect } from 'react';
import Footer from "@/components/footer";
import TextCarousel from "@/components/TextCarousel";
import Teachers from "@/components/teachers";
import Image from "next/image";
import classImage from "@/assets/class.jpg"; 
import Classes from "@/components/classes";

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Will run only on client-side
  }, []);

  if (!isClient) {
    return null; // Prevents SSR mismatch during initial render
  }

  return (
    <main className="flex flex-col items-start justify-start min-h-screen bg-white">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-start text-left p-8 bg-white sm:ml-[1cm] md:ml-[2cm] mb-12">
        {/* Text content */}
        <div className="flex flex-col items-start justify-center mb-8 md:mb-0 md:w-1/2 sm:w-full">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">We Value Your Future!</h2>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl">
            Empowering students with knowledge and resources to thrive in their careers and futures.
          </p>
          <a
            href="#"
            className="inline-block px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
          >
            Get Started
          </a>
        </div>
        {/* Image on the right */}
        <div className="md:w-2/3 w-full">
  <Image src={classImage} alt="Image description" className="w-full h-[500px] object-cover" />
</div>

      </section>

      {/* Announcements Section */}
      <TextCarousel />

      {/* Teachers Section */}
      <Teachers />

      {/* Classes Section - pulled up by 3cm */}
      <div className="mt-[-2cm]">
        <Classes />
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
