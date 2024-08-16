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
    editSession: (sessionId: number, newSession: Session) => void;
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
    addSession(newSession) {
        set((state) => {
            state.sessions.push(newSession);

            return { sessions: state.sessions };
        })
    },
    deleteSession(sessionId) {
        set((state) => {
            const newSessions = state.sessions.filter((_, index) => index !== sessionId)

            return { sessions: newSessions }
        })
    },
    editSession(sessionId, newSession) {
        set((state) => {
            const newSessions = state.sessions.map((session, index) => {
                if (index === sessionId) return newSession;
                return session;
            });

            return { sessions: newSessions }

        });
    },
}));

export { sessionStore };
