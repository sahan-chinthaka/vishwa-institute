import Image from "next/image";
import Footer from "../../../components/footer";
import Pricegiving from "../../../assets/Price-giving.jpeg";


const article = {
    id: 1,
    title: "Price Giving of Vishwa Institute",
    date: "Friday, 03 January 2025",
    description: "Celebrate the excellence of students",
    photo: Pricegiving.src,
    slug: "price-giving",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  }



const NewsDetailPage = async () => {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Image
          src={article.photo}
          alt={article.title}
          className="mx-auto object-cover"
          width={400}
          height={300}
        />
        <h1 className="text-3xl font-bold mt-4">{article.title}</h1>
        <p className="text-sm text-gray-500">{article.date}</p>
        <p className="mt-4 text-gray-700">{article.content}</p>
      </div>
      <Footer />
    </main>
  );
};

export default NewsDetailPage;
