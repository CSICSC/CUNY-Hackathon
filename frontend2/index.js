import { handler } from './build/handler.js';
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3002;

app.use(handler);

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});