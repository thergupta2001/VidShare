import { router } from "./trpc";
import { userRouter } from "./routers/users";
import { videoRouter } from "./routers/videoRouter";
import { profileRouter } from "./routers/profile";

export const appRouter = router({
    user: userRouter,
    video: videoRouter,
    profile: profileRouter,
})

export type AppRouter = typeof appRouter;