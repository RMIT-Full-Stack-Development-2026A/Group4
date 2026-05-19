import React from 'react'
import { markers } from '../services/stylingLayouts'

const SelectMarkers = ({ playerInfo, setPlayerInfo, isAi = false }) => {

    const handleMarkerSelect = (player, markerId) => {
        if (isAi) {
            const aiMarker = markers.find(m => m.id !== markerId)
            setPlayerInfo(prev => ({
                ...prev,
                playerOneMarker: markerId,
                playerTwoMarker: aiMarker.id
            }))
        } else {
            setPlayerInfo(prev => ({ ...prev, [player]: markerId }))
        }
    }

    const playerOneMarker = playerInfo.playerOneMarker
    const playerTwoMarker = playerInfo.playerTwoMarker

    return (
        <div className='flex flex-col gap-8 p-4'>
            <h1 className='text-center text-2xl font-bold'>Choose Your Markers</h1>

            {/* Player One — always shown */}
            <div className='flex flex-col gap-3'>
                <p className='font-semibold'>{playerInfo.playerOneName} — Pick your marker</p>
                <div className='flex gap-3'>
                    {markers.map(marker => (
                        <button
                            key={marker.id}
                            onClick={() => handleMarkerSelect('playerOneMarker', marker.id)}
                            disabled={!isAi && marker.id === playerTwoMarker}
                            className={`w-12 h-12 text-xl rounded-lg border-2 transition-all
                                ${playerOneMarker === marker.id
                                    ? 'border-gray-900 bg-gray-900 text-white'
                                    : 'border-gray-200 hover:border-gray-400'
                                }
                                disabled:opacity-30 disabled:cursor-not-allowed
                            `}
                        >
                            {marker.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Player Two — hidden for AI, auto-assigned */}
            {!isAi ? (
                <div className='flex flex-col gap-3'>
                    <p className='font-semibold'>{playerInfo.playerTwoName} — Pick your marker</p>
                    <div className='flex gap-3'>
                        {markers.map(marker => (
                            <button
                                key={marker.id}
                                onClick={() => handleMarkerSelect('playerTwoMarker', marker.id)}
                                disabled={marker.id === playerOneMarker}
                                className={`w-12 h-12 text-xl rounded-lg border-2 transition-all
                                    ${playerTwoMarker === marker.id
                                        ? 'border-gray-900 bg-gray-900 text-white'
                                        : 'border-gray-200 hover:border-gray-400'
                                    }
                                    disabled:opacity-30 disabled:cursor-not-allowed
                                `}
                            >
                                {marker.label}
                            </button>
                        ))}
                    </div>
                </div>
            ) : playerOneMarker && (
                <p className='text-sm text-gray-500 text-center'>
                    {playerInfo.playerTwoName} will play as: {playerTwoMarker}
                </p>
            )}
        </div>
    )
}

export default SelectMarkers