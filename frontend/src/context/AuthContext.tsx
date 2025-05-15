// Check user login or not
import {checkAuthStatus, LoginUser, SignupUser, userLogout} from "../helpers/api-communicator";
import {createContext, ReactNode, useContext, useEffect, useState} from "react";

type User = {
    name: string;
    email: string;

}

type UserAuth ={
    isLoggedIn: boolean;
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    signup: (name: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}
const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({children}: {children: ReactNode}) => {
     const [user, setUser] = useState<User | null>(null);
     const [isLoggedIn, setIsLoggedIn] = useState(false);

     useEffect(() => {
        // Fetch if user's cookies are valid then skip login
        async function checkStatus(){
            const data = await checkAuthStatus();
            if (data) {
                setUser({name: data.name, email: data.email});
                setIsLoggedIn(true);
            } 
        }
        checkStatus();
     }, []);

     const login = async (email: string, password: string) => {
        const data = await LoginUser(email, password);

        if (data) {
            setUser({name: data.name, email: data.email});
            setIsLoggedIn(true);
        }
     };
     const signup = async (name: string, email: string, password: string) => {
        const data = await SignupUser(name, email, password);

        if (data) {
            setUser({name: data.name, email: data.email});
            setIsLoggedIn(true);
        }
     };
     
     const logout = async () => {
        await userLogout();
        setIsLoggedIn(false);
        setUser(null);
        window.location.reload();
     };

     const value  = {
        isLoggedIn,
        user,
        login,
        signup,
        logout
    };

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
};



export const useAuth = () => useContext(AuthContext);