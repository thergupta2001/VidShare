import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import prisma from "../../../prisma/db";

export const userRouter = router({
    getUsers: publicProcedure.query(async () => {
        return await prisma.user.findMany();
    }),
    
    addUsers: publicProcedure.input(z.object({ email: z.string() }))
    .mutation(async (opts) => {
        const { input } = opts;
        await prisma.user.create({
            data: {
                email: input.email,
            }
        })
    })
})
