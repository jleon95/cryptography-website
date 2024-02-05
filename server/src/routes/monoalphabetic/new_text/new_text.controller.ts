import { Request, Response, Router } from 'express';
import { getNewText } from './new_text.service';
import { preprocessNewText } from './new_text.logic';
import type { PreProcessOptions } from './new_text.logic'

const router = Router();

router.post('/text', async (req: Request, res: Response) => {
  let newText: string = await getNewText();
  newText = preprocessNewText(newText, req.body);
  res.json({ newText });
});

export default router;