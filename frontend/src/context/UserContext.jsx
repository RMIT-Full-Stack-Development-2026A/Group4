import { useContext, useState, createContext, useEffect } from "react";
// Context needs to handle 3 things:
// State: Storing the user object as a loading boolean
// Persistence: checking cookie when the app first loads
// Actions: login and logout function
// Defining context
const AuthContext = createContext(null);

// Context provider:
export const AuthProvider = ({ children }) => {
    // Defining states: 
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Checking cookie:
    useEffect(()=>{
        // Defining function:
        const verifyUser = async () => {
            try {
                const res = await fetch('http://localhost:3000/auth/me', {
                    method: 'GET',
                    credentials: 'include',
                });
                if (res.ok) {
                    const data = await res.json();
                    setUser(data.user);
                }
            }
            catch (err) {
                throw err;
                setUser(null);
            }
            finally {
                setLoading(false);
            }
        }
        // Call function
        verifyUser();
    }, []);

    // Updating user info:
    const updateUserInfo = (userData) => {
        setUser(userData)
    } 
    // Returning JSX: 
    return (
        <AuthContext.Provider value={{ user, updateUserInfo, loading }} >
            {!loading ? children: <div>loading...</div>}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);

