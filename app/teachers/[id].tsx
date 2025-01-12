import { useRouter } from "next/router"; // Importing useRouter hook from next/router

  const TeacherPage = () => {
    const router = useRouter();
    const { id } = router.query;
  
    return <div>Teacher ID: {id}</div>;
    
  };
  
  export default TeacherPage;