import React from 'react';
import Head from 'next/head';
import { trpc } from '@/utils/trpc';
import Image from 'next/image';

import Loading from '@/components/Loading';

const Results = () => {
    const { data } = trpc.getAllPokemons.useQuery();

    return (
        <>
            <Head>
                <title>Results Page | T3 Stack by Fimbres</title>
                <meta name="description" content="Example T3 Stack project for educational purposes only." />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className='bg-gray-800 flex flex-col w-full h-min-screen py-32 justify-center items-center'>
                {data?.length === 0 ? (
                        <Loading />
                    ) : (
                    <>
                        <div className='text-5xl text-center mb-16 text-white'>Voting Results</div>
                            <div className='min-w-xl flex flex-col justify-between items-center'>
                            {data?.map(pokemonData => {
                                const votePercentage = Math.random() * 100;

                                return (
                                    <div key={pokemonData.name} className='py-12 px-16 mb-5 bg-gray-700 rounded-md w-full flex flex-row justify-between items-center'>
                                        <Image src={pokemonData.url} width={80} height={80} alt="First Pokemon"/>
                                        <div className='ml-6 capitalize text-xl font-semibold text-white'>{pokemonData.name} votes: {votePercentage.toFixed(2)}%</div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}
            </main>
        </>
    )
}

export default Results;
