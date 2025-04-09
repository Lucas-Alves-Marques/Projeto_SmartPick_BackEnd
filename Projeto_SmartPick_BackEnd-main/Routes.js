import express from "express";

import itemRoutes from "./Controllers/ItemController.js";
import categoryRoutes from "./Controllers/CategoryController.js";

const router = express.Router();

router.use("/items", itemRoutes);         
router.use("/categories", categoryRoutes); 


export default router;
