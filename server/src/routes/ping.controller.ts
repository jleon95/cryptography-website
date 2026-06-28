import { type Request, type Response, Router } from "express";

const router = Router();

router.get("/ping", async (_req: Request, res: Response) => {
  res.send("pong");
});

export default router;
