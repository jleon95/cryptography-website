/*
 * API for monoalphabetic cipher
 */
import express = require('express');
const router = express.Router();

router.post('/text', (req: express.Request, res: express.Response) => {
    res.send('Hello, world.');
});

router.post('/hint', (req: express.Request, res: express.Response) => {
    res.send('Hello, world. Here\'s a hint.');
});

router.post('/validation', (req: express.Request, res: express.Response) => {
    res.send('Hello, world. Your solution is correct.');
});

export default router;