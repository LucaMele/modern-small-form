import express, { Request, Response } from 'express';

const app = express();
app.use(express.json());

interface CalculationRequest {
  dateOfBirth: string;
  jobType: string;
  location: string;
  applicationDate: string;
}

app.post('/calculate-minimum-wage', (req: Request, res: Response) => {
  const { dateOfBirth, jobType, location, applicationDate }: CalculationRequest = req.body;
  
  const minimumWage = calculateMinimumWage(jobType, location, dateOfBirth, applicationDate);
  res.json({ minimumWage });
});

function calculateMinimumWage(jobType: string, location: string, dob: string, applicationDate: string): number {
  // Mock logic for the minimum wage calculation
  return 15.00; // Example: Return a static minimum wage for now
}

export default app;
