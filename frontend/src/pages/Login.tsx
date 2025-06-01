import React, { useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import CustomizeInput from "../components/shared/CustomizeInput";
import { GrLogin } from "react-icons/gr";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useNavigate} from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();
    const auth = useAuth();
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email");
        const password = formData.get("password");
        try {
            toast.loading("Logging in...", {id: "login"})
            await auth?.login(email as string, password as string);
            toast.success("Logged in successfully", {id: "login"});
        } catch (error) {
            console.log(error);
            toast.error("Login failed", {id: "login"});
        }
        

    }

    // Go to chat
    useEffect(() => {
        if(auth?.user) {
            navigate("/chat");
        }
    }, [auth])

    return (
        <Box 
            width={"100%"} height={"100%"} display="flex" flex={1} flexDirection={"column"}

        >

            <Box 
                display="flex"
                justifyContent="center"
                alignItems="center"
                mx="auto"
                ml={'auto'}
                mt={16}
            >
                <form 
                    onSubmit={(handleSubmit)}
                    style={{
                    margin: 'auto',
                    padding: '20px',
                    boxShadow: "10px 10px 20px #000000",
                    borderRadius: '10px',
                    border: "none",
                }}>
                    <Box sx={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        justifyContent: 'center'
                    }}>
                        <Typography 
                            variant="h4" 
                            textAlign={"center"} 
                            padding={2}
                            fontWeight={600}
                        >
                            Log in
                        </Typography>
                        <CustomizeInput type="email" name="email" label="Email" />
                        <CustomizeInput type="password" name="password" label="Password" />
                        <Button 
                            type="submit" 
                            variant="contained" 
                            sx={{
                                px: 2, 
                                py: 1,
                                mt: 2,
                                backgroundColor: "#00fffc", 
                                color: "black", 
                                borderRadius: "10px", 
                                fontSize: "20px",
                                "&:hover": {
                                    color: "white",
                                    backgroundColor: "#00fffc",
                                    boxShadow: "10px 10px 20px #000000",
                                    transform: "translateY(-2px)",
                                }
                            }}
                            endIcon= {<GrLogin/>}
                            >
                                {"Log In"}

                        </Button>
                    </Box>
                </form>


            </Box>

        </Box>
    );
}

export default Login;