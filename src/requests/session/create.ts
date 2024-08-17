import { CreateSessionDto } from "@/dto/sesssion/create";
import axios from "axios";

export async function handleCreateSession({ host, password, port, title, username }: CreateSessionDto) {
    try {

        const response = await axios.post("http://localhost:3000/session/create", {
            host,
            port,
            title,
            username,
            password
        });

        if (response.status === 201) {
            return true;
        }

        return false;

    } catch (error: any) {
        console.error("Houve um erro na requisição de criar sessão.");
        throw error;
    }
}