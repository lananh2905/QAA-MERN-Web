import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Logo from "./shared/Logo";
import { useAuth } from "../context/AuthContext";
import NavigationLink from "./shared/NavigationLink";

const Header = () => { 
    const auth = useAuth();
    return (
    <AppBar 
        sx={{ backgroundColor: "transparent", position: "static", boxShadow: "none"}}
    >
        <Toolbar 
            sx={{ display: "flex", marginTop: "20px",  justifyContent: "space-between", alignItems: "center", padding: "0 20px" }}
        >
        
            <Logo />

            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginLeft: "auto",
                marginRight: "20px",
                gap: "20px",
                marginBottom: "20px",
            }}>
                {auth?.isLoggedIn ? (
                    <div>

                        <NavigationLink 
                            bg="#00fffc" 
                            to="/chat" 
                            text="Go To Chat" 
                            textColor="#000000" 
                        />
                        
                        <NavigationLink 
                            bg="#51538f" 
                            to="/" 
                            text="Log Out" 
                            textColor="white" 
                            onClick={auth?.logout}
                        />
                    </div>
                ) : (
                    <div>
                        <NavigationLink 
                            bg="#50fffc" 
                            to="/login" 
                            text="LogIn" 
                            textColor="black"
                        />
                        <NavigationLink 
                            bg="#51538f" 
                            to="/signup" 
                            text="SignUp" 
                            textColor="white" 
                        />
                    </div>
                )
            }
            </div>

        </Toolbar>
    </AppBar>
    );
}

export default Header;