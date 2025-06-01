
import { useAuth } from "../context/AuthContext";
import { useLayoutEffect, useState } from "react";
import { Box, Avatar, Typography, Button } from "@mui/material";
import { grey } from "@mui/material/colors"
import {getChatwithId, getUserChats, } from "../helpers/api-communicator";
import toast from "react-hot-toast";
import HistoryButton from "./shared/HistoryButton";

type Title = {
    title: string;
    id: string;
    createdAt: Date;
};


export const ScrollHis = ( {onClickSelectChats, refresh}  : {onClickSelectChats: (data: any) => void, refresh: number}) => {

    const [ chatTitle, setChatTitle] = useState<Title[]>([]);

    const auth = useAuth();


    // Handle onclick select chats
    const handelClick = async ( chatid: string) => {
        const res = await getChatwithId(chatid); 
        onClickSelectChats(res.chats);
    }

    // Handle clink new chat
    const handleClickNewChat = async () => {
        onClickSelectChats([]);
    } 

    // Load chats of user from database
    useLayoutEffect(() => {
        if(auth?.isLoggedIn && auth.user) { 

            toast.loading("Loading Chats", {id: "loadchats"})

            getUserChats().then((data) => {
                
                setChatTitle([...data.chats]);
                
                toast.success("Load Chats successfully", {id: "loadchats"})
            }).catch(err => {
                console.log(err);
                toast.error("Loading Chats Failed", {id: "loadchats"});
            })
        }
    }, [auth, refresh]);


    return (

            <Box sx={{   
                    display: "flex",
                    lexDirection: "column",
                    height: "85vh", 
                    width: 0.22,
                    borderRadius: 5,  
                    
                }}>
                <Box sx={{
                    display: "flex", 
                    width: 1, 
                    height: "flex", 
                    borderRadius: 5,
                    flexDirection: "column",
                    mx: 4,
                    mb: 2,
                    bgcolor:"rgba(0, 0, 0, 0.3)",
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

                    <Button 
                        onClick={handleClickNewChat}
                        sx={{ width: 0.9, height: "50px", alignSelf: "center", mt: 10, gap: 3, ":hover":{bgcolor: grey[700]}, borderRadius: 3}}>
                            <img src="addIcon.png" alt="Add Icon" /> 
                            <Typography >Thêm cuộc trò chuyện</Typography>
                    </Button>


                    <Box 
                        display={"flex"}
                        flexDirection={"column"} 
                        component={"div"} 
                        sx = {{
                            margin: 2,
                            marginTop: 5,
                            overflow: "scroll", 
                            overflowX: "hidden",
                            scrollBehavior: "smooth",
                            overflowY: 'auto',
                            scrollbarWidth: 'none', // Firefox
                            '&::-webkit-scrollbar': { display: 'none' }, // Chrome, Safari}} 
                        }}
                    >
                        {[...chatTitle]
                            .sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                            .map((chat) => (
                            <Box>
                            <div key={chat.id} style={{
                                    fontFamily: "work sans", 
                                    fontWeight: "400", 
                                    fontSize: 12, 
                                    marginTop: 5}}>
                                {new Date(chat.createdAt).toLocaleString("vi-VN", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                })}
                            </div>
                            
                            <HistoryButton                          
                                    text={chat.title}
                                    onClick={async () => { handelClick(chat.id); }}
                            />
                            </Box>
                        ))}
                    </Box>


                </Box>
            </Box>
    )
};