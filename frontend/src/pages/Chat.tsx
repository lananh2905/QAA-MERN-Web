import { useEffect, useRef, useState } from "react";
import { Box, Typography, IconButton, TextField, Alert, Snackbar, useMediaQuery } from "@mui/material";
import { red } from "@mui/material/colors"
import { useAuth } from "../context/AuthContext";
import { ChatItem } from "../components/chat/ChatItem";
import { IoMdSend } from "react-icons/io";
import { delteteUserChats, sentChatRequest } from "../helpers/api-communicator";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ScrollHis } from "../components/ScrollHis";

type Message = {
    role: string,
    context: string,
    question: string,
    score?: number;
}

const Chat = () => {

    const nav = useNavigate();

    const isSmallScreen = useMediaQuery('(max-width: 1200px');
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const messageEndRef = useRef<HTMLInputElement|null>(null);

    const [showAlert, setShowAlert] = useState(false);

    const questionRef = useRef<HTMLInputElement|null>(null);
    const contextRef = useRef<HTMLInputElement|null>(null);

    const auth = useAuth();

    const [chatMessage, setChatMessage] = useState<Message[]>([]);

    const [ chatId, setChatId] = useState<string>("");

    // Handle Select chat from Scroll His
    const handleSelectChats = (data : any) => {
        setChatId(data.id)
        setChatMessage(data.chat);
    }


    // Handle press send message
    const handleSubmit = async () => {
        const question = questionRef.current?.value as string;
        const context = contextRef.current?.value as string;

        if ( !question || ! context) {
            setShowAlert(true);
            return;
        }

        if(questionRef && questionRef.current) {
            questionRef.current.value = "";
        } 

        const newMessage = {role: "user",context, question};
        setChatMessage((prev) => [...(prev ?? []), newMessage]);
        const chatData = await sentChatRequest(chatId, context, question);
        if(!chatId){
            setRefreshTrigger(prev => prev + 1); 
        }  
        setChatId(chatData.id)
        setChatMessage([...chatData.chat]);  
    }

    // Delete the current conversations
    const handleDeleteChats = async () => {
        try {
            toast.loading("Deleting chats", {id: "deletechats"})
            await delteteUserChats();
            setChatMessage([]);
            toast.success("Delete chats successfully", {id: "deletechats"})
        } catch (error)
        {
            console.log(error);
            toast.error("Delete chats Failed", {id: "deletechats"})
        }
    }

    // Handle delete Context
    const handelDeleteContext = async () => {
        if(contextRef && contextRef.current) {
            contextRef.current.value = "";
        }
    }

    // Auto scroll
    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth"});
    })

    // If not login yet -> go to login
    useEffect(() => {
        if(!auth?.user) {
            nav("/login");
        }

    }, [auth]);

    return(
        /* Divide into 3 element */
        <Box sx={{ 
            display:'flex', 
            flex: 1,  
            width: "100%", 
            height: "100%", 
            mt: 3, 
        }}>
            {!isSmallScreen && (
                <ScrollHis onClickSelectChats = {handleSelectChats} refresh={refreshTrigger}/>
            )}

            {/* Box 2*/}
            <Box sx={{display: "flex", flex: { md: "flex", xs: 1, sm: 1}, flexDirection: "column", px: 3, width: 0.85}}>
                <Typography sx={{ 
                    fontSize: "35px", 
                    color: "white", 
                    mb: 2, 
                    mx: "auto", 
                    fontWeight: "600"
                }}>
                    Model - PEFT
                </Typography>

                <Box sx={{ 
                    width: "97%", 
                    height: "50vh", 
                    borderRadius: 3, 
                    mx:'auto', 
                    display: "flex", 
                    flexDirection: "column", 
                    overflow: "scroll", 
                    overflowX: "hidden",
                    scrollBehavior: "smooth",
                    overflowY: 'auto',
                    scrollbarWidth: 'none', // Firefox
                    '&::-webkit-scrollbar': { display: 'none' }, // Chrome, Safari
                    
                }}>
                    
                    {(chatMessage ?? []).map((chat, index) => (
                        //@ts-ignore
                        <ChatItem   role={chat.role} context={chat.context} question={chat.question} score={chat.score} key={index}/>
                    ))}
                    <div ref={messageEndRef} />

                </Box>

                <Box display={"flex"} flexDirection={"row"} sx={{
                    width:"95%", 
                    padding: "15px", 
                    borderRadius: 8, 
                    backgroundColor: "rgb(0, 0, 0, 0.5)",
                    margin: "auto",
                    marginBottom: "10px",
                }}>

                    <TextField   
                        inputRef={contextRef}
                        multiline
                        fullWidth
                        rows={2}
                        variant="standard"
                        type='text'
                        helperText="Vui lòng nhập văn bản của bạn vào đây."
                        InputProps={{
                            disableUnderline: true,
                            sx: {
                                color: "white",
                                fontSize: "12px",
                                margin: "10px",
                                textAlign: "justify",
                            }
                            }}
                            sx = {{
                            '& textarea': {
                                scrollbarWidth: 'none',       
                                'msOverflowStyle': 'none', 
                                overflowY: 'scroll',          
                                '&::-webkit-scrollbar': {
                                    display: 'none',            
                                },
                            },
                            display: 'flex',
                            height: "auto",
                            border: "none",
                            outline: "none", 
                            color: "white", 
                            fontSize: "12px",
                            
                        }}
                          InputLabelProps={{
                            sx: { color: 'white' }
                        }}
                   />
                    <IconButton onClick= {handelDeleteContext} sx={{
                        ml: "auto", 
                        backgroundColor: red[400], 
                        height: "35px", 
                        width: "35px",  
                        marginX: "20px",
                        ":hover": {
                            bgcolor: "#A6493D",
                        }} }>
                        <img src="delete-icon.png" alt="delete-icon" width={"40px"} color="red"/>
                    </IconButton>
                
                </Box>
               

                <div style={{
                    width:"95%", 
                    padding: "15px", 
                    borderRadius: 25, 
                    backgroundColor:"rgba(0, 0, 0, 0.5)",
                    display: 'flex',
                    margin: "auto",
                    alignItems: "center",
                    alignContent: "center",

                }}>
                    <TextField 
                        
                        inputRef={questionRef}
                        multiline
                        rows={1}
                        variant="standard"
                        type='text'
                        onKeyDown={(e) => {
                            if(e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                handleSubmit();
                            }
                        }}
                        InputProps={{
                            disableUnderline: true,
                            sx: {
                                color: "white",
                                fontSize: "12px"
                            }
                        }}
                        sx = {{
                            width: "100%",
                            borderRadius: 8, 
                            display: 'flex',
                            marginTop: "20px",
                            marginX: "20px",
                            height: "100%",
                            border: "none",
                            outline: "none", 
                            color: "white", 
                            fontSize: "15px",
                            
                        }}
                          InputLabelProps={{
                            sx: { color: 'white' }
                        }}
                    
                   />
                    <IconButton onClick= {handleSubmit} sx={{ml: "auto", color: "white"}}>
                        <IoMdSend style={{fontSize: "35px"}}/>
                    </IconButton>
                </div>

                {/* Alert nếu chưa nhập gì */}
                <Snackbar
                    open={showAlert}
                    autoHideDuration={3000}
                    onClose={() => setShowAlert(false)}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert severity="info" onClose={() => setShowAlert(false)}>
                    Vui lòng nhập văn bản trước khi gửi.
                    </Alert>
                </Snackbar>

            </Box>
        </Box>
    );
}

export default Chat;