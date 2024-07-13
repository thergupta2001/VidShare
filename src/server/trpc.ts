import { initTRPC, TRPCError } from "@trpc/server";
import { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const createContext = async (opts: CreateNextContextOptions) => {
    const session = await getServerSession(opts.req, opts.res, authOptions);
    return { session };
}

const t = initTRPC.context<typeof createContext>().create();

// const trpc = initTRPC.create();

export const router = t.router;
export const procedure = t.procedure;

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
)