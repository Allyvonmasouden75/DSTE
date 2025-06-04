import { t } from "elysia";

export const regData = t.Object({
    username: t.String({
        minLength: 3,
        maxLength: 40,
        error() {
            return {
                success: false,
                message: "Name cannot be less than 3 or more than 40 characters"
            }
        }
    }),

    password: t.String({
        minLength: 6,
        maxLength: 40, 
        error() {
            return {
                success: false,
                message: "Password cannot be less than 6 or more than 40 characters"
            }
        }
    })
});
