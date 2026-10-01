import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import { connectDB } from './Config/db.js';

const port = 4000;
const app = express();

//middleware
app.use(cors());
app.use(express.json({limit: '1mb'}));

//db
await connectDB();
//Routes

app.get('/', (req, res) => {
    res.send('API working');
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});