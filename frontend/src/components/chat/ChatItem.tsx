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

export const ChatItem = ({role, context, question} : {role: string, context: string, question: string}) => {

    const auth = useAuth();
    const messageBlocks = extractCodeFromString(question);

    return (
        role === "assistant" ? (
            <Box sx ={{
                display: "flex",
                p: 2,
                bgcolor: "#004d5612",
                my: 2,
                gap: 2
            }}>
                <Avatar sx ={{ml: "0"}}>
                    <img src="openai.png" alt="openai" width={"30px"} />
                </Avatar> 
                <Box>

                    {!messageBlocks && (
                        <Typography sx={{ fontSize: "20px"}}>{question}</Typography>
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
                                <Typography fontSize={'20px'}>{block}</Typography>
                            )
                        )
                    }

                </Box>
            </Box> 
        ) : (
        <Box display={"flex"} flexDirection={"column"}>

            <Box sx ={{
                display: "flex",
                p: 2,
                bgcolor: "#004d56",
                gap: 2,
                my: 2,
            }}>
                <Avatar sx ={{ml: "0", bgcolor: "black", color: "white"}}>
                    <img src="context-icon.png" alt="context-icon" width={"32px"} />
                </Avatar> 
                <Box>

                    {!messageBlocks && (
                        <Typography sx={{ fontSize: "20px"}}>{context}</Typography>
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
                                <Typography fontSize={'20px'}>{block}</Typography>
                            )
                        )
                    }

                </Box>
            </Box> 

            <Box sx ={{
                display: "flex",
                p: 2,
                bgcolor: "#004d56",
                gap: 2,
                my: 2,
            }}>
                <Avatar sx ={{ml: "0", bgcolor: "black", color: "white"}}>
                    { auth?.user?.name[0] }
                    { auth?.user?.name.split(" ")[1][0] }
                </Avatar> 
                <Box>

                    {!messageBlocks && (
                        <Typography sx={{ fontSize: "20px"}}>{question}</Typography>
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
                                <Typography fontSize={'20px'}>{block}</Typography>
                            )
                        )
                    }

                </Box>
            </Box> 
            
        </Box>
            
        )
    );
};