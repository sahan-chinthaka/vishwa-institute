import Image from "next/image";
import Footer from "@/components/footer";
import About1 from "@/assets/about1.jpg";
import About2 from "@/assets/about2.jpg";
import Founder from "@/assets/founder.jpg";
import Girl from "@/assets/girl.jpeg";

const ContactUs = () => {
  const aboutPhotos = [About1.src, About1.src, About2.src, About2.src];
  const historyPhotos = [About1.src, About1.src, About2.src, About2.src];
  const teamMembers = [
    {
      id: 1,
      name: "S. Kahingala",
      position: "Founder",
      contactNumber: "+94 712345678",
      email: "kahingala@vishwa.edu",
      photo: Founder.src,
    },
    {
      id: 2,
      name: "Nimal",
      position: "Coordinator",
      contactNumber: "+94 773456789",
      email: "nimal@vishwa.edu",
      photo: Girl.src,
    },
    {
      id: 3,
      name: "Malani",
      position: "Administrator",
      contactNumber: "+94 702345678",
      email: "malani@vishwa.edu",
      photo: Girl.src,
    },
    {
      id: 4,
      name: "Kamal",
      position: "Assistant Manager",
      contactNumber: "+94 752345678",
      email: "kamal@vishwa.edu",
      photo: Girl.src,
    },
  ];

  return (
    <main className="container mx-auto px-4 py-8">
      
      <section className="mb-12">
        <h1 className="text-5xl font-bold text-center mb-6">About Vishwa Institute</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center w-full mb-8">
          {aboutPhotos.map((photo, index) => (
            <Image
              key={index}
              src={photo}
              alt={`About photo ${index + 1}`}
              width={800}
              height={600}
              className="rounded-lg object-cover"
            />
          ))}
		  
        </div>
		<div className="text-gray-700 text-lg text-center">
            <p>
				Vishwa Institute is a premier educational institution dedicated to fostering academic excellence and holistic development. Known for its innovative teaching methods and state-of-the-art facilities, the institute has become a beacon of quality education, catering to diverse academic and professional aspirations.
            <br /><br />
            The institute emphasizes practical learning, integrating modern technology and hands-on experiences into its curriculum to bridge the gap between theoretical knowledge and real-world applications. Its well-stocked libraries, cutting-edge laboratories, and collaborative learning spaces provide students with an environment that encourages exploration and innovation.
          </p>
		  </div>
      </section>

	  <br></br>
	  <br></br>

      
      <section className="mb-12">
        <h2 className="text-5xl font-bold text-center mb-6">Our History</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center w-full mb-8">
          {historyPhotos.map((photo, index) => (
            <Image
              key={index}
              src={photo}
              alt={`History photo ${index + 1}`}
              width={800}
              height={600}
              className="rounded-lg object-cover"
            />
          ))}
          
        </div>
		<div>
		<p className="text-gray-700 text-lg text-center">  

The history of Vishwa Institute is a testament to the transformative power of vision, determination, and commitment to education. Founded by the visionary Mr. S. Kahingala, the institute began as a humble initiative with a singular goal: to provide accessible, high-quality education to students from diverse backgrounds. What started as a small educational center has grown over the years into a renowned institution, widely recognized for its academic excellence, innovative teaching methodologies, and unwavering dedication to nurturing talent.

<br /><br />  

The roots of Vishwa Institute trace back to its early days when Mr. Kahingala identified a critical need for an educational institution that bridged the gap between traditional teaching methods and the demands of an increasingly dynamic and technology-driven world. With limited resources but an abundance of determination, he established the foundation of what would become a beacon of learning. His philosophy was centered around creating a space where students could achieve not only academic success but also holistic personal growth.  

<br /><br />

Over the years, Vishwa Institute expanded its academic offerings, introducing a wide array of programs that cater to the ever-evolving needs of industries and society. The institution was among the pioneers in integrating technology into its curriculum, ensuring that students were equipped with practical knowledge and skills that aligned with global standards. Its commitment to innovation led to the establishment of state-of-the-art facilities, including modern laboratories, digital learning platforms, and collaborative spaces that foster creativity and critical thinking.  

<br /><br />

The institute’s journey has also been marked by significant milestones, including partnerships with leading organizations, the introduction of groundbreaking research initiatives, and the development of community outreach programs that extend the benefits of education beyond the classroom. Through these efforts, Vishwa Institute has become a hub for not just academic learning but also social and economic empowerment.  

<br /><br />

Today, Vishwa Institute stands as a proud symbol of educational excellence, with a legacy built on the values of inclusivity, perseverance, and innovation. It continues to inspire generations of students and educators, staying true to its founder’s vision of shaping a brighter future through the power of education. As it looks to the future, Vishwa Institute remains committed to adapting to the changing landscape of education while staying firmly rooted in its rich history and enduring mission.  
            </p>
		</div>
      </section>

	  <br></br>
	  <br></br>

      <section>
	  <h1 className="text-5xl font-bold text-center mb-6">Founder</h1>
	  </section>
      <section className="mb-12 flex flex-col lg:flex-row items-center gap-8">
        <Image
          src={Founder.src}
          alt="Founder"
          width={400}
          height={400}
          className="rounded-lg object-cover"
        />
        <div>

          <h3 className="text-2xl font-semibold mb-4">Mr. S Kahingala</h3>
          <p className="text-gray-700 text-lg text-justify"> 

Mr. S. Kahingala, the founder of Vishwa Institute, is a trailblazing visionary and an inspiring leader who has dedicated his life to revolutionizing education. With a profound passion for learning and an unwavering commitment to empowering individuals, he established Vishwa Institute to bridge the gap between traditional teaching methods and the evolving demands of the modern world. Drawing from his extensive experience in education and industry, Mr. Kahingala envisioned a platform where students could not only acquire academic knowledge but also develop the skills, creativity, and ethical grounding necessary to thrive in a dynamic, globalized environment.  

<br></br>
<br></br>
Under his guidance, Vishwa Institute has grown into a hub of academic excellence, offering innovative programs tailored to meet the needs of a rapidly changing workforce. His leadership style, marked by inclusivity and forward-thinking, has fostered a culture of innovation and collaboration within the institution. Mr. Kahingala firmly believes in the transformative power of education to uplift communities, and this belief is deeply embedded in the ethos of Vishwa Institute.  
         </p>
        </div>
      </section>

	  <br></br>
	  <br></br>

      
      <section className="mb-12">
        <h2 className="text-5xl font-bold text-center mb-6">Contact Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="relative border rounded-lg shadow-lg p-4 bg-green-200 flex flex-col items-center hover:shadow-xl transition transform hover:scale-105"
            >
              <Image
                src={member.photo}
                alt={member.name}
                width={120}
                height={120}
                className="rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-sm text-gray-500">{member.position}</p>
              <div className="mt-4 w-full p-2 rounded-lg bg-green-300 text-center">
                <p className="text-sm text-gray-700">📞 {member.contactNumber}</p>
                <p className="text-sm text-blue-600">
                  ✉️ <a href={`mailto:${member.email}`}>{member.email}</a>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ContactUs;
