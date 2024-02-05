import { Request, Response, Router } from 'express';

const router = Router();

router.post('/validation', (req: Request, res: Response) => {
  res.send('Hello, world. Your solution is correct.');
});

export default router;