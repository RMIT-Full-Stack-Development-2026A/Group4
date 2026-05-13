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
    const [ user, setUser ] = useState(null);
    const [loading, setLoading] = useState(true);

    // Checking cookie:
    useEffect(()=>{
        // Defining function:
        const verifyUser = async () => {
            try {
                const response = await httpHelper.get('/auth/me');

                if (response.status === 200) {
                    setUser(response.data.user);
                }
            }
            catch (err) {
                console.log(err);
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

