"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { getClassById, updateClass } from "../classService";

export default function EditClassPage() {
  const router = useRouter();
  const params = useParams(); // Ensure it's correctly called
  const id = params?.id as string; // Ensure id is a string

  const [className, setClassName] = useState("");
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!id) return; // Prevent running fetch if id is undefined

    async function fetchClass() {
      try {
        const classData = await getClassById(id);
        if (classData) {
          setClassName(classData.name);
          setIsVisible(classData.isVisible);
        }
      } catch (error) {
        console.error("Error fetching class:", error);
      }
    }

    fetchClass();
  }, [id]);

  const handleUpdate = async () => {
    if (!id) return;
    await updateClass(id, { name: className, isVisible });
    router.push("/vle/admin/classes");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Edit Class</h1>
      <input
        type="text"
        value={className}
        onChange={(e) => setClassName(e.target.value)}
        placeholder="Enter class name"
        className="border p-2 w-full mb-4"
      />
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={isVisible}
          onChange={() => setIsVisible(!isVisible)}
        />
        <span>{isVisible ? "Visible" : "Hidden"}</span>
      </label>
      <button onClick={handleUpdate} className="bg-blue-500 text-white p-2 mt-4">
        Update Class
      </button>
    </div>
  );
}
