import axios from "axios";

export const LoginUser = async (email: string, password: string) => {
    const res = await axios.post("/user/login", {email, password});
    if (res.status !== 201) {
        throw new Error("Login failed");
    }
    const data = await res.data;
    return data;
}

export const checkAuthStatus = async () => {
    const res = await axios.get("/user/auth-status");
    if (res.status !== 201) {
        throw new Error("Unable to authenticate");
    }
    const data = await res.data;
    return data;
}

export const sentChatRequest = async (chatid: string, context: string, question: string) => {
    const res = await axios.post("/chat/new", {chatid, context, question});
    if (res.status !== 200) {
        throw new Error("Unable to send message")
    }
    const data = await res.data;
    return data;
}

export const getUserChats = async () => {
    const res = await axios.get("/chat/all-chats");
    if (res.status !== 201) {
        throw new Error("Unable get chats from user")
    }
    const data = await res.data;
    return data;
}

export const delteteUserChats = async () => {
    const res = await axios.delete("/chat/deltete-all-chats");
    if (res.status !== 201) {
        throw new Error("Unable to delete chats from user")
    }
    const data = await res.data;
    return data;
}

export const userLogout = async () => {
    const res = await axios.get("/user/logout");
    if (res.status !== 201) {
        throw new Error("Unable to Logout")
    }
    const data = await res.data;
    return data;
}

export const SignupUser = async (name: string, email: string, password: string) => {
    const res = await axios.post("/user/signup", {name, email, password});
    if (res.status !== 201) {
        throw new Error("Signup failed");
    }
    const data = await res.data;
    return data;
}

export const getChatwithId = async (chatid: string) => {
    const res = await axios.post("/chat/get-chats", {chatid});
    if (res.status !== 200) {
        throw new Error("Load chats failed");
    }
    const data = await res.data;
    return data;
}