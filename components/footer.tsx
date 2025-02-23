const Footer = () => {
  return (
    <footer className="bg-green-50 text-gray-700 py-8 px-6 w-full mt-8 border-t border-gray-300">
      <div className="container mx-auto px-6 pt-5 pb-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {/* Contact Information */}
        <div className="sm:col-span-1">
          <h3 className="text-lg font-semibold mb-2">Get In Touch</h3>
          <p className="text-sm">Vishwa Higher Educational Center</p>
          <p className="text-sm">224/1, Belihuloya</p>
          <p className="text-sm">Balangoda</p>
          <p className="mt-3 text-sm">📞 +012 (345) 678 99</p>
        </div>

        {/* Social Media Links (Follow Us On) */}
        <div className="sm:col-span-1 mt-8 sm:mt-0 md:mt-0">
          <h4 className="text-lg font-semibold mb-2">Follow Us On</h4>
          <div className="flex justify-center sm:justify-start space-x-4">
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
        <div className="sm:col-span-1 mt-8 sm:mt-0 md:mt-0">
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
          <div className="mt-8"> {/* This margin ensures equal spacing between sections */}
            <h3 className="text-lg font-semibold mb-2">Find Us On The Map</h3>
            <iframe
              title="Map showing the location of Vishwa Higher Education Institute"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.982650104286!2d80.69438057348377!3d6.649071721694482!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae3f350634e332f%3A0xa3c2c7ea5024b6a!2sVishwa%20Higher%20Education%20Institute!5e0!3m2!1sen!2slk!4v1736525145346!5m2!1sen!2slk"
              width="100%"
              height="200"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
