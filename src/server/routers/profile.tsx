import { protectedProcedure, router } from "../trpc";

export const profileRouter = router({
    getUser: protectedProcedure
        .query(async ({ ctx }) => {
            return ctx.session.user;
        }),
})