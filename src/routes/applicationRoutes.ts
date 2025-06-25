import express from "express";
import {
  createApplication,
  listApplications,
  updateApplicationStatus
} from "../controllers/applicationControllers";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", authMiddleware(["manager", "tenant"]), listApplications);
router.post("/", authMiddleware(["tenant"]), createApplication);
router.put("/:id/status", authMiddleware(["manager"]), updateApplicationStatus);

export default router;
