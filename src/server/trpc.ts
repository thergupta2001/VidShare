import { initTRPC, TRPCError } from "@trpc/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const createContext = async ({ req }: { req: any }) => {
    const session = await getServerSession(authOptions);
    return { req, session };
};

const t = initTRPC.context<typeof createContext>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(
    t.middleware(({ ctx, next }) => {
        if (!ctx.session || !ctx.session.user) {
            throw new TRPCError({ code: "UNAUTHORIZED" });
        }
        return next({
            ctx: {
                ...ctx,
                session: { ...ctx.session, user: ctx.session.user },
            },
        });
    })
);