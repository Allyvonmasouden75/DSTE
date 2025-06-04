import { mainDb } from "../../database/connection/mainDb";
import { users } from "../../database/schema/schema";
import { checkAdmin } from "../helpers/checkAdmin";

// get all users
export const getAllUsers = async ({ userId }: { userId: string }): Promise<{ success: boolean; message: string; data?: unknown }> => {
        try {
        const isAdmin = await checkAdmin({ userId });

        if (!isAdmin.success){
            return {
                success: false,
                message: isAdmin.message || "not authorized"
            }
        }
        const allData = await mainDb.select({ id: users.id, name: users.name, role: users.role }).from(users);

        return {
            success: true,
            message: "successfully fetched all users",
            data: allData
        }
        } catch (error) {
            return{
                success: false,
                message: error instanceof Error ? error.message
                    : "Server failed to process your request"
            }
        }
}

export const deleteUser = async ({ userId }: { userId: string }): Promise<{ success: boolean; message: string }> => {
    try {
        return{
            success: true,
            message: "Successfully deleted a user"
        }
    } catch (error) {
        return{
            success: false,
            message: error instanceof Error ? error.message
                : "server failed to process your request"
        }
    }
}