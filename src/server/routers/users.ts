// import AppRouter from "next/dist/client/components/app-router";
import { z } from "zod";
import { procedure, router } from "../trpc";

export const userRouter = router({
    getUsers: procedure.query(() => {
        return [
            {name: "Rohan", last: "Gupta"},
            {name: "Mohit", last: "Gupta"},
        ]
    }),
    addUsers: procedure.input(z.object({ name: z.string(), last: z.string() }))
    .mutation((opts) => {
        const { input } = opts;
    })
})
