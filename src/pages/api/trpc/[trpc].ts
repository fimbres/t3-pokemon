import * as trpcNext from "@trpc/server/adapters/next"
import { AppRouter, appRouter } from "@/backend/router"
import type { inferRouterOutputs } from '@trpc/server';

export default trpcNext.createNextApiHandler({
    router: appRouter,
    createContext: () => ({}),
});

type RouterOutput = inferRouterOutputs<AppRouter>;
export type GetPokemonByIdOutput = RouterOutput['getPokemonById'];
export type GetAllPokemonsOutput = RouterOutput['getAllPokemons'];
