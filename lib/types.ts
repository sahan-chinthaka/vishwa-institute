import { z } from "zod";
import { TeacherForm } from "./forms";
import { StudentForm } from "./forms";

export type TeacherType = z.infer<typeof TeacherForm>;
export type StudentType = z.infer<typeof StudentForm>;  
