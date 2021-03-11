import React from 'react'
import { useGame } from 'contexts/game'

export const Summary = () => {
    const { players } = useGame()

    //TODO: Extract player with highest score
    const winner = players[0];


    return (
        <div className='w-full h-full flex flex-col items-center mt-10'>
            <div className='p-10 bg-gray-200 text-gray-800 rounded-lg'>
                <h3 className='font-bold text-3xl'>{winner.name}</h3>
            </div>
        </div>
    )
}
