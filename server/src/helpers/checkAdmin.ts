import { eq } from "drizzle-orm"
import { mainDb } from "../../database/connection/mainDb"
import { users } from "../../database/schema/schema"

export const checkAdmin = async ({ userId }: { userId: string }): Promise<{ success: boolean; message: string}> => {
    const isAdmin = await mainDb.select({ role: users.role}).from(users).where(eq(users.id, userId));

    if (isAdmin[0].role !== "admin"){
        return {
            success: false,
            message: "Only authorized person can use this service"
        }
    }

    return{
        success: true,
        message: "yes is admin"
    }
}