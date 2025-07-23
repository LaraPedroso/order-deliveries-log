import { DeliveryLogsController } from "@/controllers/deliveries-logs-controller";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";
import { Router } from "express";

const deliveryLogsRoutes = Router();
const deliveryLogsController = new DeliveryLogsController();

deliveryLogsRoutes.post(
    "/",
    ensureAuthenticated,
    verifyUserAuthorization(["sale"]),
    deliveryLogsController.create
);

export { deliveryLogsRoutes };
