import { NextApiRequest, NextApiResponse } from 'next';
import Student from '@/models/student';  // Correct path

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Your code for handling requests, for example:
  if (req.method === 'GET') {
    try {
      const student = await Student.findById(req.query.studentId);  // Using Mongoose model
      if (!student) {
        return res.status(404).json({ message: 'You are still not assigned to any class' });
      }
      res.status(200).json(student);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching student data' });
    }
  }
}
