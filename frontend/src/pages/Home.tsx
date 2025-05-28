import { Box } from "@mui/material";
import TypingAnimation from "../components/typer/TypingAnimation";

const Home = () => {
    return (
        <Box width={'100%'} height={'100%'} >
            <Box sx={{display: "flex", width: "100%", flexDirection: "column", alignItems: "center", mx: "auto", mt: 3}}>
                <Box>
                    <TypingAnimation />
                </Box>

                <Box sx={{display: "flex", width: "100%", flexDirection: {md:"row", xs:"column"}, gap: 5, my:10}}>
                    <img src="robot.png" alt="robot" style={{width: "10%", margin: "auto"}} />
                    <img className="image-inverted rotation" src="openai.png" alt="openai" style={{width: "10%", margin: "auto"}} />
                </Box>

                <Box sx={{display: "flex", width: "100%", mx: "auto"}}>
                    <img 
                        src="chat.png" 
                        alt="chatbot" 
                        style={{display: "flex", width: "70%", margin: "auto", borderRadius: 20, boxShadow: "-5px -5px 105px #64f3d5", marginTop: 40, marginBottom:40}}
                    />
                </Box>
            </Box>
        </Box>
    );
}

export default Home;