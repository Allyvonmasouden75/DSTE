import { mainDb } from "../../database/connection/mainDb";
import { users } from "../../database/schema/schema";
import { hashPassword } from "../security/hashPassword";
import { eq } from "drizzle-orm"

export const regFunc = async ({ body }: { body: { username: string; password: string } }): Promise<{ success: boolean; message: string; }> => {
    try {
        const hashedPassword = await hashPassword(body.password);

        // check if user exists
        const isExist = await mainDb.select({ id: users.id }).from(users).where(eq(users.name, body.username));

        if (isExist.length > 0){
            return {
                success: false,
                message: "User already exist"
            }
        }

        // save to database
        await mainDb.insert(users).values({
            name: body.username,
            password: hashedPassword
        });

        return {
            success: true,
            message: "You have successfully registered"
        }
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message
            : "Failed to process registration request"
        }
    }
}