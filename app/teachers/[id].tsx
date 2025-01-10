import { useState, useEffect } from "react";
import { useRouter } from "next/router"; // Importing useRouter hook from next/router

interface Teacher {
    id: number;
    name: string;
    subject: string;
    photo: string;
  }

  const TeacherPage = () => {
    const router = useRouter();
    const { id } = router.query;
  
    return <div>Teacher ID: {id}</div>;
    
  };
  
  export default TeacherPage;