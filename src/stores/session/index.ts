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
    deleteSession: (sessionId: number) => void;
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
    addSession: (newSession: any) => (set((state) => ({ sessions: [...state.sessions, newSession] }))),
    deleteSession: (sessionId: number) => (set((state) => ({ sessions: state.sessions.filter((_, i) => i !== sessionId) })))
}));

export { sessionStore };
