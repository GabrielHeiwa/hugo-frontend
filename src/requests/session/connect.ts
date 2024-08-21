import axios from "axios";


type ConnectSessionRequest = {
    sessionId: string;
}

export async function connectSessionRequest({ sessionId }:  ConnectSessionRequest) {
    try {
        
        const response = await axios.post("http://localhost:3000/session/connect-session", {
            sessionId
        });

        return {
            ...response.data
        }

    } catch (error: any) {
        console.error("Houve um erro na requisição para connectar a uma nova sessão.");
        throw error;
    }
}