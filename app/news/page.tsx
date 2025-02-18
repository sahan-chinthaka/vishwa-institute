"use client"; // Add this line to mark the file as a client component

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "../../components/footer";
import Pricegiving from "../../assets/Price-giving.jpeg";
import Anniversary from "../../assets/anniversary.png";

const NewsPage = () => {
  const [visibleRows, setVisibleRows] = useState(3); // Initially show 3 articles

  const newsArticles = [
    {
      id: 1,
      title: "Price Giving Ceremony of Vishwa Institute",
      date: "Saturday, 04 January 2025",
      description: "Celebrate the achievements of students",
      photo: Pricegiving.src,
      slug: "Price-Giving",
    },
    {
      id: 2,
      title: "Anniversary Celebration of Vishwa Institute",
      date: "Friday, 03 January 2025",
      description: "Celebrate the excellence of 20 years of hard work and growth",
      photo: Anniversary.src,
      slug: "Anniversary-Celebration",
    },
    {
      id: 3,
      title: "Price Giving Ceremony of Vishwa Institute",
      date: "Saturday, 04 January 2025",
      description: "Celebrate the achievements of students",
      photo: Pricegiving.src,
      slug: "Price-Giving",
    },
    {
		id: 4,
		title: "Price Giving Ceremony of Vishwa Institute",
		date: "Saturday, 04 January 2025",
		description: "Celebrate the achievements of students",
		photo: Pricegiving.src,
		slug: "Price-Giving",
	  },
	  {
		id: 5,
		title: "Anniversary Celebration of Vishwa Institute",
		date: "Friday, 03 January 2025",
		description: "Celebrate the excellence of 20 years of hard work and growth",
		photo: Anniversary.src,
		slug: "Anniversary-Celebration",
	  },
	  {
		id: 6,
		title: "Price Giving Ceremony of Vishwa Institute",
		date: "Saturday, 04 January 2025",
		description: "Celebrate the achievements of students",
		photo: Pricegiving.src,
		slug: "Price-Giving",
	  },
	  
	
  
  ];

  const handleShowMore = () => {
    setVisibleRows(visibleRows + 3); 
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsArticles.slice(0, visibleRows).map((article) => (
          <div
            key={article.id}
            className="relative group border rounded-lg shadow-lg overflow-hidden bg-white hover:shadow-xl transition"
          >
            <Image
              src={article.photo} 
              alt={article.title}
              className="w-full h-40 object-cover"
              width={400} 
              height={200} 
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
              <p className="text-sm text-gray-500 mb-4">{article.date}</p>
              <p className="text-gray-700">{article.description}</p>
            </div>
            <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition">
              <Link
                href={`/news/${article.slug}`}
                className="text-white bg-green-600 px-4 py-2 rounded-lg shadow hover:bg-green-700"
              >
                See More
              </Link>
            </div>
          </div>
        ))}
      </div>

      {visibleRows < newsArticles.length && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button
            onClick={handleShowMore}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
          >
            Show More
          </button>
        </div>
      )}

      <Footer />
    </main>
  );
};

export default NewsPage;