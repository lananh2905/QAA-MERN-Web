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
                    <img src="ACDHT.png" alt="ACDHT" style={{width: "20%", margin: "auto"}} />
                </Box>

            </Box>
        </Box>
    );
}

export default Home;