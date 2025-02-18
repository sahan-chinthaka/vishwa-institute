"use client";  

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; 
import Footer from "@/components/footer";

interface PageProps {}

const ClassPage: React.FC<PageProps> = () => {
  const [isClient, setIsClient] = useState(false);
  const [activeTab, setActiveTab] = useState("class"); 
  const { className } = useParams(); 
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || !className) {
    return null; 
  }

  // Dummy messages for the class tab
  const classMessages = [
    { sender: "Teacher", message: "WLorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.", dateReceived: new Date("2025-01-11T14:30:00") },
    { sender: "Teacher", message: "Please check the syllabus and assignments. ", dateReceived: new Date("2025-01-11T14:30:00") },
    { sender: "Teacher", message: "Your first assignment is due next week. ", dateReceived: new Date("2025-01-10T10:00:00") },
    { sender: "Teacher", message: "WLorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.", dateReceived: new Date("2025-01-11T14:30:00") },
    { sender: "Teacher", message: "Please check the syllabus and assignments. ", dateReceived: new Date("2025-01-11T14:30:00") },
    { sender: "Teacher", message: "Your first assignment is due next week. ", dateReceived: new Date("2025-01-10T10:00:00") },
  ];

  return (
    <div className="container mx-auto p-4">
      {/* Tab Navigation */}
      <div className="flex justify-center bg-green-600 rounded-t-lg">
        <div
          className="tab-item w-1/3 py-2 text-center cursor-pointer hover:bg-green-700 font-bold"
          onClick={() => setActiveTab("class")}
        >
          Class
        </div>
        <div
          className="tab-item w-1/3 py-2 text-center cursor-pointer hover:bg-green-700 text-bold font-bold"
          onClick={() => setActiveTab("payments")}
        >
          Payments
        </div>
        <div
          className="tab-item w-1/3 py-2 text-center cursor-pointer hover:bg-green-700 font-bold"
          onClick={() => setActiveTab("attendance")}
        >
          Attendance
        </div>
      </div>

      {/* Display Active Tab Content */}
      {activeTab === "class" && (
        <div>
          <h1 className="text-2xl font-bold">
  Welcome to {typeof className === 'string' ? className.charAt(0).toUpperCase() + className.slice(1) : className.join(' ').charAt(0).toUpperCase() + className.join(' ').slice(1)} Class
</h1>
          <p className="mt-2 text-lg">
            Have a happy learning time 
          </p>

          {/* Chat-like view in Class Tab */}
          <div className="font-bold center flex justify-center items-center mx-auto"><h2 className="text-3xl font-bold">Class Messages</h2></div>
          <div className="mt-6 bg-green-100 p-4 w-[900px] h-[500px] center flex justify-center items-center mx-auto">
            <div className="mt-4 space-y-4 overflow-y-auto max-h-[450px]"> {/* Reduced the height */}
              {classMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === 'Teacher' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[90%] p-3 rounded-lg ${ /* Reduced width of messages */
                      msg.sender === 'Teacher' ? 'bg-green-200 text-gray-800' : 'bg-blue-600 text-white'
                    } shadow-md`}
                  >
                    <p className="font-semibold">{msg.sender}</p>
                    <p>{msg.message}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {msg.dateReceived.toLocaleString("en-US", {
                        weekday: 'short', // Mon
                        year: 'numeric', // 2025
                        month: 'short', // Jan
                        day: 'numeric', // 11
                        hour: '2-digit', // 02
                        minute: '2-digit', // 30
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "payments" && (
        <div>
          <h1 className="text-2xl font-bold">Payments for {className}</h1>
          {/* Placeholder for payments section */}
          <p className="mt-2">No payment details available for now.</p>
        </div>
      )}

      {activeTab === "attendance" && (
        <div>
          <h1 className="text-2xl font-bold">Attendance for {className}</h1>
          {/* Placeholder for attendance section */}
          <p className="mt-2">Your attendance record will be displayed here.</p>
        </div>
      )}
      <Footer/>
    </div>
  );
};

export default ClassPage;
