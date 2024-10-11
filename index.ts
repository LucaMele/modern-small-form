import express, { Request, Response } from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, './dist')));
app.use(express.json());

app.post('/api/calculate-minimum-wage', (req: Request, res: Response) => {
    // TODO get form data
    res.json([
        { title: 'Grundlohn', value: '27.95', editIconColor: 'text-green-600' },
        { title: 'Ferienentschädigung', subtitle: '10.64%', value: '2.97', editIconColor: 'text-green-600' },
        { title: 'Feiertagsentschädigung', subtitle: '3.17%', value: '0.89', editIconColor: 'text-green-600' },
        { title: 'Anteil 13. Monatslohn', subtitle: '8.33%', value: '2.65', editIconColor: 'text-gray-400' },
    ]);
});

app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, './dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
