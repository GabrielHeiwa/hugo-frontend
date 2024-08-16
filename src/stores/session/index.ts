import { create } from "zustand";

export type Session = {
    host: string;
    port: number;
    username: string;
    password: string;

    title: string;
}

type SessionStore = {
    sessions: Session[],
    addSession: (newSession: Session) => void; 
}

const sessionStore = create<SessionStore>()((set) => ({
    sessions: [
        {
            host: "192.168.0.70",
            port: 22,
            username: "root",
            password: "pazehlindo",
            title: "Proxmox Syrtex"
        }
    ],
    addSession: (newSession: any) => (set((state) => ({ sessions: [...state.sessions, newSession]})))
}));

export { sessionStore };
