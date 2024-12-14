import { z } from "zod";
import { TeacherForm } from "./forms";

export type TeacherType = z.infer<typeof TeacherForm>;
