import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";

export default function NewClassForm() {
  const [classId, setClassId] = useState("");
  const [className, setClassName] = useState("");
  const [overview, setOverview] = useState("");
  const [classTimes, setClassTimes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // Added error state for better user feedback

  // Explicitly typing the event 'e' as React.FormEvent<HTMLFormElement>
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // Prevents the default form submission behavior
    setLoading(true); // Set the loading state to true
    setError(""); // Clear any previous errors

    // Validate the inputs before making the API request
    if (!classId || !className || !overview || !classTimes) {
      setError("All fields are required!"); // Show an error if any field is empty
      setLoading(false); // Stop the loading spinner
      return;
    }

    try {
      // Sending data to the backend using axios
      const response = await axios.post("/api/vle/admin/classes/add", {
        classId,
        className,
        overview,
        classTimes,
      });

      // Handle successful response
      if (response.data.success) {
        alert("Class added successfully!");
        setClassId("");
        setClassName("");
        setOverview("");
        setClassTimes("");
      } else {
        setError("Failed to add class. Please try again."); // Handle failure
      }
    } catch (error) {
      console.error("Error adding class:", error); // Log error
      setError("An error occurred while adding the class. Please try again.");
    } finally {
      setLoading(false); // Stop the loading spinner after the request is complete
    }
  }

  return (
    <div className="p-5 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Create New Class</h2>

      {/* Display error message if there is one */}
      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

      {/* Form submit event will trigger the handleSubmit function */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="classId" className="block font-medium">Class ID</label>
          <input
            id="classId"
            type="text"
            value={classId}
            onChange={(e) => setClassId(e.target.value)} // Updates classId state
            required
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <label htmlFor="className" className="block font-medium">Class Name</label>
          <input
            id="className"
            type="text"
            value={className}
            onChange={(e) => setClassName(e.target.value)} // Updates className state
            required
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <label htmlFor="overview" className="block font-medium">Class Overview</label>
          <textarea
            id="overview"
            value={overview}
            onChange={(e) => setOverview(e.target.value)} // Updates overview state
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <label htmlFor="classTimes" className="block font-medium">Class Times</label>
          <input
            id="classTimes"
            type="text"
            value={classTimes}
            onChange={(e) => setClassTimes(e.target.value)} // Updates classTimes state
            className="w-full p-2 border rounded-md"
          />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Class"}
        </Button>
      </form>
    </div>
  );
}
