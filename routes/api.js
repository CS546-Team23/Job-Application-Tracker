//import express, express router as shown in lecture code
import { Router } from 'express';
import data from '../public/data/jobTrackerApplication.users.json' with { type: "json" };
import val from '../helpers.js';
const router = Router();

router.route('/').get(async (_req, res) => {
  return res.json(data);
});

router.route('/:id').get(async (req, res) => {
  const found = data.find((item) => item._id.$oid===req.params.id);
  return res.json(found);
});

router.route('/applications/:id').get(async (req, res) => {
  //code here for GET THIS ROUTE SHOULD NEVER FIRE BECAUSE OF MIDDLEWARE #1 IN SPECS.
  const found = data.find((item) => item._id.$oid===req.params.id);
  return res.json(found.applications);
});


export default router;
// http://localhost:3000/api/applications/661b1f0f00d5d86b38607305