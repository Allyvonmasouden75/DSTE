import Elysia from "elysia";
import { regData } from "../security/validators/validators";
import jwt from "@elysiajs/jwt";
import { eq } from "drizzle-orm"
import { users } from "../../database/schema/schema";
import { mainDb } from "../../database/connection/mainDb";
import argon2 from "argon2"

const JWT_SECRET = process.env.JWT_TOKEN || "somthething><#23$%"

export const loginPlugin = new Elysia()
    .use(jwt({
        name: 'jwt',
        secret: JWT_SECRET
    }))
    .post('/login', async ({ jwt, body, cookie: { auth } }): Promise<{ success: boolean; message: string; token?: string }> => {

        try {
            // select id from users and verify password then assign token
            const userIdArr = await mainDb.select({ id: users.id, password: users.password, name: users.name }).from(users).where(eq(users.name, body.username));

            if (userIdArr.length === 0) {
                return {
                    success: false,
                    message: "User not found!"
                }
            }

            const userId = userIdArr[0].id;
    
            // verify password
            const userPassword = userIdArr[0].password;
    
            const isPassword = await argon2.verify(userPassword, body.password);
    
            if (!isPassword){
                return {
                    success: false,
                    message: "Credentials are not valid try again..."
                }
            }

            // assign id to jwt 
            const value = await jwt.sign({ userId: userId});

            // generate auth cookie
            auth.set({
                value: value,
                secure: false, // place it true when serving in https
                httpOnly: true, // protect xss
                sameSite: 'lax', // use none in https
                maxAge: 7 * 86400,
                domain: undefined, // define root domain starting with . when https
                path: "/" // all routes
            });

            const username = userIdArr[0].name;

            return {
                success: true,
                token: value,
                message: `You have successfully logged in as ${username}`
            }
    
            
        
        } catch (error) {
            return {
                success: false,
                message: error instanceof Error ? error.message
                    : "Server failed to process login request"
            }
        }
        }, {
        body: regData
    })