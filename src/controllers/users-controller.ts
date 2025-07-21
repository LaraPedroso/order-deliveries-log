import { Request, Response, NextFunction } from "express";
import z from "zod";
import { hash } from "bcrypt";
import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";

class UsersController {
    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const bodySchema = z.object({
                name: z.string().trim().min(2),
                email: z.string().email(),
                password: z.string().min(6),
            });

            const { name, email, password } = bodySchema.parse(request.body);

            const userSameEmail = await prisma.user.findFirst({
                where: { email },
            });

            if (userSameEmail) {
                throw new AppError("User with same email already exists");
            }

            const hashedPassword = await hash(password, 8);

            const user = await prisma.user.create({
                data: { name, email, password: hashedPassword },
            });

            // password não existem dentro de userWithoutPassword, retorna todo restante, mas sem a senha (mais seguro).
            const { password: _, ...userWithoutPassword } = user;

            return response.status(201).json(userWithoutPassword);
        } catch (error) {
            next(error);
        }
    }
}

export { UsersController };
