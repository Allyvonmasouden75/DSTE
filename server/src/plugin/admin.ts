import jwt from "@elysiajs/jwt"
import Elysia from "elysia"

import { getAllUsers } from "../function/adminFunc"

const JWT_SECRET = process.env.JWT_TOKEN || "somthething><#23$%"

export const adminPlugin = new Elysia()
    .use(jwt({
        name: 'jwt',
        secret: JWT_SECRET
    }))
    .get("/allUsers", async ({ jwt, cookie: { auth } }) => {

        const token = auth.value;

        if (!token) return { success: false, message: "Not authorized - no token"};

        const decoded = await jwt.verify(token);

        if (!decoded || typeof decoded !== 'object') return { success: false, message: "Not authorized - invalid token"};

        const { userId } = decoded;

        if (typeof userId !== 'string') return {success: false, message: "invalid data type"}

        return await getAllUsers({ userId });
    })