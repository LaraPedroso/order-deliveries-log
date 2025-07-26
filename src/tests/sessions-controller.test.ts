import { app } from "@/app";
import { prisma } from "@/database/prisma";
import request from "supertest";

describe("SessionsController", () => {
    let user_id: string;

    afterAll(async () => {
        await prisma.user.delete({ where: { id: user_id } });
    });

    it("should authenticate a user and get access token", async () => {
        const user = await request(app).post("/users").send({
            name: "Auth Test User",
            email: "authtest@example.com",
            password: "123456",
        });

        user_id = user.body.id;

        const session = await request(app).post("/sessions").send({
            email: "authtest@example.com",
            password: "123456",
        });

        expect(session.status).toBe(201);

        // verifica se o token foi retornado e se é uma string
        expect(session.body.token).toEqual(expect.any(String));
    });
});
