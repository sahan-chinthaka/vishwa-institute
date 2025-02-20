"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Footer from "@/components/footer";

interface Message {
  sender: string;
  message: string;
  dateReceived: Date;
}

const TeacherClassPage: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [classMessages, setClassMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const { className } = useParams();

  useEffect(() => {
    setIsClient(true);
    // Initialize with dummy data or fetch from an API
    setClassMessages([
      {
        sender: "Teacher",
        message: "Welcome to the class chat.",
        dateReceived: new Date("2025-01-11T14:30:00"),
      },
      {
        sender: "Teacher",
        message: "Don't forget to complete your assignments!",
        dateReceived: new Date("2025-01-10T10:00:00"),
      },
    ]);
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        sender: "Teacher",
        message: newMessage,
        dateReceived: new Date(),
      };
      setClassMessages((prevMessages) => [...prevMessages, message]);
      setNewMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isClient || !className) {
    return null;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">
        Welcome to{" "}
        {typeof className === "string"
          ? className.charAt(0).toUpperCase() + className.slice(1)
          : className.join(" ").charAt(0).toUpperCase() +
            className.join(" ").slice(1)}{" "}
        Class
      </h1>

      <p className="mt-2 text-lg">Manage your class messages here.</p>

      <div className="mt-6 bg-green-100 p-4 w-full max-w-[900px] h-[500px] flex flex-col justify-between items-center mx-auto">
        {/* Message List */}
        <div className="overflow-y-auto w-full flex-grow space-y-4 mb-4">
          {classMessages.map((msg, idx) => (
            <div key={idx} className="flex justify-end">
              <div className="max-w-[90%] p-3 rounded-lg bg-green-200 text-gray-800 shadow-md">
                <p>{msg.message}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {msg.dateReceived.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="w-full flex flex-col items-stretch">
          <textarea
            className="w-full p-2 border rounded-md"
            rows={3}
            placeholder="Type your message here..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="mt-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 self-end"
            onClick={handleSendMessage}
          >
            Send Message
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TeacherClassPage;
