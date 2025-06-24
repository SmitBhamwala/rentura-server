import express from "express";
import {
  addFavoriteProperty,
  createTenant,
  getCurrentResidences,
  getTenant,
  removeFavoriteProperty,
  updateTenant,
} from "../controllers/tenantControllers";

const router = express.Router();

router.get("/:cognitoId", getTenant);
router.put("/:cognitoId", updateTenant);
router.get("/:cognitoId/current-residences", getCurrentResidences);
router.post("/", createTenant);
router.post("/:cognitoId/favorites/:propertyId", addFavoriteProperty);
router.delete("/:cognitoId/favorites/:propertyId", removeFavoriteProperty);

export default router;
