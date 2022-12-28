import { initTRPC } from '@trpc/server';
import { PokemonClient } from 'pokenode-ts';
import { z } from "zod";

const trpc = initTRPC.create();

export const appRouter = trpc.router({
    getPokemonById: trpc.procedure.input(z.object({
        id: z.number(),
    }))
    .query(async request => {
        const api = new PokemonClient();
        const pokemon = await api.getPokemonById(request.input.id);
              
        return pokemon;
    })
});

export type AppRouter = typeof appRouter;