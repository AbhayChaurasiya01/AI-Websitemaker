import { createContext } from  "react";
import { getMe } from "../utlis/api";

const AuthContext =createContext();

export const AuthProvider =({children}) => {
        const [user ,setUser] = useState(null);
        const [loading ,setloading] = useState(true);

        useEffect(() => {
            const token =localStorage.getItem("token");
            const savedUser = localStorage.getItem("user");

            if(token && savedUser) {
                setUser(JSON.parse(savedUser));

                getMe()
                .then(({user}) => {
                    setUser(user);
                    localStorage.setItem("user",JSON.stringify(user));
                })
                .catch(() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    setUser(null)
                })
                .finally(() => setloading(false));
            } else {
                setloading(false);
            }
        },[]);
        const loginUser = (token,userData) =>{
            localStorage.setItem("token",token);
            localStorage.setItem("user",JSON.stringfy(userData));
            setUser(userData);
        }
        // to logout
        const logoutUser = () => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setUser(null);
        }
        //to update user profile for (credits too)
        const updateUser = (userData) => {
            setUser(userData);
            if(userData) localStorage.setItem("user",JSON.stringify(userData));

        }
    return (
        <AuthContext.Provider value={{
            user, loading,
            loginUser,
            logoutUser,
            updateUser,
            setUser,
          }}
        >
            {children}
        </AuthContext.Provider>
    );
};


//to create a custom hook
export const useAuth =() => useContext(AuthContext);
