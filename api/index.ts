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

app.get('/', (req: Request, res: Response) => {
  res.json({ test: 'Hello World' });
});

function calculateMinimumWage(jobType: string, location: string, dob: string, applicationDate: string): number {
  // Mock logic for the minimum wage calculation
  return 15.00; // Example: Return a static minimum wage for now
}

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


export default app;
