import { useContext, createContext } from "react";
import { useAuthLogic } from "../modules/authentication/hooks/useAuthLogic";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const auth = useAuthLogic();

    return (
        <AuthContext.Provider value={auth}>
            {!auth.loading ? (
                children
            ) : (
                <div className="flex h-screen items-center justify-center font-bold animate-pulse text-gray-400 uppercase tracking-widest">
                    Authenticating Session...
                </div>
            )}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);