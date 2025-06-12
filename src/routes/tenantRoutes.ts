import express from "express";
import { createTenant, getTenant } from "../controllers/tenantControllers";

const router = express.Router();

router.get("/:cognitoId", getTenant);
router.post("/", createTenant);

export default router;
