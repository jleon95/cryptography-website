import { Request, Response, Router } from 'express';

const router = Router();

router.post('/hint', (req: Request, res: Response) => {
  res.send('Hello, world. Here\'s a hint.');
});

export default router;