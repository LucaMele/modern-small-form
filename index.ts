import express, { Request, Response } from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, './dist')));
app.use(express.json());

// Handle API requests
app.post('/api/calculate-minimum-wage', (req: Request, res: Response) => {
  const { dateOfBirth, jobType, location, applicationDate } = req.body;
  
  // Mock calculation logic
  const minimumWage = 15.00; // Example static value
  res.json({ minimumWage });
});

// Serve the frontend (index.html) for any other route
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, './dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
