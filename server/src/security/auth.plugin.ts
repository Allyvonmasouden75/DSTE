// auth.plugin.ts
import jwt from "@elysiajs/jwt";
import Elysia from "elysia";

const JWT_SECRET = process.env.JWT_TOKEN || "somthething><#23$%";

type AuthResult = 
  | { success: true; userId: string }
  | { success: false; message: string; status?: number };

export const authPlugin = new Elysia()
    .use(jwt({
        name: 'jwt',
        secret: JWT_SECRET
    }))
    .derive(async ({ jwt, cookie: { auth }, set }) => {
        const verifyToken = async (): Promise<AuthResult> => {
            const token = auth.value;
            
            if (!token) {
                set.status = 401;
                return {
                    success: false,
                    message: "Not authorized - no token",
                    status: 401
                };
            }

            const decoded = await jwt.verify(token);
            
            if (!decoded || typeof decoded !== 'object') {
                set.status = 401;
                return {
                    success: false,
                    message: "Not authorized - invalid token",
                    status: 401
                };
            }

            const { userId } = decoded;
            
            if (typeof userId !== 'string') {
                set.status = 400;
                return {
                    success: false,
                    message: "Invalid data type",
                    status: 400
                };
            }

            return { success: true, userId };
        };

        return { verifyToken };
    });