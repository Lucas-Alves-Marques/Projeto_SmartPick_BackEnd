import express from "express";

import itemRoutes from "./Controllers/ItemController.js";
import categoryRoutes from "./Controllers/CategoryController.js";
import raffleRoute from "./Controllers/raffleController.js";

const router = express.Router();

router.use("/items", itemRoutes);         
router.use("/categories", categoryRoutes); 
router.use("/raffle", raffleRoute); 


export default router;
