const Footer = () => {
    return (
      <footer className="bg-green-50 text-gray-700 py-8 w-full">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Get In Touch</h3>
            <p className="text-sm">Vishwa Higher Educational Center</p>
            <p className="text-sm">224/1, Belihuloya</p>
            <p className="text-sm">Balangoda</p>
            <p className="mt-3 text-sm">📞 +012 (345) 678 99</p>
          </div>
  
          {/* Social Media Links */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-2">Follow Us On</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="#" className="text-green-600 hover:text-green-800">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-green-600 hover:text-green-800">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-green-600 hover:text-green-800">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="#" className="text-green-600 hover:text-green-800">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
            <p className="mt-3 text-sm">© 2023 Group3.</p>
          </div>
  
          {/* Email Subscription and Map */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Subscribe</h3>
            <form className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-2 border border-gray-300 rounded-l"
                required
              />
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-r hover:bg-green-700"
              >
                Submit
              </button>
            </form>
            <div className="mt-4">
              <iframe
                title="map"
                className="w-full h-32 rounded-md"
                src="https://www.google.com/maps/embed/v1/place?q=Belihuloya,Sri+Lanka&key=YOUR_GOOGLE_MAPS_API_KEY"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  
  