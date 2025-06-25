import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { authMiddleware } from "./middleware/authMiddleware";

/* ROUTE IMPORT */
import applicationRoutes from "./routes/applicationRoutes";
import leaseRoutes from "./routes/leaseRoutes";
import managerRoutes from "./routes/managerRoutes";
import propertyRoutes from "./routes/propertyRoutes";
import tenantRoutes from "./routes/tenantRoutes";

/* CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/properties", propertyRoutes);
app.use("/applications", applicationRoutes);
app.use("/leases", leaseRoutes);
app.use("/tenants", authMiddleware(["tenant"]), tenantRoutes);
app.use("/managers", authMiddleware(["manager"]), managerRoutes);

/* SERVER */
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Rentura Server is running on port ${PORT}`);
});
