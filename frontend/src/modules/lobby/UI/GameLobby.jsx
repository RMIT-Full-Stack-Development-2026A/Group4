// Dependencies Imports
import { LobbyProvider, useLobby } from '../../../context/GameLobbyContext'
import { STEPS } from '../services/lobby_services'

// Component Imports
import GameMode from '../components/GameMode'
import SelectBoardLayout from '../components/SelectBoardLayout'
import PlayerInfo from '../components/PlayerInfo'
import SelectAi from '../components/SelectAi'
import SelectStarter from '../components/SelectStarter'
import SelectMarkers from '../components/SelectMarkers'
import { BlackButton } from '../../../reusable/CustomButtons'

const LobbyView = () => {
  // Grab navigation and global lobby state from the Context
  const { 
    step, setStep, gameMode, playerInfo, firstPlayer, 
    error, loading, initializeGame 
  } = useLobby();

  return (
    <div className="max-w-6xl py-10 px-4 flex flex-col gap-10">
      
      {step === STEPS.SETUP && (
        <>
          <GameMode />
          <SelectBoardLayout />
          <div className='flex justify-center'>
            <BlackButton 
              disabled={!gameMode} 
              label='Next' 
              onClick={() => setStep(STEPS.PLAYERS)} 
              className="w-64" 
            />
          </div>
        </>
      )}

      {step === STEPS.PLAYERS && (
          <>
              { gameMode === 'MULTIPLAYER' ? <PlayerInfo /> : <SelectAi /> }
              <div className='flex gap-4 mt-8 justify-center'>
                  <BlackButton label='Back' onClick={() => setStep(STEPS.SETUP)} />
                  <BlackButton 
                    disabled={!playerInfo.playerOneName || !playerInfo.playerTwoName}
                    label='Next' 
                    onClick={() => setStep(STEPS.STARTER)} 
                  />
              </div>
          </>
      )}

      {step === STEPS.STARTER && (
          <div className="animate-in fade-in duration-500">
              <SelectStarter isAi={gameMode === 'AI'}/>
              <div className='flex gap-4 mt-12 justify-center'>
                  <BlackButton label='Back' onClick={() => setStep(STEPS.PLAYERS)}/>
                  <BlackButton 
                    disabled={!firstPlayer} 
                    label='Next' 
                    onClick={() => setStep(STEPS.MARKERS)} 
                  />
              </div>
          </div>
      )}

      {step === STEPS.MARKERS && (
          <>
              <SelectMarkers isAi={gameMode === 'AI'} />
              {error && <p className='text-red-500 text-sm text-center mb-4'>{error}</p>}
              <div className='flex gap-4 justify-center'>
                  <BlackButton label='Back' onClick={() => setStep(STEPS.STARTER)} />
                  <BlackButton
                      label={loading ? 'Starting...' : 'Start Game'}
                      disabled={loading}
                      onClick={initializeGame}
                  />
              </div>
          </>
      )}
    </div>
  );
};

// Wraps the view in the Provider
const GameLobby = () => (
    <LobbyProvider>
        <LobbyView />
    </LobbyProvider>
);

export default GameLobby;