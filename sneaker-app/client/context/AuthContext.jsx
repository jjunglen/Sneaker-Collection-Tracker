import { createContext, useState, useEffect, useContext } from "react";

// Start context with null value
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    // useStates
    const [ user, setUser ] = useState(null);
    const [ loading, setLoading ] = useState(true);

    // Check if there is an existing user session
    useEffect(() => {
        try {
            const token = localStorage.getItem("token");
            const savedUser = localStorage.getItem("user");

            if (token && savedUser ) {
                setUser(JSON.parse(savedUser))
            }

        } catch (error) {
            // if error reset user storage
            console.error("Failed to restore auth session:", error);
            localStorage.clear()

        } finally {
            setLoading(false);

        }
    }, []);

    // Function saves the user and token and updates state
    function login(userData, token) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);

    }

    // Function clears localstorage and removes
    function logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null)

    }

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext);

    // Throw an error if the hook is used outside of the AuthProvider
    if (!context) {
        throw new Error("useAuth must be used inside of AuthProvider");
        
    }

    return context;

}

