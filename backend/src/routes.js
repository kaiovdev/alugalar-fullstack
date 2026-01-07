import { Router } from "express";
import SessionController from "./controllers/SessionController.js";
import HouseController from "./controllers/HouseController.js";
import multer from "multer";
import uploadConfig from "./config/upload.js";
import DashboardController from "./controllers/DashboardController.js";
import ReserveController from "./controllers/ReserveController.js";

const routes = new Router();
const upload = multer(uploadConfig);

routes.post("/sessions", SessionController.store);

routes.post("/houses", upload.single("thumbnail"), HouseController.store);
routes.get("/houses", HouseController.index);
routes.delete("/houses/:house_id", HouseController.destroy);

routes.get("/dashboard", DashboardController.show);

routes.post("/houses/:house_id/reserve", ReserveController.store);
routes.get("/reserves", ReserveController.index);
routes.post("/reserves/cancel", ReserveController.cancel);

export default routes;
