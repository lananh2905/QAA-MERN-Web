import { Box, Avatar, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

function extractCodeFromString(message: string) {
    if (message.includes("```")) {
        const blocks = message.split("```");
        return blocks;
    }
}

function isCodeBlock(str: string) {
    if (
        str.includes("=") || 
        str.includes(";") || 
        str.includes("[") ||
        str.includes("]") ||
        str.includes("{") ||
        str.includes("}") ||
        str.includes("#") ||
        str.includes("//") 
    ) {
        return true;
    }
}

export const ChatItem = ({role, context, question, score} : {role: string, context: string, question: string, score: number}) => {

    const auth = useAuth();
    const messageBlocks = extractCodeFromString(question);
    // UpperCase first letter
    question = question.charAt(0).toUpperCase() + question.slice(1);

    return (
        role === "assistant" ? (
            <Box 
                display={"flex"}
                flexDirection={"column"}
                sx ={{
                display: "flex",
                p: 1,
                bgcolor: "#4A3341",
                borderRadius: 5,
                my: 1,
            }}>
                <Box display={"flex"} flexDirection={"row"} sx={{gap: 1, marginRight: "20px"}}>
                    <Avatar sx ={{ml: "0", scale: 0.8, backgroundColor: "white"}}>
                        <img src="ACDHT_logo.png" alt="ACDHT_logo" width={"35px"} />
                    </Avatar> 
                    <Box sx={{marginY: "auto"}}>

                        {!messageBlocks && (
                            <Typography sx={{ fontSize: "12px"}}>{question}</Typography>
                        )}
                        {
                            messageBlocks && 
                            messageBlocks.length && 
                            messageBlocks.map(
                                (block) => isCodeBlock(block) ? (
                                    <SyntaxHighlighter 
                                        style={coldarkDark} 
                                        language="javascript"
                                    >
                                    {block}
                                    </SyntaxHighlighter>
                                ) : (
                                    <Typography fontSize={'12px'}>{block}</Typography>
                                )
                            )
                        }

                    </Box>
                </Box>
                <Box sx={{mx: "30px"}}>
                    <Typography fontSize={"12px"}>Score: {score.toFixed(2)}</Typography>
                </Box>

            </Box> 
        ) : (
        <Box display={"flex"} flexDirection={"column"}>

            <Box sx ={{
                display: "flex",
                p: 1,
                bgcolor: "#004d56",
                gap: 1,
                my: 1,
                borderRadius: 5,
                
            }}>
                <Avatar sx ={{ml: "0", bgcolor: "black", color: "white", scale: 0.8}}>
                    <img src="context-icon.png" alt="context-icon" width={"25px"} />
                </Avatar> 
                <Box>

                    {!messageBlocks && (
                        <Typography sx={{ fontSize: "12px", textAlign: "justify", marginRight: "20px"}}>{context}</Typography>
                    )}
                    {
                        messageBlocks && 
                        messageBlocks.length && 
                        messageBlocks.map(
                            (block) => isCodeBlock(block) ? (
                                <SyntaxHighlighter 
                                    style={coldarkDark} 
                                    language="javascript"
                                >
                                 {block}
                                </SyntaxHighlighter>
                            ) : (
                                <Typography sx={{ fontSize: "12px", textAlign: "justify" , marginRight: "20px"}}>{block}</Typography>
                            )
                        )
                    }

                </Box>
            </Box> 

            <Box sx ={{
                display: "flex",
                p: 1,
                bgcolor: "#004d56",
                gap: 1,
                my: 1,
                borderRadius: 5
            }}>
                <Avatar sx ={{ml: "0", bgcolor: "black", color: "white", scale: 0.8}}>
                    { auth?.user?.name[0] }
                    { auth?.user?.name.split(" ")[1][0] }
                </Avatar> 
                <Box>

                    {!messageBlocks && (
                        <Typography sx={{ marginY: "10px", fontSize: "12px", textAlign: "justify", marginRight: "20px"}}>{question}</Typography>
                    )}
                    {
                        messageBlocks && 
                        messageBlocks.length && 
                        messageBlocks.map(
                            (block) => isCodeBlock(block) ? (
                                <SyntaxHighlighter 
                                    style={coldarkDark} 
                                    language="javascript"
                                >
                                 {block}
                                </SyntaxHighlighter>
                            ) : (
                                <Typography sx={{ fontSize: "12px", textAlign: "justify", marginRight: "20px"}}>{block}</Typography>
                            )
                        )
                    }

                </Box>
            </Box> 
            
        </Box>
            
        )
    );
};