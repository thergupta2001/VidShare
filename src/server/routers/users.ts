import { z } from "zod";
import { procedure, router } from "../trpc";
import prisma from "../../../prisma/db";

export const userRouter = router({
    getUsers: procedure.query(async () => {
        return await prisma.user.findMany();
    }),
    addUsers: procedure.input(z.object({ email: z.string() }))
    .mutation(async (opts) => {
        const { input } = opts;
        await prisma.user.create({
            data: {
                email: input.email,
            }
        })
    })
})
