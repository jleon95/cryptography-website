import { Request, Response, Router } from 'express';
import { getNewText } from './new_text.service';

const router = Router();

router.post('/text', async (req: Request, res: Response) => {
  const newText: string = await getNewText();
  res.json({ newText });
});

export default router;