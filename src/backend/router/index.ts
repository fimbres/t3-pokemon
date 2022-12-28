import { PrismaClient } from '@prisma/client';
import { initTRPC } from '@trpc/server';
import { PokemonClient } from 'pokenode-ts';
import { z } from "zod";

const trpc = initTRPC.create();
const prisma = new PrismaClient();

export const appRouter = trpc.router({
    getPokemonById: trpc.procedure.input(z.object({
        id: z.number(),
    }))
    .query(async request => {
        const api = new PokemonClient();
        const pokemon = await api.getPokemonById(request.input.id);

        return { name: pokemon.name, sprites: pokemon.sprites};
    }),
    voteForPokemon: trpc.procedure.input(z.object({
        votedFor: z.number(),
        votedAgainst: z.number(),
    }))
    .mutation(async request => {
        const voteInDb = await prisma.vote.create({
            data: {
                ...request.input
            }
        });

        return voteInDb;
    })
});

export type AppRouter = typeof appRouter;
