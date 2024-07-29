import { router } from "./trpc";
import { userRouter } from "./routers/users";
import { videoRouter } from "./routers/videoRouter";

export const appRouter = router({
    user: userRouter,
    video: videoRouter
})

export type AppRouter = typeof appRouter;