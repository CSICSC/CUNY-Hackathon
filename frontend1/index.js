import { handler } from './build/handler.js';
import express from 'express';

const app = express();
const PORT = 3000;

app.use(handler);

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});