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
        try {
            const api = new PokemonClient();
            const pokemon = await api.getPokemonById(request.input.id);
            return { name: pokemon.name, sprites: pokemon.sprites.front_default};
        }
        catch(e){
            console.error("Error: ", e);
            return { name: 'Unexpected error', sprites: null };
        }
    }),
    getAllPokemons: trpc.procedure.query(async () => {
        try {
            const api = new PokemonClient();
            const allPokemons = await api.listPokemons();

            return allPokemons.results;
        }
        catch(e){
            console.error("Error: ", e);
            return [];
        }
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
