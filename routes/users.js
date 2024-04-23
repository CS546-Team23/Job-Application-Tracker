//import express, express router as shown in lecture code
import { Router } from 'express';
import data from '../public/data/jobTrackerApplication.users.json' with { type: "json" };
const router = Router();

router.route('/applications').get(async (_req, res) => {
  const applications = data.find((item) => item._id.$oid==="661b1f0f00d5d86b38607305").applications;
  return res.render("applicationList", {applications:applications});
});

router.route('/applications/:id').get(async (req, res) => {
  const applications = data.find((item) => item._id.$oid==="661b1f0f00d5d86b38607305").applications;
  console.log(applications);
  const application = applications.find((item) => item._id.$oid===req.params.id);
  return res.json(application);
});

export default router;