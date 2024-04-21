//import express, express router as shown in lecture code
import { Router } from 'express';
const router = Router();

router.route('/').get(async (_req, res) => {
  return res.json({error: 'Placeholder'});
});

router.route('/applications').get(async (_req, res) => {
  return res.render("applicationList", {});
});

export default router;