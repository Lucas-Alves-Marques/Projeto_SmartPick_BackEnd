import express from "express";

import raffleRoute from "./Controllers/raffleController.js";

const router = express.Router();

router.use("/raffle", raffleRoute); 

export default router;
