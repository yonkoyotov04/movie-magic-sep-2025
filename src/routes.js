import { Router } from "express";
import homeController from "./controllers/homeController.js";
import movieController from "./controllers/movieController.js";

const router = Router();

router.use(homeController);
router.use(movieController);

export default router;