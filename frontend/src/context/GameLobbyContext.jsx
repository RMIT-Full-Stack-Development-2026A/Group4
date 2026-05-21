import { createContext, useContext } from 'react';
import { useGameLobby } from '../modules/lobby/hook/useGameLobby';

const LobbyContext = createContext(null);

export const LobbyProvider = ({ children }) => {

    const lobbyLogic = useGameLobby(); 

    return (
        <LobbyContext.Provider value={lobbyLogic}>
            {children}
        </LobbyContext.Provider>
    );
};

export const useLobby = () => useContext(LobbyContext);