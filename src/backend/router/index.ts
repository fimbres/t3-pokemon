import { initTRPC } from '@trpc/server';
import { z } from "zod";

const trpc = initTRPC.create();

export const appRouter = trpc.router({
    hello: trpc.procedure
        .input(
            z.object({
                text: z.string(),
            }),
        )
        .query(({ input }) => {
            return {
                greeting: `hello ${input.text}`,
            };
        }
    ),
});

export type AppRouter = typeof appRouter;