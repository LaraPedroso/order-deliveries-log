import { Request, Response, NextFunction } from "express";
import { prisma } from "@/database/prisma";
import z from "zod";

class DeliveryLogsController {
    async create(request: Request, response: Response, next: NextFunction) {
        return response.json({ message: "ok" });
    }
}

export { DeliveryLogsController };
