import { useState } from 'react';
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image';

import { getOptionsForVote } from '@/utils/getRandomPokemon';
import { trpc } from '@/utils/trpc';
import Loading from '@/components/Loading';
import Link from 'next/link';

const Home: NextPage = () => {
  const [ids, setIds] = useState(getOptionsForVote());
  const firstPokemon = trpc.getPokemonById.useQuery({ id: ids.firstId! });
  const secondPokemon = trpc.getPokemonById.useQuery({ id: ids.secondId! });
  const voteMutation = trpc.voteForPokemon.useMutation();

  const voteForRoundest = (selected: number) => {
    if(selected === ids.firstId){
      voteMutation.mutate({ votedFor: selected, votedAgainst: ids.secondId! });
    }
    else{
      voteMutation.mutate({ votedFor: selected, votedAgainst: ids.firstId! });
    }
    
    setIds(getOptionsForVote(selected));
  };

  return (
    <>
      <Head>
        <title>Home Page | T3 Stack by Fimbres</title>
        <meta name="description" content="Example T3 Stack project for educational purposes only." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='bg-gray-800 flex flex-col w-full h-screen justify-center items-center'>
        {firstPokemon.isLoading || secondPokemon.isLoading ? (
          <Loading />
        ) : (
          <>
            <div className='text-5xl text-center mb-16 text-white'>Which Pokémon is Rounder?</div>
            <div className='border rounded-lg p-8 flex flex-col lg:flex-row justify-between items-center'>
              <div className='h-60 bg-gray-700 rounded-md aspect-square flex flex-col justify-center items-center cursor-pointer' onClick={() => voteForRoundest(ids.firstId!)}>
                <Image src={firstPokemon.data?.sprites!} width={150} height={150} alt="First Pokemon"/>
                <div className='capitalize text-xl font-semibold text-white'>{firstPokemon.data?.name}</div>
                <div className='text-regular font-light italic text-white'>Is rounder</div>
              </div>
              <div className='text-2xl my-6 mx-0 lg:mx-12 lg:my-0 font-semibold text-white'>VS</div>
              <div className='h-60 bg-gray-700 rounded-md aspect-square flex flex-col justify-center items-center cursor-pointer' onClick={() => voteForRoundest(ids.secondId!)}>
                <Image src={secondPokemon.data?.sprites!} width={150} height={150} alt="First Pokemon"/>
                <div className='capitalize text-xl font-semibold text-white'>{secondPokemon.data?.name}</div>
                <div className='text-regular font-light italic text-white'>Is rounder</div>
              </div>
            </div>
            <Link href="results" className='mt-6 text-lg underline font-semibold text-white'>See the results!</Link>
          </>
        )}
      </main>
    </>
  )
}

export default Home
