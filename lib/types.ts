import { z } from "zod";
import { TeacherForm } from "./forms";
import { StudentForm } from "./forms";
import { ClassForm } from "./forms";

export type TeacherType = z.infer<typeof TeacherForm>;
export type StudentType = z.infer<typeof StudentForm>; 
export type ClassType = z.infer<typeof ClassForm>; 

