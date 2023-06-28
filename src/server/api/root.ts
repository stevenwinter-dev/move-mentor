import { createTRPCRouter } from "~/server/api/trpc";
import { movesRouter } from "./routers/moves";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  moves: movesRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
