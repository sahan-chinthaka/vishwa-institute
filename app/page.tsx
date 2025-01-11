import Footer from "@/components/footer";
import Image from "next/image";
import TextCarousel from "@/components/TextCarousel";

export default function Home() {
  return (
    <main className="flex flex-col items-start justify-start min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="flex-1 flex flex-row items-center justify-start text-left p-8 ml-24">
        {/* Text content */}
        <div className="flex flex-col items-start justify-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            We Value Your Future!
          </h2>
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
        <div className="ml-8">
          <img src="./class.png" alt="Image description" className="w-64 h-auto" />
        </div>
      </section>

      {/* Announcements Section */}
      <TextCarousel />

      {/* Footer */}
      <Footer />
    </main>
  );
}
