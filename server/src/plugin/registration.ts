import Elysia from "elysia";
import { regFunc } from "../function/regFunc";
import { regData } from "../security/validators/validators";

export const regPlugin = new Elysia()
    .post('/register', async ({ body }) => {
        return await regFunc({ body })
    }, {
        body: regData
    })