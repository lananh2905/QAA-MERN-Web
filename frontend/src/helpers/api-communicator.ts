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