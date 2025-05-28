import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Box, Avatar, Typography, Button,  IconButton, TextField, Alert, Snackbar, useMediaQuery } from "@mui/material";
import { red } from "@mui/material/colors"
import { useAuth } from "../context/AuthContext";
import { ChatItem } from "../components/chat/ChatItem";
import { IoMdSend } from "react-icons/io";
import { delteteUserChats, getUserChats, sentChatRequest } from "../helpers/api-communicator";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type Message = {
    role: string,
    context: string,
    question: string,
}

const Chat = () => {

    const nav = useNavigate();

    const isSmallScreen = useMediaQuery('(max-width: 1200px');

    const messageEndRef = useRef<HTMLInputElement|null>(null);

    const [showAlert, setShowAlert] = useState(false);

    const questionRef = useRef<HTMLInputElement|null>(null);
    const contextRef = useRef<HTMLInputElement|null>(null);

    const auth = useAuth();

    const [chatMessage, setChatmessage] = useState<Message[]>([]);

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
        setChatmessage((prev) => [...prev, newMessage]);
        const chatData = await sentChatRequest(context, question);
        setChatmessage([...chatData]);   
    }

    // Delete the current conversations
    const handleDeleteChats = async () => {
        try {
            toast.loading("Deleting chats", {id: "deletechats"})
            await delteteUserChats();
            setChatmessage([]);
            toast.success("Delete chats successfully", {id: "deletechats"})
        } catch (error)
        {
            console.log(error);
            toast.error("Delete chats Failed", {id: "deletechats"})
        }
    }

    // Load chats of user from database
    useLayoutEffect(() => {
        if(auth?.isLoggedIn && auth.user) {
            toast.loading("Loading Chats", {id: "loadchats"})
            getUserChats().then((data) => {
                setChatmessage([...data.chats]);
                toast.success("Load Chats successfully", {id: "loadchats"})
            }).catch(err => {
                console.log(err);
                toast.error("Loading Chats Failed", {id: "loadchats"});
            })
        }
    }, [auth]);

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
            gap: 3,
        }}>

            {/* Box 1*/}
            {!isSmallScreen && (
            <Box sx={{display: {md: "flex", xs: "none", sm: "none"}, flex: 0.2, flexDirection: "column"}} >
                <Box sx={{
                    display: "flex", 
                    width: 1, 
                    height: "auto", 
                    bgcolor:"rgb(17,29,39)",
                    borderRadius: 10,
                    flexDirection: "column",
                    mx: 4,
                }} >
                    <Avatar  sx={{
                        scale: 1.2,
                        mx: "auto", 
                        my: 4, 
                        bgcolor: 
                        "white", 
                        color: "black", 
                        fontWeight: 700,
                    }}>
                        { auth?.user?.name[0] }
                        { auth?.user?.name.split(" ")[1][0] }
                    </Avatar>

                    <Typography sx={{
                        display: "flex", 
                        mx: "auto", 
                        fontFamily: "work sans", 
                        fontWeight: "600", 
                        textAlign: "center",
                        fontSize: 25,
                    }}>
                        HỎI - ĐÁP TỪ VĂN BẢN
                    </Typography>


                    <Typography sx={{
                        mx: "30px", 
                        fontFamily: "work sans", 
                        mt: 4, 
                        fontWeight: "400", 
                        textAlign: "justify",
                        fontSize: 15,
                        my: 10,
                    }}
                    >
                        Hãy thêm đoạn văn bản có các chủ đề về Kiến thức, Kinh doanh, Giáo dục, ... vào ô nội dung. 
                        Sau đó các đặt câu hỏi về nội dung đó. 
                        Tránh chia sẻ thông tin cá nhân của bạn.
                    </Typography>

                    <Button 
                        onClick={handleDeleteChats}
                        sx={{
                        width:"250px",
                        height: "50px",
                        mb: "30px", 
                        color:"white", 
                        fontWeight:"700", 
                        borderRadius: 3, 
                        mx: "auto",
                        bgcolor: red[300],
                        fontSize: 15,
                        ":hover": {
                            bgcolor: red.A400,
                        }
                    }}>
                        XÓA ĐOẠN HỘI THOẠI
                    </Button>
                </Box>
            </Box>
            )}


            {/* Box 2*/}
            <Box sx={{display: "flex", flex: { md: "flex", xs: 1, sm: 1}, flexDirection: "column", px: 3, width: 0.8}}>
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
                    height: "58vh", 
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
                    
                    {chatMessage.map((chat, index) => (
                        //@ts-ignore
                        <ChatItem   role={chat.role} context={chat.context} question={chat.question} score={chat.score} key={index}/>
                    ))}
                    <div ref={messageEndRef} />

                </Box>

                <Box display={"flex"} flexDirection={"row"} sx={{
                    width:"95%", 
                    padding: "15px", 
                    borderRadius: 8, 
                    backgroundColor: "rgb(17, 27, 39)",
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
                    backgroundColor: "rgb(17, 27, 39)",
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
                            backgroundColor: "rgb(17, 27, 39)",
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